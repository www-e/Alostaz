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
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { 
  FiDollarSign, 
  FiCalendar, 
  FiCreditCard, 
  FiCheckCircle, 
  FiAlertCircle,
  FiFileText,
} from 'react-icons/fi';
import { PageContainer } from '@/components/shared';
import { useAuth, useToast } from '@/lib/hooks';
import { getStudentProfile } from '@/lib/supabase/students';
import { getStudentPayments, getStudentPaymentAmount } from '@/lib/supabase/payments';
import { Student, PaymentRecord, PaymentType } from '@/lib/types';
import { 
  formatDateArabic, 
  getArabicMonth, 
  formatCurrency 
} from '@/lib/utils';

/**
 * Student payments page
 * Shows student payment history, upcoming payments, and payment statistics
 */
export default function StudentPaymentsPage() {
  const { user } = useAuth();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Student data
  const [profile, setProfile] = useState<Student | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<PaymentType | null>(null);
  const [filteredPayments, setFilteredPayments] = useState<PaymentRecord[]>([]);
  
  // Payment stats
  const [totalPaid, setTotalPaid] = useState(0);
  const [pendingPayments, setPendingPayments] = useState<{month: number; year: number}[]>([]);
  
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
          
          // Fetch payment records
          const { payments: paymentRecords, error: paymentsError } = 
            await getStudentPayments(student.id);
          
          if (!paymentsError && paymentRecords) {
            // Sort by date (newest first)
            const sortedPayments = paymentRecords.sort(
              (a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
            );
            
            setPayments(sortedPayments);
            
            // Set default filter to current year
            setSelectedYear(new Date().getFullYear());
            
            // Calculate payment stats
            calculatePaymentStats(sortedPayments);
          }
          
          // Fetch monthly payment amount
          const { amount, error: amountError } = await getStudentPaymentAmount(student.id, 'monthly');
          
          if (!amountError && amount) {
            setMonthlyAmount(amount);
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
  
  // Filter payments by year and type
  useEffect(() => {
    let filtered = [...payments];
    
    if (selectedYear) {
      filtered = filtered.filter(payment => payment.year === selectedYear);
    }
    
    if (selectedType) {
      filtered = filtered.filter(payment => payment.payment_type === selectedType);
    }
    
    setFilteredPayments(filtered);
  }, [selectedYear, selectedType, payments]);
  
  // Calculate payment statistics
  const calculatePaymentStats = (records: PaymentRecord[]) => {
    if (records.length === 0) {
      setTotalPaid(0);
      setPendingPayments([]);
      return;
    }
    
    // Calculate total paid
    const total = records.reduce((sum, payment) => sum + payment.amount, 0);
    setTotalPaid(total);
    
    // Calculate pending payments
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    // Check for pending monthly payments in the current year
    const pending: {month: number; year: number}[] = [];
    
    // Only check months up to the current month
    for (let month = 1; month <= currentMonth; month++) {
      const hasPaid = records.some(
        payment => 
          payment.payment_type === 'monthly' && 
          payment.month === month && 
          payment.year === currentYear
      );
      
      if (!hasPaid) {
        pending.push({ month, year: currentYear });
      }
    }
    
    setPendingPayments(pending);
  };
  
  // Get unique years from payment records
  const getUniqueYears = () => {
    const years = new Set<number>();
    
    payments.forEach(payment => {
      years.add(payment.year);
    });
    
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  };
  
  const uniqueYears = getUniqueYears();
  
  // Handle year selection change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value ? Number(e.target.value) : null;
    setSelectedYear(year);
  };
  
  // Handle payment type selection change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as PaymentType || null;
    setSelectedType(type);
  };
  
  // Get payment type in Arabic
  const getPaymentTypeArabic = (type: PaymentType) => {
    switch (type) {
      case 'monthly':
        return 'اشتراك شهري';
      case 'extra':
        return 'رسوم إضافية';
      default:
        return type;
    }
  };
  
  return (
    <PageContainer 
      title="المدفوعات" 
      isLoading={isLoading}
    >
      {/* Stats cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        {/* Monthly fee card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiCreditCard} boxSize={10} color="blue.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">الرسوم الشهرية</StatLabel>
                <StatNumber fontSize="2xl">{formatCurrency(monthlyAmount)}</StatNumber>
                <StatHelpText>
                  <Badge colorScheme="blue" borderRadius="full" px={2}>
                    شهرياً
                  </Badge>
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Total paid card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon as={FiDollarSign} boxSize={10} color="green.500" mb={2} />
              <Stat>
                <StatLabel fontSize="md">إجمالي المدفوعات</StatLabel>
                <StatNumber fontSize="2xl">{formatCurrency(totalPaid)}</StatNumber>
                <StatHelpText>
                  {selectedYear ? `خلال عام ${selectedYear}` : 'الإجمالي'}
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Pending payments card */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Icon 
                as={pendingPayments.length > 0 ? FiAlertCircle : FiCheckCircle} 
                boxSize={10} 
                color={pendingPayments.length > 0 ? "red.500" : "green.500"} 
                mb={2} 
              />
              <Stat>
                <StatLabel fontSize="md">المدفوعات المعلقة</StatLabel>
                <StatNumber fontSize="2xl">{pendingPayments.length}</StatNumber>
                <StatHelpText>
                  <Badge 
                    colorScheme={pendingPayments.length > 0 ? "red" : "green"} 
                    borderRadius="full" 
                    px={2}
                  >
                    {pendingPayments.length > 0 ? 'يوجد مدفوعات معلقة' : 'جميع المدفوعات مكتملة'}
                  </Badge>
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      
      {/* Pending payments alert */}
      {pendingPayments.length > 0 && (
        <Alert 
          status="warning" 
          variant="left-accent" 
          borderRadius="md" 
          mb={6}
        >
          <AlertIcon />
          <Box>
            <AlertTitle mb={1}>مدفوعات معلقة</AlertTitle>
            <AlertDescription>
              <Text mb={2}>
                لديك {pendingPayments.length} مدفوعات شهرية معلقة لهذا العام:
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {pendingPayments.map((payment, index) => (
                  <Badge key={index} colorScheme="red" p={2} borderRadius="md">
                    {getArabicMonth(new Date(payment.year, payment.month - 1))} {payment.year}
                  </Badge>
                ))}
              </HStack>
            </AlertDescription>
          </Box>
        </Alert>
      )}
      
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
            placeholder="جميع السنوات"
            value={selectedYear || ''}
            onChange={handleYearChange}
            maxW="150px"
          >
            {uniqueYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          
          <Select
            placeholder="جميع أنواع المدفوعات"
            value={selectedType || ''}
            onChange={handleTypeChange}
            maxW="200px"
          >
            <option value="monthly">اشتراك شهري</option>
            <option value="extra">رسوم إضافية</option>
          </Select>
        </HStack>
        
        <Button
          variant="outline"
          colorScheme="primary"
          onClick={() => {
            setSelectedYear(null);
            setSelectedType(null);
          }}
          size="sm"
        >
          عرض الكل
        </Button>
      </Flex>
      
      {/* Payments history */}
      <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden">
        <CardHeader pb={0}>
          <Heading size="md">سجل المدفوعات</Heading>
        </CardHeader>
        <CardBody>
          {filteredPayments.length === 0 ? (
            <Text>لا توجد سجلات مدفوعات</Text>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>التاريخ</Th>
                    <Th>نوع الدفع</Th>
                    <Th>الشهر/السنة</Th>
                    <Th isNumeric>المبلغ</Th>
                    <Th>رقم الإيصال</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredPayments.map((payment, index) => (
                    <Tr key={index}>
                      <Td>{formatDateArabic(new Date(payment.payment_date))}</Td>
                      <Td>
                        <Badge 
                          colorScheme={payment.payment_type === 'monthly' ? 'blue' : 'purple'} 
                          borderRadius="full" 
                          px={2}
                        >
                          {getPaymentTypeArabic(payment.payment_type)}
                        </Badge>
                      </Td>
                      <Td>
                        {payment.month && payment.year ? (
                          `${getArabicMonth(new Date(payment.year, payment.month - 1))} ${payment.year}`
                        ) : (
                          '-'
                        )}
                      </Td>
                      <Td isNumeric fontWeight="bold">
                        {formatCurrency(payment.amount)}
                      </Td>
                      <Td>
                        {payment.receipt_number ? (
                          <HStack>
                            <Icon as={FiFileText} color="gray.500" />
                            <Text>{payment.receipt_number}</Text>
                          </HStack>
                        ) : (
                          '-'
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
      </Card>
      
      {/* Payment information */}
      <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" overflow="hidden" mt={6}>
        <CardHeader pb={0}>
          <Heading size="md">معلومات الدفع</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <Heading size="sm" mb={2}>طرق الدفع المتاحة</Heading>
              <HStack spacing={4} flexWrap="wrap">
                <Badge colorScheme="green" p={2} borderRadius="md">
                  <HStack>
                    <Icon as={FiDollarSign} />
                    <Text>نقداً</Text>
                  </HStack>
                </Badge>
                <Badge colorScheme="blue" p={2} borderRadius="md">
                  <HStack>
                    <Icon as={FiCreditCard} />
                    <Text>بطاقة ائتمان</Text>
                  </HStack>
                </Badge>
                <Badge colorScheme="purple" p={2} borderRadius="md">
                  <HStack>
                    <Icon as={FiCreditCard} />
                    <Text>تحويل بنكي</Text>
                  </HStack>
                </Badge>
              </HStack>
            </Box>
            
            <Divider />
            
            <Box>
              <Heading size="sm" mb={2}>سياسة الدفع</Heading>
              <Text>
                يجب دفع الاشتراك الشهري في بداية كل شهر. في حالة التأخر عن الدفع لمدة تزيد عن أسبوعين، 
                سيتم إرسال إشعار تذكير. يرجى الاحتفاظ بإيصالات الدفع للرجوع إليها عند الحاجة.
              </Text>
            </Box>
            
            <Divider />
            
            <Box>
              <Heading size="sm" mb={2}>للاستفسارات</Heading>
              <Text>
                لأي استفسارات تتعلق بالمدفوعات أو طلب تقسيط، يرجى التواصل مع إدارة المركز مباشرة.
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </PageContainer>
  );
}
