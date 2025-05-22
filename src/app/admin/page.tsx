'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  Heading,
  Text,
  Flex,
  Icon,
  Divider,
  Progress,
  HStack,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { FiUsers, FiCalendar, FiDollarSign, FiBook } from 'react-icons/fi';
import { PageContainer } from '@/components/shared';
import { useAuth, useToast } from '@/lib/hooks';
import { getAllStudents } from '@/lib/supabase/students';
import { getStudentAttendanceStats } from '@/lib/supabase/attendance';
import { formatDateForDB } from '@/lib/utils';

/**
 * Admin dashboard home page
 * Displays key metrics and recent activity
 */
export default function AdminDashboardPage() {
  const { user } = useAuth();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    attendanceRate: 0,
    paymentRate: 0,
  });
  const [attendanceStats, setAttendanceStats] = useState<{ status: string; count: number }[]>([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Get all students
        const { students, error: studentsError } = await getAllStudents();
        
        if (studentsError) {
          showToast.showErrorToast('خطأ في جلب البيانات', studentsError);
          return;
        }
        
        // Calculate student stats
        const totalStudents = students.length;
        const activeStudents = students.filter(student => student.active).length;
        
        // Get attendance stats for the current month
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        // Sample student for stats (first active student)
        const sampleStudent = students.find(student => student.active);
        
        let attendanceStats: { status: string; count: number }[] = [];
        
        if (sampleStudent) {
          const { stats: attStats, error: attError } = await getStudentAttendanceStats(
            sampleStudent.id,
            formatDateForDB(firstDayOfMonth),
            formatDateForDB(lastDayOfMonth)
          );
          
          if (!attError) {
            attendanceStats = attStats;
          }
        }
        
        // Calculate attendance rate (present / total)
        const presentCount = attendanceStats.find(stat => stat.status === 'حضر')?.count || 0;
        const totalAttendance = attendanceStats.reduce((sum, stat) => sum + stat.count, 0);
        const attendanceRate = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;
        
        // Set stats
        setStats({
          totalStudents,
          activeStudents,
          attendanceRate,
          paymentRate: 75, // Placeholder - would be calculated from actual payment data
        });
        
        setAttendanceStats(attendanceStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء جلب بيانات لوحة التحكم');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [showToast]);

  return (
    <PageContainer title="لوحة التحكم" isLoading={isLoading}>
      {/* Stats cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="إجمالي الطلاب"
          value={stats.totalStudents}
          icon={FiUsers}
          helpText={`${stats.activeStudents} طالب نشط`}
          accentColor="primary.500"
        />
        
        <StatCard
          title="نسبة الحضور"
          value={`${Math.round(stats.attendanceRate)}%`}
          icon={FiCalendar}
          helpText="هذا الشهر"
          accentColor="green.500"
        />
        
        <StatCard
          title="نسبة الدفع"
          value={`${stats.paymentRate}%`}
          icon={FiDollarSign}
          helpText="هذا الشهر"
          accentColor="blue.500"
        />
        
        <StatCard
          title="المذكرات"
          value="12"
          icon={FiBook}
          helpText="تم توزيعها هذا الشهر"
          accentColor="orange.500"
        />
      </SimpleGrid>
      
      {/* Activity and stats section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              إحصائيات الحضور
            </Heading>
            
            <VStack spacing={4} align="stretch">
              <AttendanceStatItem
                status="حضر"
                count={attendanceStats.find(stat => stat.status === 'حضر')?.count || 0}
                color="green.500"
              />
              
              <AttendanceStatItem
                status="غاب"
                count={attendanceStats.find(stat => stat.status === 'غاب')?.count || 0}
                color="red.500"
              />
              
              <AttendanceStatItem
                status="تأخر"
                count={attendanceStats.find(stat => stat.status === 'تأخر')?.count || 0}
                color="orange.500"
              />
            </VStack>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              النشاط الأخير
            </Heading>
            
            <VStack spacing={4} align="stretch">
              <ActivityItem
                title="تم تسجيل حضور مجموعة الأحد والأربعاء"
                time="منذ ساعتين"
                type="attendance"
              />
              
              <ActivityItem
                title="تم تحصيل مدفوعات شهر مايو من 5 طلاب"
                time="منذ 3 ساعات"
                type="payment"
              />
              
              <ActivityItem
                title="تم إضافة طالب جديد: أحمد محمد"
                time="منذ 5 ساعات"
                type="student"
              />
              
              <ActivityItem
                title="تم توزيع مذكرة شهر مايو"
                time="منذ يوم واحد"
                type="book"
              />
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </PageContainer>
  );
}

// Stat card component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  helpText: string;
  accentColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  helpText,
  accentColor,
}) => {
  return (
    <Card overflow="hidden" position="relative">
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        width="5px"
        bg={accentColor}
      />
      <CardBody>
        <Flex justify="space-between" align="center">
          <Box>
            <StatLabel fontSize="sm" color="gray.500">
              {title}
            </StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold">
              {value}
            </StatNumber>
            <StatHelpText fontSize="xs">{helpText}</StatHelpText>
          </Box>
          <Flex
            width="50px"
            height="50px"
            bg={`${accentColor}20`}
            color={accentColor}
            borderRadius="full"
            justify="center"
            align="center"
          >
            <Icon as={icon} boxSize={6} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

// Attendance stat item component
interface AttendanceStatItemProps {
  status: string;
  count: number;
  color: string;
}

const AttendanceStatItem: React.FC<AttendanceStatItemProps> = ({
  status,
  count,
  color,
}) => {
  return (
    <Box>
      <Flex justify="space-between" mb={2}>
        <Text fontWeight="medium">{status}</Text>
        <Text fontWeight="bold">{count}</Text>
      </Flex>
      <Progress value={count} max={20} colorScheme={color.split('.')[0]} borderRadius="full" size="sm" />
    </Box>
  );
};

// Activity item component
interface ActivityItemProps {
  title: string;
  time: string;
  type: 'attendance' | 'payment' | 'student' | 'book';
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  time,
  type,
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'attendance':
        return 'green';
      case 'payment':
        return 'blue';
      case 'student':
        return 'purple';
      case 'book':
        return 'orange';
      default:
        return 'gray';
    }
  };
  
  return (
    <Box>
      <HStack spacing={3}>
        <Badge colorScheme={getTypeColor()} borderRadius="full" px={2}>
          {type === 'attendance' && 'حضور'}
          {type === 'payment' && 'دفع'}
          {type === 'student' && 'طالب'}
          {type === 'book' && 'مذكرة'}
        </Badge>
        <Text fontWeight="medium">{title}</Text>
      </HStack>
      <Text fontSize="xs" color="gray.500" mt={1} mr={10}>
        {time}
      </Text>
      <Divider mt={3} />
    </Box>
  );
};
