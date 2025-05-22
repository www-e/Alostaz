'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Select,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import { PageContainer, StatusBadge } from '@/components/shared';
import { useToast } from '@/lib/hooks';
import { getGradesWithTracks } from '@/lib/supabase/grades';
import { getGroupDaysByGrade } from '@/lib/supabase/groups';
import { getStudentsByGroupDay } from '@/lib/supabase/students';
import { getGroupAttendance, updateAttendance } from '@/lib/supabase/attendance';
import { GradeWithTracks, GroupDay, Student, AttendanceStatus } from '@/lib/types';
import { 
  getDaysInMonth, 
  getArabicMonth, 
  getArabicDay, 
  formatDateForDB, 
  formatDateArabic 
} from '@/lib/utils';

/**
 * Attendance management page for admin dashboard
 * Allows admins to track and manage student attendance
 */
export default function AttendancePage() {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  
  // Filter states
  const [grades, setGrades] = useState<GradeWithTracks[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [groupDays, setGroupDays] = useState<GroupDay[]>([]);
  const [selectedGroupDay, setSelectedGroupDay] = useState<number | null>(null);
  
  // Date states
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  
  // Students and attendance data
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceData, setAttendanceData] = useState<Record<string, Record<string, { status: AttendanceStatus; notes?: string }>>>({});
  
  // Attendance status selection
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>('حضر');
  const [attendanceNotes, setAttendanceNotes] = useState('');
  const { 
    isOpen: isStatusPopoverOpen, 
    onOpen: openStatusPopover, 
    onClose: closeStatusPopover 
  } = useDisclosure();
  
  // Fetch grades and tracks data
  useEffect(() => {
    const fetchGradesData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch grades and tracks
        const { gradesWithTracks, error } = await getGradesWithTracks();
        
        if (error) {
          showToast.showErrorToast('خطأ في جلب بيانات الصفوف', error);
          return;
        }
        
        setGrades(gradesWithTracks);
        
        // Auto-select first grade if available
        if (gradesWithTracks.length > 0) {
          setSelectedGrade(gradesWithTracks[0].id);
        }
      } catch (error) {
        console.error('Error fetching grades data:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات الصفوف');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGradesData();
  }, [showToast]);
  
  // Fetch group days when grade/track selection changes
  useEffect(() => {
    const fetchGroupDays = async () => {
      if (selectedGrade === null) {
        setGroupDays([]);
        setSelectedGroupDay(null);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch group days for selected grade and track
        const { groupDays: fetchedGroupDays, error } = await getGroupDaysByGrade(
          selectedGrade,
          selectedTrack || undefined
        );
        
        if (error) {
          showToast.showErrorToast('خطأ في جلب بيانات المجموعات', error);
          return;
        }
        
        setGroupDays(fetchedGroupDays);
        
        // Auto-select first group day if available
        if (fetchedGroupDays.length > 0) {
          setSelectedGroupDay(fetchedGroupDays[0].id);
        } else {
          setSelectedGroupDay(null);
        }
      } catch (error) {
        console.error('Error fetching group days:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات المجموعات');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGroupDays();
  }, [selectedGrade, selectedTrack, showToast]);
  
  // Fetch students when group day selection changes
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedGroupDay === null) {
        setStudents([]);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch students for selected group day
        const { students: fetchedStudents, error } = await getStudentsByGroupDay(selectedGroupDay);
        
        if (error) {
          showToast.showErrorToast('خطأ في جلب بيانات الطلاب', error);
          return;
        }
        
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات الطلاب');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, [selectedGroupDay, showToast]);
  
  // Fetch attendance data when date or students change
  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (selectedGroupDay === null || students.length === 0) {
        setAttendanceData({});
        return;
      }
      
      try {
        setLoadingAttendance(true);
        
        // Format date for API
        const dateStr = formatDateForDB(selectedDate);
        
        // Fetch attendance data for selected group and date
        const { attendance, error } = await getGroupAttendance(selectedGroupDay, dateStr);
        
        if (error) {
          showToast.showErrorToast('خطأ في جلب بيانات الحضور', error);
          return;
        }
        
        // Format attendance data
        const formattedData: Record<string, Record<string, { status: AttendanceStatus; notes?: string }>> = {};
        
        // Initialize with empty data for the selected date
        formattedData[dateStr] = {};
        
        // Add attendance data for each student
        attendance.forEach(item => {
          if (item.status) {
            formattedData[dateStr][item.student_id] = {
              status: item.status,
              notes: item.notes || undefined,
            };
          }
        });
        
        setAttendanceData(formattedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات الحضور');
      } finally {
        setLoadingAttendance(false);
      }
    };
    
    fetchAttendanceData();
  }, [selectedDate, selectedGroupDay, students, showToast]);
  
  // Handle grade selection change
  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = Number(e.target.value);
    setSelectedGrade(gradeId);
    setSelectedTrack(null);
    
    // Check if selected grade has tracks
    const selectedGradeObj = grades.find(g => g.id === gradeId);
    if (selectedGradeObj && !selectedGradeObj.has_tracks) {
      setSelectedTrack(null);
    }
  };
  
  // Handle track selection change
  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const trackId = e.target.value ? Number(e.target.value) : null;
    setSelectedTrack(trackId);
  };
  
  // Handle group day selection change
  const handleGroupDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupDayId = Number(e.target.value);
    setSelectedGroupDay(groupDayId);
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Open attendance status popover
  const handleAttendanceClick = (student: Student) => {
    setSelectedStudent(student);
    
    // Get current attendance status and notes if available
    const dateStr = formatDateForDB(selectedDate);
    const currentAttendance = attendanceData[dateStr]?.[student.id];
    
    if (currentAttendance) {
      setSelectedStatus(currentAttendance.status);
      setAttendanceNotes(currentAttendance.notes || '');
    } else {
      setSelectedStatus('حضر');
      setAttendanceNotes('');
    }
    
    openStatusPopover();
  };
  
  // Save attendance status
  const saveAttendanceStatus = async () => {
    if (!selectedStudent) return;
    
    try {
      setLoadingAttendance(true);
      
      // Prepare attendance data
      const attendanceRequest = {
        student_id: selectedStudent.id,
        attendance_date: formatDateForDB(selectedDate),
        status: selectedStatus,
        notes: attendanceNotes || undefined,
      };
      
      // Update attendance
      const { attendance, error } = await updateAttendance(attendanceRequest);
      
      if (error) {
        showToast.showErrorToast('خطأ في تحديث الحضور', error);
        return;
      }
      
      // Update local state
      const dateStr = formatDateForDB(selectedDate);
      
      setAttendanceData(prev => ({
        ...prev,
        [dateStr]: {
          ...prev[dateStr],
          [selectedStudent.id]: {
            status: selectedStatus,
            notes: attendanceNotes || undefined,
          },
        },
      }));
      
      showToast.showSuccessToast('تم تحديث الحضور بنجاح');
      closeStatusPopover();
    } catch (error) {
      console.error('Error updating attendance:', error);
      showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء تحديث الحضور');
    } finally {
      setLoadingAttendance(false);
    }
  };
  
  // Get attendance status for a student on the selected date
  const getStudentAttendanceStatus = (studentId: string) => {
    const dateStr = formatDateForDB(selectedDate);
    return attendanceData[dateStr]?.[studentId]?.status || null;
  };
  
  // Get days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
  // Check if a date is in the past (for disabling future dates)
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  };
  
  return (
    <PageContainer 
      title="إدارة الحضور" 
      isLoading={isLoading}
    >
      {/* Filters section */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mb={6}
        wrap="wrap"
      >
        <Select
          placeholder="اختر الصف"
          value={selectedGrade || ''}
          onChange={handleGradeChange}
          maxW="200px"
        >
          {grades.map(grade => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </Select>
        
        <Select
          placeholder="اختر الشعبة"
          value={selectedTrack || ''}
          onChange={handleTrackChange}
          maxW="200px"
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
          placeholder="اختر المجموعة"
          value={selectedGroupDay || ''}
          onChange={handleGroupDayChange}
          maxW="250px"
          isDisabled={!groupDays.length}
        >
          {groupDays.map(groupDay => (
            <option key={groupDay.id} value={groupDay.id}>
              مجموعة {groupDay.id}
            </option>
          ))}
        </Select>
      </Flex>
      
      {/* Month navigation */}
      <Flex justify="space-between" align="center" mb={4}>
        <Button
          leftIcon={<FiChevronRight />}
          variant="ghost"
          onClick={goToPreviousMonth}
        >
          الشهر السابق
        </Button>
        
        <Heading size="md">
          {getArabicMonth(new Date(currentYear, currentMonth - 1))} {currentYear}
        </Heading>
        
        <Button
          rightIcon={<FiChevronLeft />}
          variant="ghost"
          onClick={goToNextMonth}
          isDisabled={
            currentYear > today.getFullYear() || 
            (currentYear === today.getFullYear() && currentMonth >= today.getMonth() + 1)
          }
        >
          الشهر التالي
        </Button>
      </Flex>
      
      {/* Calendar days */}
      <Grid 
        templateColumns="repeat(7, 1fr)" 
        gap={2} 
        mb={6}
      >
        {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
          <Box 
            key={day} 
            textAlign="center" 
            fontWeight="bold" 
            py={2}
            bg="gray.100"
            borderRadius="md"
          >
            {day}
          </Box>
        ))}
        
        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: daysInMonth[0].getDay() }).map((_, index) => (
          <Box key={`empty-${index}`} />
        ))}
        
        {/* Days of the month */}
        {daysInMonth.map(date => {
          const isSelected = 
            date.getDate() === selectedDate.getDate() && 
            date.getMonth() === selectedDate.getMonth() && 
            date.getFullYear() === selectedDate.getFullYear();
          
          const isToday = 
            date.getDate() === today.getDate() && 
            date.getMonth() === today.getMonth() && 
            date.getFullYear() === today.getFullYear();
          
          return (
            <Box
              key={date.getDate()}
              bg={isSelected ? 'primary.100' : isToday ? 'blue.50' : 'white'}
              borderRadius="md"
              border="1px"
              borderColor={isSelected ? 'primary.500' : 'gray.200'}
              p={2}
              cursor={isPastDate(date) ? 'pointer' : 'not-allowed'}
              opacity={isPastDate(date) ? 1 : 0.5}
              onClick={() => isPastDate(date) && handleDateClick(date)}
              _hover={{
                bg: isPastDate(date) ? (isSelected ? 'primary.100' : 'gray.100') : undefined,
              }}
            >
              <Text textAlign="center" fontWeight={isToday ? 'bold' : 'normal'}>
                {date.getDate()}
              </Text>
            </Box>
          );
        })}
      </Grid>
      
      {/* Selected date and attendance */}
      <Box mb={6}>
        <Flex align="center" mb={4}>
          <FiCalendar size={20} />
          <Heading size="md" mr={2}>
            {formatDateArabic(selectedDate)} - {getArabicDay(selectedDate)}
          </Heading>
        </Flex>
        
        {students.length === 0 ? (
          <Text>لا يوجد طلاب في هذه المجموعة</Text>
        ) : (
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            overflow="hidden"
          >
            {/* Table header */}
            <Grid
              templateColumns="1fr 150px"
              bg="gray.100"
              p={3}
              fontWeight="bold"
            >
              <Text>اسم الطالب</Text>
              <Text textAlign="center">الحضور</Text>
            </Grid>
            
            {/* Table body */}
            {students.map(student => {
              const attendanceStatus = getStudentAttendanceStatus(student.id);
              
              return (
                <Grid
                  key={student.id}
                  templateColumns="1fr 150px"
                  p={3}
                  borderTop="1px"
                  borderColor="gray.200"
                  alignItems="center"
                  _hover={{ bg: 'gray.50' }}
                >
                  <Text>{student.full_name}</Text>
                  <Flex justify="center">
                    <Button
                      onClick={() => handleAttendanceClick(student)}
                      variant="outline"
                      size="sm"
                      colorScheme={
                        attendanceStatus === 'حضر'
                          ? 'green'
                          : attendanceStatus === 'غاب'
                          ? 'red'
                          : attendanceStatus === 'تأخر'
                          ? 'orange'
                          : 'gray'
                      }
                    >
                      {attendanceStatus || 'تسجيل الحضور'}
                    </Button>
                  </Flex>
                </Grid>
              );
            })}
          </Box>
        )}
      </Box>
      
      {/* Attendance status popover */}
      <Popover
        isOpen={isStatusPopoverOpen}
        onClose={closeStatusPopover}
        placement="top"
        closeOnBlur={false}
      >
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">
            تسجيل حضور: {selectedStudent?.full_name}
          </PopoverHeader>
          <PopoverBody>
            <RadioGroup value={selectedStatus} onChange={(value) => setSelectedStatus(value as AttendanceStatus)}>
              <Stack direction="column" spacing={3}>
                <Radio value="حضر" colorScheme="green">
                  <HStack>
                    <StatusBadge status="حضر" type="attendance" />
                    <Text>حضر</Text>
                  </HStack>
                </Radio>
                <Radio value="غاب" colorScheme="red">
                  <HStack>
                    <StatusBadge status="غاب" type="attendance" />
                    <Text>غاب</Text>
                  </HStack>
                </Radio>
                <Radio value="تأخر" colorScheme="orange">
                  <HStack>
                    <StatusBadge status="تأخر" type="attendance" />
                    <Text>تأخر</Text>
                  </HStack>
                </Radio>
              </Stack>
            </RadioGroup>
            
            <Box mt={4}>
              <Text mb={2} fontWeight="medium">ملاحظات:</Text>
              <Textarea
                value={attendanceNotes}
                onChange={(e) => setAttendanceNotes(e.target.value)}
                placeholder="أضف ملاحظات (اختياري)"
                size="sm"
                resize="vertical"
                rows={3}
              />
            </Box>
            
            <Button
              mt={4}
              colorScheme="primary"
              width="full"
              onClick={saveAttendanceStatus}
              isLoading={loadingAttendance}
            >
              حفظ
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </PageContainer>
  );
}
