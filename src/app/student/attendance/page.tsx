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
  Select,
  HStack,
  VStack,
  Icon,
  Button,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { 
  FiCalendar, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { PageContainer, StatusBadge } from '@/components/shared';
import { useAuth, useToast } from '@/lib/hooks';
import { getStudentProfile } from '@/lib/supabase/students';
import { getStudentAttendance } from '@/lib/supabase/attendance';
import { Student, AttendanceRecord, AttendanceStatus } from '@/lib/types';
import { 
  formatDateArabic, 
  getArabicMonth, 
  getArabicDay, 
  calculateAttendanceRate 
} from '@/lib/utils';

/**
 * Student attendance page
 * Shows student attendance history, statistics, and calendar view
 */
export default function StudentAttendancePage() {
  const { user } = useAuth();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Student data
  const [profile, setProfile] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  
  // Date states
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  // Filter states
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [filteredAttendance, setFilteredAttendance] = useState<AttendanceRecord[]>([]);
  
  // Stats
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  
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
            // Sort by date (newest first)
            const sortedAttendance = attendanceRecords.sort(
              (a, b) => new Date(b.attendance_date).getTime() - new Date(a.attendance_date).getTime()
            );
            
            setAttendance(sortedAttendance);
            
            // Set default filter to current month and year
            setSelectedMonth(today.getMonth() + 1);
            setSelectedYear(today.getFullYear());
            
            // Calculate attendance stats
            calculateAttendanceStats(sortedAttendance);
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
  
  // Filter attendance by month and year
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const filtered = attendance.filter(record => {
        const recordDate = new Date(record.attendance_date);
        return (
          recordDate.getMonth() + 1 === selectedMonth &&
          recordDate.getFullYear() === selectedYear
        );
      });
      
      setFilteredAttendance(filtered);
      calculateAttendanceStats(filtered);
    } else {
      setFilteredAttendance(attendance);
      calculateAttendanceStats(attendance);
    }
  }, [selectedMonth, selectedYear, attendance]);
  
  // Calculate attendance statistics
  const calculateAttendanceStats = (records: AttendanceRecord[]) => {
    if (records.length === 0) {
      setAttendanceRate(0);
      setPresentCount(0);
      setAbsentCount(0);
      setLateCount(0);
      return;
    }
    
    // Calculate counts by status
    const present = records.filter(record => record.status === 'حضر').length;
    const absent = records.filter(record => record.status === 'غاب').length;
    const late = records.filter(record => record.status === 'تأخر').length;
    
    setPresentCount(present);
    setAbsentCount(absent);
    setLateCount(late);
    
    // Calculate attendance rate
    const rate = calculateAttendanceRate(records);
    setAttendanceRate(rate);
  };
  
  // Get unique months and years from attendance records
  const getUniqueMonthsYears = () => {
    const months = new Set<number>();
    const years = new Set<number>();
    
    attendance.forEach(record => {
      const date = new Date(record.attendance_date);
      months.add(date.getMonth() + 1);
      years.add(date.getFullYear());
    });
    
    return {
      months: Array.from(months).sort((a, b) => a - b),
      years: Array.from(years).sort((a, b) => a - b),
    };
  };
  
  const { months, years } = getUniqueMonthsYears();
  
  // Handle month selection change
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value ? Number(e.target.value) : null;
    setSelectedMonth(month);
  };
  
  // Handle year selection change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value ? Number(e.target.value) : null;
    setSelectedYear(year);
  };
  
  // Get icon based on attendance status
  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'حضر':
        return FiCheckCircle;
      case 'غاب':
        return FiXCircle;
      case 'تأخر':
        return FiAlertCircle;
      default:
        return FiCalendar;
    }
  };
  
  // Get color based on attendance status
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'حضر':
        return 'green';
      case 'غاب':
        return 'red';
      case 'تأخر':
        return 'orange';
      default:
        return 'gray';
    }
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
  
  // Get days in the current month
  const getDaysInMonth = (year: number, month: number) => {
    // Create array of dates for the month
    const date = new Date(year, month - 1, 1);
    const days = [];
    
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };
  
  // Get attendance status for a specific date
  const getAttendanceForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return attendance.find(record => record.attendance_date === dateString);
  };
  
  // Get days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
  return (
    <PageContainer 
      title="سجل الحضور" 
      isLoading={isLoading}
    >
      {/* Stats cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {/* Overall attendance rate */}
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
        
        {/* Present count */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiCheckCircle} boxSize={10} color="green.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">أيام الحضور</StatLabel>
                <StatNumber fontSize="2xl">{presentCount}</StatNumber>
                <StatHelpText>
                  <Badge colorScheme="green" borderRadius="full" px={2}>
                    حضر
                  </Badge>
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Absent count */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiXCircle} boxSize={10} color="red.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">أيام الغياب</StatLabel>
                <StatNumber fontSize="2xl">{absentCount}</StatNumber>
                <StatHelpText>
                  <Badge colorScheme="red" borderRadius="full" px={2}>
                    غاب
                  </Badge>
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Late count */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiAlertCircle} boxSize={10} color="orange.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">أيام التأخير</StatLabel>
                <StatNumber fontSize="2xl">{lateCount}</StatNumber>
                <StatHelpText>
                  <Badge colorScheme="orange" borderRadius="full" px={2}>
                    تأخر
                  </Badge>
                </StatHelpText>
              </Stat>
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
        <HStack spacing={4}>
          <Select
            placeholder="جميع الأشهر"
            value={selectedMonth || ''}
            onChange={handleMonthChange}
            maxW="150px"
          >
            {months.map(month => (
              <option key={month} value={month}>
                {getArabicMonth(new Date(2000, month - 1))}
              </option>
            ))}
          </Select>
          
          <Select
            placeholder="جميع السنوات"
            value={selectedYear || ''}
            onChange={handleYearChange}
            maxW="150px"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </HStack>
        
        <Button
          variant="outline"
          colorScheme="primary"
          onClick={() => {
            setSelectedMonth(null);
            setSelectedYear(null);
          }}
          size="sm"
        >
          عرض الكل
        </Button>
      </Flex>
      
      {/* Attendance history */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 350px' }} gap={6}>
        {/* Attendance list */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardHeader pb={0}>
            <Heading size="md">سجل الحضور</Heading>
          </CardHeader>
          <CardBody>
            {filteredAttendance.length === 0 ? (
              <Text>لا توجد سجلات حضور</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {filteredAttendance.map((record, index) => {
                  const recordDate = new Date(record.attendance_date);
                  const statusIcon = getStatusIcon(record.status);
                  const statusColor = getStatusColor(record.status);
                  
                  return (
                    <Box key={index}>
                      <Flex 
                        p={4} 
                        borderWidth="1px" 
                        borderColor="gray.200" 
                        borderRadius="md" 
                        align="center"
                      >
                        <Box 
                          bg={`${statusColor}.100`} 
                          color={`${statusColor}.500`} 
                          borderRadius="full" 
                          p={2} 
                          mr={4}
                        >
                          <Icon as={statusIcon} boxSize={6} />
                        </Box>
                        
                        <Box flex="1">
                          <HStack>
                            <Text fontWeight="bold">
                              {formatDateArabic(recordDate)}
                            </Text>
                            <Text color="gray.600">
                              {getArabicDay(recordDate)}
                            </Text>
                          </HStack>
                          
                          <HStack mt={1}>
                            <StatusBadge status={record.status} type="attendance" />
                            {record.notes && (
                              <Text fontSize="sm" color="gray.600">
                                {record.notes}
                              </Text>
                            )}
                          </HStack>
                        </Box>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            )}
          </CardBody>
        </Card>
        
        {/* Calendar view */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardHeader pb={0}>
            <Flex justify="space-between" align="center">
              <Heading size="md">التقويم</Heading>
              <HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={goToPreviousMonth}
                  leftIcon={<FiChevronRight />}
                >
                  السابق
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={goToNextMonth}
                  rightIcon={<FiChevronLeft />}
                >
                  التالي
                </Button>
              </HStack>
            </Flex>
            <Text color="gray.600" mt={2}>
              {getArabicMonth(new Date(currentYear, currentMonth - 1))} {currentYear}
            </Text>
          </CardHeader>
          <CardBody>
            {/* Calendar days */}
            <Grid 
              templateColumns="repeat(7, 1fr)" 
              gap={2} 
              mb={2}
            >
              {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(day => (
                <Box 
                  key={day} 
                  textAlign="center" 
                  fontWeight="bold" 
                  py={1}
                  fontSize="sm"
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
                const attendance = getAttendanceForDate(date);
                const isToday = 
                  date.getDate() === today.getDate() && 
                  date.getMonth() === today.getMonth() && 
                  date.getFullYear() === today.getFullYear();
                
                return (
                  <Box
                    key={date.getDate()}
                    bg={attendance ? `${getStatusColor(attendance.status)}.50` : isToday ? 'blue.50' : 'white'}
                    borderRadius="md"
                    border="1px"
                    borderColor={attendance ? `${getStatusColor(attendance.status)}.200` : isToday ? 'blue.200' : 'gray.200'}
                    p={2}
                    position="relative"
                  >
                    <Text 
                      textAlign="center" 
                      fontWeight={isToday ? 'bold' : 'normal'}
                      fontSize="sm"
                    >
                      {date.getDate()}
                    </Text>
                    
                    {attendance && (
                      <Box 
                        position="absolute" 
                        bottom="2px" 
                        left="0" 
                        right="0" 
                        textAlign="center"
                      >
                        <Box 
                          w="8px" 
                          h="8px" 
                          borderRadius="full" 
                          bg={`${getStatusColor(attendance.status)}.500`} 
                          display="inline-block"
                        />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Grid>
            
            {/* Legend */}
            <Divider my={4} />
            
            <Flex justify="space-around" wrap="wrap">
              <HStack>
                <Box w="10px" h="10px" borderRadius="full" bg="green.500" />
                <Text fontSize="sm">حضر</Text>
              </HStack>
              <HStack>
                <Box w="10px" h="10px" borderRadius="full" bg="red.500" />
                <Text fontSize="sm">غاب</Text>
              </HStack>
              <HStack>
                <Box w="10px" h="10px" borderRadius="full" bg="orange.500" />
                <Text fontSize="sm">تأخر</Text>
              </HStack>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </PageContainer>
  );
}
