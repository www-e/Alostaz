'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiEye, FiChevronDown } from 'react-icons/fi';
import { PageContainer, DataTable, ConfirmDialog } from '@/components/shared';
import { useToast } from '@/lib/hooks';
import { getAllStudents } from '@/lib/supabase/students';
import { getGradesWithTracks } from '@/lib/supabase/grades';
import { getGroupDaysWithDetails } from '@/lib/supabase/groups';
import { Student, GradeWithTracks, GroupDayWithDetails } from '@/lib/types';

/**
 * Student management page for admin dashboard
 * Allows admins to view, add, edit, and manage student accounts
 */
export default function StudentsPage() {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [grades, setGrades] = useState<GradeWithTracks[]>([]);
  const [groupDays, setGroupDays] = useState<GroupDayWithDetails[]>([]);
  
  // Filter states
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Delete confirmation dialog
  const { isOpen: isDeleteDialogOpen, onOpen: openDeleteDialog, onClose: closeDeleteDialog } = useDisclosure();
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Fetch students and filter options data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch students
        const { students: fetchedStudents, error: studentsError } = await getAllStudents();
        
        if (studentsError) {
          showToast.showErrorToast('خطأ في جلب بيانات الطلاب', studentsError);
          return;
        }
        
        setStudents(fetchedStudents);
        setFilteredStudents(fetchedStudents);
        
        // Fetch grades and tracks
        const { gradesWithTracks, error: gradesError } = await getGradesWithTracks();
        
        if (gradesError) {
          showToast.showErrorToast('خطأ في جلب بيانات الصفوف', gradesError);
          return;
        }
        
        setGrades(gradesWithTracks);
        
        // Fetch group days
        const { groupDays: fetchedGroupDays, error: groupDaysError } = await getGroupDaysWithDetails();
        
        if (groupDaysError) {
          showToast.showErrorToast('خطأ في جلب بيانات المجموعات', groupDaysError);
          return;
        }
        
        setGroupDays(fetchedGroupDays);
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب البيانات');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [showToast]);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        student => 
          student.full_name.toLowerCase().includes(query) ||
          student.phone.includes(query) ||
          student.parent_phone.includes(query)
      );
    }
    
    // Apply grade filter
    if (selectedGrade !== null) {
      result = result.filter(student => student.grade_id === selectedGrade);
    }
    
    // Apply track filter
    if (selectedTrack !== null) {
      result = result.filter(student => student.track_id === selectedTrack);
    }
    
    // Apply status filter
    if (selectedStatus !== null) {
      const isActive = selectedStatus === 'active';
      result = result.filter(student => student.active === isActive);
    }
    
    setFilteredStudents(result);
  }, [students, searchQuery, selectedGrade, selectedTrack, selectedStatus]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGrade(null);
    setSelectedTrack(null);
    setSelectedStatus(null);
  };
  
  // Handle delete student
  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    openDeleteDialog();
  };
  
  // Confirm delete student
  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    try {
      setIsDeleting(true);
      
      // In a real implementation, this would call an API to delete the student
      // For now, we'll just simulate it by removing from the local state
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      const updatedStudents = students.filter(s => s.id !== studentToDelete.id);
      setStudents(updatedStudents);
      
      showToast.showSuccessToast('تم حذف الطالب بنجاح');
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting student:', error);
      showToast.showErrorToast('خطأ في حذف الطالب', 'حدث خطأ أثناء محاولة حذف الطالب');
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Get grade name by id
  const getGradeName = (gradeId: number) => {
    const grade = grades.find(g => g.id === gradeId);
    return grade ? grade.name : '';
  };
  
  // Get track name by id
  const getTrackName = (trackId?: number) => {
    if (!trackId) return '';
    
    for (const grade of grades) {
      const track = grade.tracks?.find(t => t.id === trackId);
      if (track) return track.name;
    }
    
    return '';
  };
  
  // Get group day details
  const getGroupDayDetails = (groupDayId: number) => {
    const groupDay = groupDays.find(g => g.id === groupDayId);
    if (!groupDay) return '';
    
    return `${groupDay.day1} و ${groupDay.day2} - ${groupDay.time_label}`;
  };
  
  // Table columns configuration
  const columns = [
    {
      header: 'الاسم',
      accessor: (student: Student) => student.full_name,
    },
    {
      header: 'الصف',
      accessor: (student: Student) => getGradeName(student.grade_id),
    },
    {
      header: 'الشعبة',
      accessor: (student: Student) => student.track_id ? getTrackName(student.track_id) : '-',
    },
    {
      header: 'المجموعة',
      accessor: (student: Student) => getGroupDayDetails(student.group_day_id),
    },
    {
      header: 'رقم الهاتف',
      accessor: (student: Student) => student.phone,
    },
    {
      header: 'الحالة',
      accessor: (student: Student) => (
        <Badge 
          colorScheme={student.active ? 'green' : 'red'} 
          borderRadius="full"
          px={2}
          py={1}
        >
          {student.active ? 'نشط' : 'غير نشط'}
        </Badge>
      ),
    },
    {
      header: 'الإجراءات',
      accessor: (student: Student) => (
        <Flex gap={2}>
          <Button
            size="sm"
            colorScheme="blue"
            variant="ghost"
            leftIcon={<FiEye />}
            onClick={() => {/* View student details */}}
          >
            عرض
          </Button>
          <Button
            size="sm"
            colorScheme="yellow"
            variant="ghost"
            leftIcon={<FiEdit />}
            onClick={() => {/* Edit student */}}
          >
            تعديل
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            variant="ghost"
            leftIcon={<FiTrash2 />}
            onClick={() => handleDeleteClick(student)}
          >
            حذف
          </Button>
        </Flex>
      ),
    },
  ];
  
  // Action buttons for the page header
  const actionButtons = (
    <Button
      leftIcon={<FiPlus />}
      colorScheme="primary"
      onClick={() => {/* Open add student modal */}}
    >
      إضافة طالب
    </Button>
  );
  
  return (
    <PageContainer title="إدارة الطلاب" actions={actionButtons} isLoading={isLoading}>
      {/* Search and filters */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        align={{ base: 'stretch', md: 'center' }}
        mb={6}
        gap={4}
      >
        <InputGroup maxW={{ base: '100%', md: '320px' }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="بحث عن طالب..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        
        <Flex gap={3} wrap="wrap">
          <Select
            placeholder="جميع الصفوف"
            value={selectedGrade || ''}
            onChange={(e) => setSelectedGrade(e.target.value ? Number(e.target.value) : null)}
            maxW="150px"
          >
            {grades.map(grade => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </Select>
          
          <Select
            placeholder="جميع الشعب"
            value={selectedTrack || ''}
            onChange={(e) => setSelectedTrack(e.target.value ? Number(e.target.value) : null)}
            maxW="150px"
            isDisabled={!selectedGrade || !grades.find(g => g.id === selectedGrade)?.has_tracks}
          >
            {selectedGrade && 
              grades
                .find(g => g.id === selectedGrade)
                ?.tracks.map(track => (
                  <option key={track.id} value={track.id}>
                    {track.name}
                  </option>
                ))}
          </Select>
          
          <Select
            placeholder="جميع الحالات"
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            maxW="150px"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </Select>
          
          <Button
            variant="outline"
            onClick={resetFilters}
            size="md"
          >
            إعادة ضبط
          </Button>
        </Flex>
      </Flex>
      
      {/* Students table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        keyField="id"
        emptyMessage="لا يوجد طلاب للعرض"
      />
      
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title="حذف طالب"
        message={`هل أنت متأكد من حذف الطالب "${studentToDelete?.full_name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        cancelText="إلغاء"
        isLoading={isDeleting}
        type="danger"
      />
    </PageContainer>
  );
}
