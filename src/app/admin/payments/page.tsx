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
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiDollarSign, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import { PageContainer, FormField } from '@/components/shared';
import { useToast, useForm } from '@/lib/hooks';
import { getGradesWithTracks } from '@/lib/supabase/grades';
import { getGroupDaysByGrade } from '@/lib/supabase/groups';
import { getStudentsByGroupDay } from '@/lib/supabase/students';
import { 
  getStudentPaymentAmount, 
  hasStudentPaidMonthly, 
  createPayment 
} from '@/lib/supabase/payments';
import { GradeWithTracks, GroupDay, Student, CreatePaymentRequest } from '@/lib/types';
import { getArabicMonth, formatCurrency } from '@/lib/utils';

/**
 * Monthly payments management page for admin dashboard
 * Allows admins to track and manage student monthly payments
 */
export default function PaymentsPage() {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Students and payments data
  const [students, setStudents] = useState<Student[]>([]);
  const [paymentsData, setPaymentsData] = useState<Record<string, boolean>>({});
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, number>>({});
  
  // Payment modal
  const { isOpen: isPaymentModalOpen, onOpen: openPaymentModal, onClose: closePaymentModal } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Payment form
  const { values, errors, handleChange, setFieldValue, resetForm, handleSubmit } = useForm({
    amount: 0,
    payment_date: today.toISOString().split('T')[0],
    receipt_number: '',
    notes: '',
  }, ['amount', 'payment_date']);
  
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
        
        // Fetch payment amounts for each student
        const amounts: Record<string, number> = {};
        
        for (const student of fetchedStudents) {
          const { amount, error: amountError } = await getStudentPaymentAmount(student.id, 'monthly');
          
          if (!amountError && amount) {
            amounts[student.id] = amount;
          }
        }
        
        setPaymentAmounts(amounts);
      } catch (error) {
        console.error('Error fetching students:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات الطلاب');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, [selectedGroupDay, showToast]);
  
  // Fetch payments data when month, year, or students change
  useEffect(() => {
    const fetchPaymentsData = async () => {
      if (students.length === 0) {
        setPaymentsData({});
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch payment status for each student
        const payments: Record<string, boolean> = {};
        
        for (const student of students) {
          const { hasPaid, error } = await hasStudentPaidMonthly(
            student.id,
            currentYear,
            currentMonth
          );
          
          if (!error) {
            payments[student.id] = hasPaid;
          }
        }
        
        setPaymentsData(payments);
      } catch (error) {
        console.error('Error fetching payments data:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات المدفوعات');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPaymentsData();
  }, [currentMonth, currentYear, students, showToast]);
  
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
  
  // Open payment modal
  const handlePaymentClick = (student: Student) => {
    setSelectedStudent(student);
    
    // Set default payment amount
    const defaultAmount = paymentAmounts[student.id] || 0;
    setFieldValue('amount', defaultAmount);
    
    // Reset other fields
    setFieldValue('payment_date', today.toISOString().split('T')[0]);
    setFieldValue('receipt_number', '');
    setFieldValue('notes', '');
    
    openPaymentModal();
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = async () => {
    if (!selectedStudent) return;
    
    try {
      setIsSubmitting(true);
      
      // Prepare payment data
      const paymentRequest: CreatePaymentRequest = {
        student_id: selectedStudent.id,
        payment_type: 'monthly',
        amount: Number(values.amount),
        payment_date: values.payment_date,
        month: currentMonth,
        year: currentYear,
        receipt_number: values.receipt_number || undefined,
        notes: values.notes || undefined,
      };
      
      // Create payment
      const { payment, error } = await createPayment(paymentRequest);
      
      if (error) {
        showToast.showErrorToast('خطأ في تسجيل الدفع', error);
        return;
      }
      
      // Update local state
      setPaymentsData(prev => ({
        ...prev,
        [selectedStudent.id]: true,
      }));
      
      showToast.showSuccessToast('تم تسجيل الدفع بنجاح');
      closePaymentModal();
    } catch (error) {
      console.error('Error recording payment:', error);
      showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء تسجيل الدفع');
    } finally {
      setIsSubmitting(false);
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
  
  return (
    <PageContainer 
      title="إدارة المدفوعات الشهرية" 
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
      <Flex justify="space-between" align="center" mb={6}>
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
        >
          الشهر التالي
        </Button>
      </Flex>
      
      {/* Payments table */}
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
            templateColumns="1fr 150px 150px 150px"
            bg="gray.100"
            p={3}
            fontWeight="bold"
          >
            <Text>اسم الطالب</Text>
            <Text>الصف / الشعبة</Text>
            <Text textAlign="center">المبلغ</Text>
            <Text textAlign="center">الحالة</Text>
          </Grid>
          
          {/* Table body */}
          {students.map(student => {
            const hasPaid = paymentsData[student.id] || false;
            const paymentAmount = paymentAmounts[student.id] || 0;
            
            return (
              <Grid
                key={student.id}
                templateColumns="1fr 150px 150px 150px"
                p={3}
                borderTop="1px"
                borderColor="gray.200"
                alignItems="center"
                _hover={{ bg: 'gray.50' }}
              >
                <Text>{student.full_name}</Text>
                <Text>
                  {getGradeName(student.grade_id)}
                  {student.track_id && ` / ${getTrackName(student.track_id)}`}
                </Text>
                <Text textAlign="center">
                  {formatCurrency(paymentAmount)}
                </Text>
                <Flex justify="center">
                  {hasPaid ? (
                    <Badge colorScheme="green" p={2} borderRadius="md">
                      <Flex align="center">
                        <FiCheck />
                        <Text mr={1}>مدفوع</Text>
                      </Flex>
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handlePaymentClick(student)}
                      colorScheme="blue"
                      size="sm"
                      leftIcon={<FiDollarSign />}
                    >
                      تسجيل دفع
                    </Button>
                  )}
                </Flex>
              </Grid>
            );
          })}
        </Box>
      )}
      
      {/* Payment modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>تسجيل دفع شهري</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedStudent && (
              <Box>
                <Text mb={4}>
                  تسجيل دفع شهر {getArabicMonth(new Date(currentYear, currentMonth - 1))} {currentYear} للطالب:{' '}
                  <Text as="span" fontWeight="bold">{selectedStudent.full_name}</Text>
                </Text>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(handlePaymentSubmit);
                }}>
                  <FormField
                    id="amount"
                    name="amount"
                    label="المبلغ"
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                    error={errors.amount}
                    isRequired
                    min={0}
                  />
                  
                  <FormField
                    id="payment_date"
                    name="payment_date"
                    label="تاريخ الدفع"
                    type="date"
                    value={values.payment_date}
                    onChange={handleChange}
                    error={errors.payment_date}
                    isRequired
                  />
                  
                  <FormField
                    id="receipt_number"
                    name="receipt_number"
                    label="رقم الإيصال"
                    type="text"
                    value={values.receipt_number}
                    onChange={handleChange}
                    error={errors.receipt_number}
                  />
                  
                  <FormField
                    id="notes"
                    name="notes"
                    label="ملاحظات"
                    type="textarea"
                    value={values.notes}
                    onChange={handleChange}
                    error={errors.notes}
                  />
                </form>
              </Box>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closePaymentModal}>
              إلغاء
            </Button>
            <Button 
              colorScheme="primary" 
              onClick={() => handleSubmit(handlePaymentSubmit)}
              isLoading={isSubmitting}
            >
              تسجيل الدفع
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}
