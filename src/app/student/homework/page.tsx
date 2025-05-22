'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  HStack,
  VStack,
  Icon,
  Button,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Textarea,
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
  useDisclosure,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { 
  FiBook, 
  FiCalendar, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiUpload,
  FiPaperclip,
  FiFileText,
  FiClock,
} from 'react-icons/fi';
import { PageContainer } from '@/components/shared';
import { useAuth, useToast, useForm } from '@/lib/hooks';
import { getStudentProfile } from '@/lib/supabase/students';
import { 
  getStudentHomework, 
  submitHomework, 
  getHomeworkDetails 
} from '@/lib/supabase/homework';
import { Student, HomeworkRecord, HomeworkStatus, HomeworkSubmission } from '@/lib/types';
import { formatDateArabic, getTimeRemaining } from '@/lib/utils';

/**
 * Student homework page
 * Shows student homework assignments, allows submission, and tracks progress
 */
export default function StudentHomeworkPage() {
  const { user } = useAuth();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Student data
  const [profile, setProfile] = useState<Student | null>(null);
  const [homework, setHomework] = useState<HomeworkRecord[]>([]);
  
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<HomeworkStatus | 'all'>('all');
  const [filteredHomework, setFilteredHomework] = useState<HomeworkRecord[]>([]);
  
  // Homework stats
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  
  // Submission modal
  const { isOpen: isSubmitModalOpen, onOpen: openSubmitModal, onClose: closeSubmitModal } = useDisclosure();
  const [selectedHomework, setSelectedHomework] = useState<HomeworkRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Homework details modal
  const { isOpen: isDetailsModalOpen, onOpen: openDetailsModal, onClose: closeDetailsModal } = useDisclosure();
  const [homeworkDetails, setHomeworkDetails] = useState<HomeworkRecord | null>(null);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
  
  // Submission form
  const { values, errors, handleChange, setFieldValue, resetForm, handleSubmit } = useForm({
    answer_text: '',
    attachment_url: '',
    notes: '',
  }, ['answer_text']);
  
  // Card colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');
  
  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch student profile
        const { student, error: profileError } = await getStudentProfile(user.id);
        
        if (profileError) {
          showToast.showErrorToast('خطأ في جلب بيانات الطالب', profileError);
          return;
        }
        
        if (student) {
          setProfile(student);
          
          // Fetch homework records
          const { homework: homeworkRecords, error: homeworkError } = 
            await getStudentHomework(student.id);
          
          if (!homeworkError && homeworkRecords) {
            // Sort by due date (closest first)
            const sortedHomework = homeworkRecords.sort(
              (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
            );
            
            setHomework(sortedHomework);
            
            // Calculate homework stats
            calculateHomeworkStats(sortedHomework);
          }
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات الطالب');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudentData();
  }, [user, showToast]);
  
  // Filter homework by status
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredHomework(homework);
    } else {
      const filtered = homework.filter(hw => hw.status === selectedStatus);
      setFilteredHomework(filtered);
    }
  }, [selectedStatus, homework]);
  
  // Calculate homework statistics
  const calculateHomeworkStats = (records: HomeworkRecord[]) => {
    if (records.length === 0) {
      setCompletedCount(0);
      setPendingCount(0);
      setLateCount(0);
      setCompletionRate(0);
      return;
    }
    
    // Calculate counts by status
    const completed = records.filter(hw => hw.status === 'مكتمل').length;
    const pending = records.filter(hw => hw.status === 'قيد الإنجاز').length;
    const late = records.filter(hw => hw.status === 'متأخر').length;
    
    setCompletedCount(completed);
    setPendingCount(pending);
    setLateCount(late);
    
    // Calculate completion rate
    const rate = Math.round((completed / records.length) * 100);
    setCompletionRate(rate);
  };
  
  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as HomeworkStatus | 'all';
    setSelectedStatus(status);
  };
  
  // Open submission modal
  const handleSubmitHomework = (homework: HomeworkRecord) => {
    setSelectedHomework(homework);
    resetForm();
    openSubmitModal();
  };
  
  // Open homework details modal
  const handleViewHomework = async (homework: HomeworkRecord) => {
    try {
      setIsLoading(true);
      
      // Fetch homework details including submissions
      const { homework: details, submissions: subs, error } = 
        await getHomeworkDetails(homework.id);
      
      if (error) {
        showToast.showErrorToast('خطأ في جلب تفاصيل الواجب', error);
        return;
      }
      
      if (details) {
        setHomeworkDetails(details);
        setSubmissions(subs || []);
        openDetailsModal();
      }
    } catch (error) {
      console.error('Error fetching homework details:', error);
      showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب تفاصيل الواجب');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle submission form submission
  const handleSubmitForm = async () => {
    if (!selectedHomework || !profile) return;
    
    try {
      setIsSubmitting(true);
      
      // Prepare submission data
      const submissionRequest = {
        homework_id: selectedHomework.id,
        student_id: profile.id,
        answer_text: values.answer_text,
        attachment_url: values.attachment_url || undefined,
        notes: values.notes || undefined,
      };
      
      // Submit homework
      const { submission, error } = await submitHomework(submissionRequest);
      
      if (error) {
        showToast.showErrorToast('خطأ في تسليم الواجب', error);
        return;
      }
      
      // Update local state
      const updatedHomework = homework.map(hw => {
        if (hw.id === selectedHomework.id) {
          return { ...hw, status: 'مكتمل' };
        }
        return hw;
      });
      
      setHomework(updatedHomework);
      calculateHomeworkStats(updatedHomework);
      
      showToast.showSuccessToast('تم تسليم الواجب بنجاح');
      closeSubmitModal();
    } catch (error) {
      console.error('Error submitting homework:', error);
      showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء تسليم الواجب');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get status color
  const getStatusColor = (status: HomeworkStatus) => {
    switch (status) {
      case 'مكتمل':
        return 'green';
      case 'متأخر':
        return 'red';
      case 'قيد الإنجاز':
        return 'yellow';
      default:
        return 'gray';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: HomeworkStatus) => {
    switch (status) {
      case 'مكتمل':
        return FiCheckCircle;
      case 'متأخر':
        return FiXCircle;
      case 'قيد الإنجاز':
        return FiAlertCircle;
      default:
        return FiBook;
    }
  };
  
  // Check if homework is due soon (within 2 days)
  const isDueSoon = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 2 && diffDays > 0;
  };
  
  // Check if homework is overdue
  const isOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    return due < now;
  };
  
  return (
    <PageContainer 
      title="الواجبات" 
      isLoading={isLoading}
    >
      {/* Stats cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {/* Completion rate card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiBook} boxSize={10} color="blue.500" mb={2} />
              <Heading size="md" mb={2}>نسبة الإنجاز</Heading>
              <Box w="full" mb={2}>
                <Progress 
                  value={completionRate} 
                  colorScheme={completionRate > 75 ? 'green' : completionRate > 50 ? 'yellow' : 'red'} 
                  size="lg" 
                  borderRadius="full" 
                />
              </Box>
              <Text fontWeight="bold" fontSize="xl">{completionRate}%</Text>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Completed homework card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiCheckCircle} boxSize={10} color="green.500" mb={2} />
              <Heading size="md" mb={2}>مكتمل</Heading>
              <Text fontWeight="bold" fontSize="2xl">{completedCount}</Text>
              <Badge colorScheme="green" mt={2} px={2} borderRadius="full">
                واجب
              </Badge>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Pending homework card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiClock} boxSize={10} color="yellow.500" mb={2} />
              <Heading size="md" mb={2}>قيد الإنجاز</Heading>
              <Text fontWeight="bold" fontSize="2xl">{pendingCount}</Text>
              <Badge colorScheme="yellow" mt={2} px={2} borderRadius="full">
                واجب
              </Badge>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Late homework card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiXCircle} boxSize={10} color="red.500" mb={2} />
              <Heading size="md" mb={2}>متأخر</Heading>
              <Text fontWeight="bold" fontSize="2xl">{lateCount}</Text>
              <Badge colorScheme="red" mt={2} px={2} borderRadius="full">
                واجب
              </Badge>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      
      {/* Filters */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mb={6}
        wrap="wrap"
        justify="space-between"
        align="center"
      >
        <Select
          placeholder="جميع الحالات"
          value={selectedStatus}
          onChange={handleStatusChange}
          maxW="200px"
        >
          <option value="all">جميع الحالات</option>
          <option value="مكتمل">مكتمل</option>
          <option value="قيد الإنجاز">قيد الإنجاز</option>
          <option value="متأخر">متأخر</option>
        </Select>
      </Flex>
      
      {/* Homework tabs */}
      <Tabs variant="enclosed" colorScheme="primary">
        <TabList>
          <Tab>جميع الواجبات ({homework.length})</Tab>
          <Tab>قيد الإنجاز ({pendingCount})</Tab>
          <Tab>مكتمل ({completedCount})</Tab>
          <Tab>متأخر ({lateCount})</Tab>
        </TabList>
        
        <TabPanels>
          {/* All homework */}
          <TabPanel px={0}>
            <HomeworkList 
              homework={filteredHomework} 
              onSubmit={handleSubmitHomework} 
              onView={handleViewHomework}
            />
          </TabPanel>
          
          {/* Pending homework */}
          <TabPanel px={0}>
            <HomeworkList 
              homework={homework.filter(hw => hw.status === 'قيد الإنجاز')} 
              onSubmit={handleSubmitHomework} 
              onView={handleViewHomework}
            />
          </TabPanel>
          
          {/* Completed homework */}
          <TabPanel px={0}>
            <HomeworkList 
              homework={homework.filter(hw => hw.status === 'مكتمل')} 
              onSubmit={handleSubmitHomework} 
              onView={handleViewHomework}
            />
          </TabPanel>
          
          {/* Late homework */}
          <TabPanel px={0}>
            <HomeworkList 
              homework={homework.filter(hw => hw.status === 'متأخر')} 
              onSubmit={handleSubmitHomework} 
              onView={handleViewHomework}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Submission modal */}
      <Modal isOpen={isSubmitModalOpen} onClose={closeSubmitModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>تسليم الواجب</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedHomework && (
              <Box>
                <VStack align="start" spacing={4} mb={4}>
                  <Heading size="md">{selectedHomework.title}</Heading>
                  <HStack>
                    <Icon as={FiCalendar} color="gray.500" />
                    <Text>تاريخ التسليم: {formatDateArabic(new Date(selectedHomework.due_date))}</Text>
                  </HStack>
                  <Text>{selectedHomework.description}</Text>
                </VStack>
                
                <Divider mb={4} />
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(handleSubmitForm);
                }}>
                  <FormControl mb={4} isRequired>
                    <FormLabel>الإجابة</FormLabel>
                    <Textarea
                      name="answer_text"
                      value={values.answer_text}
                      onChange={handleChange}
                      placeholder="اكتب إجابتك هنا..."
                      rows={6}
                      isInvalid={!!errors.answer_text}
                    />
                    {errors.answer_text && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.answer_text}
                      </Text>
                    )}
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>رابط المرفق (اختياري)</FormLabel>
                    <Input
                      name="attachment_url"
                      value={values.attachment_url}
                      onChange={handleChange}
                      placeholder="أدخل رابط المرفق إن وجد"
                    />
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>ملاحظات (اختياري)</FormLabel>
                    <Textarea
                      name="notes"
                      value={values.notes}
                      onChange={handleChange}
                      placeholder="أي ملاحظات إضافية..."
                      rows={3}
                    />
                  </FormControl>
                </form>
              </Box>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closeSubmitModal}>
              إلغاء
            </Button>
            <Button 
              colorScheme="primary" 
              leftIcon={<FiUpload />}
              onClick={() => handleSubmit(handleSubmitForm)}
              isLoading={isSubmitting}
            >
              تسليم الواجب
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Homework details modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={closeDetailsModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>تفاصيل الواجب</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {homeworkDetails && (
              <Box>
                <VStack align="start" spacing={4} mb={4}>
                  <Heading size="md">{homeworkDetails.title}</Heading>
                  <Badge 
                    colorScheme={getStatusColor(homeworkDetails.status)} 
                    px={2} 
                    py={1} 
                    borderRadius="full"
                  >
                    <HStack>
                      <Icon as={getStatusIcon(homeworkDetails.status)} />
                      <Text>{homeworkDetails.status}</Text>
                    </HStack>
                  </Badge>
                  <HStack>
                    <Icon as={FiCalendar} color="gray.500" />
                    <Text>تاريخ التسليم: {formatDateArabic(new Date(homeworkDetails.due_date))}</Text>
                  </HStack>
                  <Box p={4} bg="gray.50" borderRadius="md" w="full">
                    <Text>{homeworkDetails.description}</Text>
                  </Box>
                  
                  {homeworkDetails.attachment_url && (
                    <HStack>
                      <Icon as={FiPaperclip} color="blue.500" />
                      <Button 
                        as="a" 
                        href={homeworkDetails.attachment_url} 
                        target="_blank" 
                        variant="link" 
                        colorScheme="blue"
                      >
                        فتح المرفق
                      </Button>
                    </HStack>
                  )}
                </VStack>
                
                <Divider my={4} />
                
                <Heading size="sm" mb={4}>التسليمات</Heading>
                
                {submissions.length === 0 ? (
                  <Text color="gray.500">لم يتم تسليم أي إجابات بعد</Text>
                ) : (
                  <VStack spacing={4} align="stretch">
                    {submissions.map((submission, index) => (
                      <Box 
                        key={index} 
                        p={4} 
                        borderWidth="1px" 
                        borderColor="gray.200" 
                        borderRadius="md"
                      >
                        <HStack justify="space-between" mb={2}>
                          <Text fontWeight="bold">
                            تم التسليم في: {formatDateArabic(new Date(submission.created_at))}
                          </Text>
                          <Badge colorScheme={submission.is_accepted ? 'green' : 'yellow'}>
                            {submission.is_accepted ? 'مقبول' : 'قيد المراجعة'}
                          </Badge>
                        </HStack>
                        
                        <Box p={3} bg="gray.50" borderRadius="md" mb={3}>
                          <Text>{submission.answer_text}</Text>
                        </Box>
                        
                        {submission.attachment_url && (
                          <HStack mb={2}>
                            <Icon as={FiPaperclip} color="blue.500" />
                            <Button 
                              as="a" 
                              href={submission.attachment_url} 
                              target="_blank" 
                              variant="link" 
                              colorScheme="blue"
                              size="sm"
                            >
                              فتح المرفق
                            </Button>
                          </HStack>
                        )}
                        
                        {submission.notes && (
                          <Text fontSize="sm" color="gray.600">
                            ملاحظات: {submission.notes}
                          </Text>
                        )}
                        
                        {submission.feedback && (
                          <Box mt={3} p={3} bg="blue.50" borderRadius="md">
                            <Text fontWeight="bold" color="blue.700" mb={1}>
                              تعليق المعلم:
                            </Text>
                            <Text>{submission.feedback}</Text>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme="primary" onClick={closeDetailsModal}>
              إغلاق
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}

// Homework list component
interface HomeworkListProps {
  homework: HomeworkRecord[];
  onSubmit: (homework: HomeworkRecord) => void;
  onView: (homework: HomeworkRecord) => void;
}

function HomeworkList({ homework, onSubmit, onView }: HomeworkListProps) {
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');
  
  if (homework.length === 0) {
    return (
      <Text textAlign="center" py={8} color="gray.500">
        لا توجد واجبات في هذه القائمة
      </Text>
    );
  }
  
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
      {homework.map((hw, index) => {
        const dueDate = new Date(hw.due_date);
        const isLate = hw.status === 'متأخر';
        const isPending = hw.status === 'قيد الإنجاز';
        const isCompleted = hw.status === 'مكتمل';
        
        // Calculate time remaining
        const timeRemaining = getTimeRemaining(dueDate);
        const isDueSoon = timeRemaining.days <= 2 && timeRemaining.days >= 0;
        
        return (
          <Card 
            key={index} 
            bg={cardBg} 
            borderWidth="1px" 
            borderColor={
              isLate ? 'red.300' : 
              isDueSoon && isPending ? 'yellow.300' : 
              isCompleted ? 'green.300' : 
              cardBorder
            }
            borderRadius="lg" 
            overflow="hidden"
            boxShadow={
              isLate ? '0 0 0 1px rgba(229, 62, 62, 0.3)' : 
              isDueSoon && isPending ? '0 0 0 1px rgba(236, 201, 75, 0.3)' : 
              isCompleted ? '0 0 0 1px rgba(72, 187, 120, 0.3)' : 
              'none'
            }
          >
            <CardHeader pb={0}>
              <HStack justify="space-between">
                <Heading size="md">{hw.title}</Heading>
                <Badge 
                  colorScheme={
                    isLate ? 'red' : 
                    isCompleted ? 'green' : 
                    'yellow'
                  }
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {hw.status}
                </Badge>
              </HStack>
            </CardHeader>
            
            <CardBody py={3}>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Icon as={FiCalendar} color="gray.500" />
                  <Text>تاريخ التسليم: {formatDateArabic(dueDate)}</Text>
                </HStack>
                
                {isPending && (
                  <HStack>
                    <Icon 
                      as={FiClock} 
                      color={timeRemaining.days < 0 ? 'red.500' : timeRemaining.days <= 2 ? 'yellow.500' : 'blue.500'} 
                    />
                    <Text 
                      color={timeRemaining.days < 0 ? 'red.500' : timeRemaining.days <= 2 ? 'yellow.500' : 'blue.500'}
                      fontWeight="medium"
                    >
                      {timeRemaining.days < 0 
                        ? `متأخر بـ ${Math.abs(timeRemaining.days)} يوم` 
                        : timeRemaining.days === 0 
                          ? `متبقي ${timeRemaining.hours} ساعة` 
                          : `متبقي ${timeRemaining.days} يوم`}
                    </Text>
                  </HStack>
                )}
                
                <Text noOfLines={2}>{hw.description}</Text>
              </VStack>
            </CardBody>
            
            <CardFooter pt={0} justifyContent="space-between">
              <Button 
                variant="outline" 
                colorScheme="primary" 
                size="sm"
                onClick={() => onView(hw)}
              >
                عرض التفاصيل
              </Button>
              
              {isPending && (
                <Button 
                  colorScheme="primary" 
                  size="sm"
                  leftIcon={<FiUpload />}
                  onClick={() => onSubmit(hw)}
                >
                  تسليم
                </Button>
              )}
              
              {isCompleted && (
                <Button 
                  colorScheme="green" 
                  size="sm"
                  variant="ghost"
                  leftIcon={<FiCheckCircle />}
                  isDisabled
                >
                  تم التسليم
                </Button>
              )}
              
              {isLate && !isCompleted && (
                <Button 
                  colorScheme="red" 
                  size="sm"
                  leftIcon={<FiUpload />}
                  onClick={() => onSubmit(hw)}
                >
                  تسليم متأخر
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </Grid>
  );
}
