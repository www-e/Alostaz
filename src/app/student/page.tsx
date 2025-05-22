'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Badge,
  SimpleGrid,
  HStack,
  VStack,
  Icon,
  Divider,
  List,
  ListItem,
  Avatar,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FiCalendar, 
  FiClock, 
  FiDollarSign, 
  FiBook, 
  FiCheckCircle, 
  FiAlertCircle,
  FiBarChart2,
} from 'react-icons/fi';
import { PageContainer } from '@/components/shared';
import { useAuth, useToast } from '@/lib/hooks';
import { getStudentProfile } from '@/lib/supabase/students';
import { getStudentAttendance } from '@/lib/supabase/attendance';
import { getStudentPayments } from '@/lib/supabase/payments';
import { getStudentHomework } from '@/lib/supabase/homework';
import { getStudentUpcomingClasses } from '@/lib/supabase/groups';
import { Student, AttendanceRecord, PaymentRecord, HomeworkRecord, GroupClass } from '@/lib/types';
import { formatDateArabic, formatTimeArabic, getArabicDay, calculateAttendanceRate } from '@/lib/utils';

/**
 * Main dashboard page for student view
 * Shows student profile, attendance stats, upcoming classes, and recent activities
 */
export default function StudentDashboard() {
  const { user } = useAuth();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Student data
  const [profile, setProfile] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [homework, setHomework] = useState<HomeworkRecord[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<GroupClass[]>([]);
  
  // Stats
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [completedHomework, setCompletedHomework] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  
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
          
          // Fetch attendance records
          const { attendance: attendanceRecords, error: attendanceError } = 
            await getStudentAttendance(student.id);
          
          if (!attendanceError && attendanceRecords) {
            setAttendance(attendanceRecords);
            
            // Calculate attendance rate
            const rate = calculateAttendanceRate(attendanceRecords);
            setAttendanceRate(rate);
          }
          
          // Fetch payment records
          const { payments: paymentRecords, error: paymentsError } = 
            await getStudentPayments(student.id);
          
          if (!paymentsError && paymentRecords) {
            setPayments(paymentRecords);
            
            // Calculate pending payments
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            
            // Check if current month payment is made
            const hasPaidCurrentMonth = paymentRecords.some(
              payment => 
                payment.payment_type === 'monthly' && 
                payment.month === currentMonth && 
                payment.year === currentYear
            );
            
            setPendingPayments(hasPaidCurrentMonth ? 0 : 1);
          }
          
          // Fetch homework records
          const { homework: homeworkRecords, error: homeworkError } = 
            await getStudentHomework(student.id);
          
          if (!homeworkError && homeworkRecords) {
            setHomework(homeworkRecords);
            
            // Calculate completed homework percentage
            if (homeworkRecords.length > 0) {
              const completed = homeworkRecords.filter(hw => hw.status === 'مكتمل').length;
              setCompletedHomework(Math.round((completed / homeworkRecords.length) * 100));
            }
          }
          
          // Fetch upcoming classes
          const { classes, error: classesError } = 
            await getStudentUpcomingClasses(student.id);
          
          if (!classesError && classes) {
            setUpcomingClasses(classes);
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
  
  // Get recent activities from attendance, payments, and homework
  const getRecentActivities = () => {
    const activities = [
      ...attendance.slice(0, 5).map(record => ({
        type: 'attendance',
        date: new Date(record.attendance_date),
        title: `تم تسجيل ${record.status}`,
        description: `تم تسجيل ${record.status} في يوم ${formatDateArabic(new Date(record.attendance_date))}`,
        icon: FiCalendar,
        color: record.status === 'حضر' ? 'green' : record.status === 'غاب' ? 'red' : 'orange',
      })),
      ...payments.slice(0, 3).map(record => ({
        type: 'payment',
        date: new Date(record.payment_date),
        title: `تم دفع ${record.amount} ريال`,
        description: `تم دفع ${record.amount} ريال كـ ${record.payment_type === 'monthly' ? 'اشتراك شهري' : 'رسوم إضافية'}`,
        icon: FiDollarSign,
        color: 'blue',
      })),
      ...homework.slice(0, 3).map(record => ({
        type: 'homework',
        date: new Date(record.due_date),
        title: `واجب: ${record.title}`,
        description: `حالة الواجب: ${record.status}`,
        icon: FiBook,
        color: record.status === 'مكتمل' ? 'green' : record.status === 'متأخر' ? 'red' : 'yellow',
      })),
    ];
    
    // Sort by date (newest first)
    return activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  };
  
  const recentActivities = getRecentActivities();
  
  return (
    <PageContainer 
      title={`مرحباً، ${profile?.full_name || user?.full_name || 'طالب'}`}
      isLoading={isLoading}
    >
      {/* Stats cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {/* Attendance card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiBarChart2} boxSize={10} color="blue.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">نسبة الحضور</StatLabel>
                <StatNumber fontSize="2xl">{attendanceRate}%</StatNumber>
                <Progress 
                  value={attendanceRate} 
                  colorScheme={attendanceRate > 75 ? 'green' : attendanceRate > 50 ? 'yellow' : 'red'} 
                  size="sm" 
                  borderRadius="full" 
                  mt={2}
                />
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Upcoming classes card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiClock} boxSize={10} color="purple.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">الحصص القادمة</StatLabel>
                <StatNumber fontSize="2xl">{upcomingClasses.length}</StatNumber>
                <StatHelpText>
                  {upcomingClasses.length > 0 
                    ? `القادمة: ${formatDateArabic(new Date(upcomingClasses[0].class_date))}` 
                    : 'لا توجد حصص قادمة'}
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Homework card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiBook} boxSize={10} color="orange.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">إكمال الواجبات</StatLabel>
                <StatNumber fontSize="2xl">{completedHomework}%</StatNumber>
                <Progress 
                  value={completedHomework} 
                  colorScheme={completedHomework > 75 ? 'green' : completedHomework > 50 ? 'yellow' : 'red'} 
                  size="sm" 
                  borderRadius="full" 
                  mt={2}
                />
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Payments card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiDollarSign} boxSize={10} color="green.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">المدفوعات المعلقة</StatLabel>
                <StatNumber fontSize="2xl">{pendingPayments}</StatNumber>
                <HStack justify="center" mt={2}>
                  <Badge colorScheme={pendingPayments > 0 ? 'red' : 'green'} borderRadius="full" px={2}>
                    {pendingPayments > 0 ? 'يوجد مدفوعات معلقة' : 'جميع المدفوعات مكتملة'}
                  </Badge>
                </HStack>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Main content */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 300px' }} gap={6}>
        {/* Left column */}
        <Box>
          {/* Upcoming classes */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" mb={6}>
            <CardHeader pb={0}>
              <Heading size="md">الحصص القادمة</Heading>
            </CardHeader>
            <CardBody>
              {upcomingClasses.length === 0 ? (
                <Text>لا توجد حصص قادمة</Text>
              ) : (
                <List spacing={3}>
                  {upcomingClasses.slice(0, 5).map((classItem, index) => (
                    <ListItem key={index}>
                      <Flex 
                        p={3} 
                        bg="gray.50" 
                        borderRadius="md" 
                        borderWidth="1px" 
                        borderColor="gray.200"
                        align="center"
                      >
                        <Box 
                          bg="primary.500" 
                          color="white" 
                          borderRadius="md" 
                          p={3} 
                          textAlign="center" 
                          minW="60px"
                          mr={4}
                        >
                          <Text fontWeight="bold" fontSize="lg">
                            {new Date(classItem.class_date).getDate()}
                          </Text>
                          <Text fontSize="sm">
                            {getArabicDay(new Date(classItem.class_date)).slice(0, 3)}
                          </Text>
                        </Box>
                        <Box flex="1">
                          <Text fontWeight="bold">
                            {classItem.subject || 'حصة دراسية'}
                          </Text>
                          <HStack mt={1}>
                            <Icon as={FiClock} color="gray.500" />
                            <Text fontSize="sm" color="gray.600">
                              {formatTimeArabic(new Date(classItem.start_time))} - {formatTimeArabic(new Date(classItem.end_time))}
                            </Text>
                          </HStack>
                        </Box>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardBody>
            {upcomingClasses.length > 5 && (
              <CardFooter pt={0}>
                <Button variant="ghost" colorScheme="primary" size="sm" width="full">
                  عرض كل الحصص
                </Button>
              </CardFooter>
            )}
          </Card>
          
          {/* Recent activities */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg">
            <CardHeader pb={0}>
              <Heading size="md">آخر النشاطات</Heading>
            </CardHeader>
            <CardBody>
              {recentActivities.length === 0 ? (
                <Text>لا توجد نشاطات حديثة</Text>
              ) : (
                <VStack spacing={4} align="stretch">
                  {recentActivities.map((activity, index) => (
                    <Box key={index}>
                      <Flex align="center">
                        <Box 
                          p={2} 
                          bg={`${activity.color}.100`} 
                          color={`${activity.color}.500`} 
                          borderRadius="full" 
                          mr={3}
                        >
                          <Icon as={activity.icon} boxSize={5} />
                        </Box>
                        <Box flex="1">
                          <Text fontWeight="medium">{activity.title}</Text>
                          <Text fontSize="sm" color="gray.600">{activity.description}</Text>
                        </Box>
                        <Text fontSize="sm" color="gray.500">
                          {formatDateArabic(activity.date)}
                        </Text>
                      </Flex>
                      {index < recentActivities.length - 1 && <Divider mt={4} />}
                    </Box>
                  ))}
                </VStack>
              )}
            </CardBody>
          </Card>
        </Box>
        
        {/* Right column */}
        <Box>
          {/* Student profile card */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" mb={6}>
            <CardHeader pb={0}>
              <Heading size="md">الملف الشخصي</Heading>
            </CardHeader>
            <CardBody>
              <Flex direction="column" align="center" mb={4}>
                <Avatar 
                  size="xl" 
                  name={profile?.full_name || user?.full_name} 
                  src={profile?.avatar_url || user?.avatar_url} 
                  mb={3}
                />
                <Heading size="md">{profile?.full_name || user?.full_name}</Heading>
                <Text color="gray.600">
                  {profile?.grade_name || 'طالب'}
                  {profile?.track_name && ` - ${profile.track_name}`}
                </Text>
              </Flex>
              
              <Divider mb={4} />
              
              <VStack spacing={3} align="stretch">
                <Flex justify="space-between">
                  <Text color="gray.600">رقم الهاتف:</Text>
                  <Text fontWeight="medium">{profile?.phone || 'غير متوفر'}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">البريد الإلكتروني:</Text>
                  <Text fontWeight="medium">{profile?.email || user?.email || 'غير متوفر'}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">رقم الهوية:</Text>
                  <Text fontWeight="medium">{profile?.id_number || 'غير متوفر'}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">المجموعة:</Text>
                  <Text fontWeight="medium">
                    {profile?.group_day_id ? `مجموعة ${profile.group_day_id}` : 'غير متوفر'}
                  </Text>
                </Flex>
              </VStack>
            </CardBody>
            <CardFooter pt={0}>
              <Button 
                colorScheme="primary" 
                variant="outline" 
                width="full"
                onClick={() => window.location.href = '/student/settings'}
              >
                تعديل البيانات
              </Button>
            </CardFooter>
          </Card>
          
          {/* Homework reminders */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg">
            <CardHeader pb={0}>
              <Heading size="md">تذكير بالواجبات</Heading>
            </CardHeader>
            <CardBody>
              {homework.filter(hw => hw.status !== 'مكتمل').length === 0 ? (
                <Text>لا توجد واجبات معلقة</Text>
              ) : (
                <List spacing={3}>
                  {homework
                    .filter(hw => hw.status !== 'مكتمل')
                    .slice(0, 3)
                    .map((hw, index) => {
                      const dueDate = new Date(hw.due_date);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      const isOverdue = dueDate < today;
                      const isDueSoon = !isOverdue && 
                        dueDate.getTime() - today.getTime() <= 2 * 24 * 60 * 60 * 1000; // 2 days
                      
                      return (
                        <ListItem key={index}>
                          <Flex 
                            p={3} 
                            bg={isOverdue ? 'red.50' : isDueSoon ? 'yellow.50' : 'gray.50'} 
                            borderRadius="md" 
                            borderWidth="1px" 
                            borderColor={isOverdue ? 'red.200' : isDueSoon ? 'yellow.200' : 'gray.200'}
                          >
                            <Icon 
                              as={isOverdue ? FiAlertCircle : FiBook} 
                              color={isOverdue ? 'red.500' : isDueSoon ? 'yellow.500' : 'blue.500'} 
                              boxSize={5} 
                              mr={3} 
                              mt={1}
                            />
                            <Box flex="1">
                              <Text fontWeight="medium">{hw.title}</Text>
                              <HStack mt={1}>
                                <Icon as={FiCalendar} color="gray.500" size="sm" />
                                <Text fontSize="sm" color="gray.600">
                                  تاريخ التسليم: {formatDateArabic(dueDate)}
                                </Text>
                              </HStack>
                              <Badge 
                                mt={2} 
                                colorScheme={isOverdue ? 'red' : isDueSoon ? 'yellow' : 'blue'}
                              >
                                {isOverdue ? 'متأخر' : isDueSoon ? 'قريب' : hw.status}
                              </Badge>
                            </Box>
                          </Flex>
                        </ListItem>
                      );
                    })}
                </List>
              )}
            </CardBody>
            {homework.filter(hw => hw.status !== 'مكتمل').length > 0 && (
              <CardFooter pt={0}>
                <Button 
                  colorScheme="primary" 
                  variant="ghost" 
                  size="sm" 
                  width="full"
                  onClick={() => window.location.href = '/student/homework'}
                >
                  عرض كل الواجبات
                </Button>
              </CardFooter>
            )}
          </Card>
        </Box>
      </Grid>
    </PageContainer>
  );
}
