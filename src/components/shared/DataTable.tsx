import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Flex,
  Spinner,
  Badge
} from '@chakra-ui/react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
  isNumeric?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  isLoading?: boolean;
  emptyMessage?: string;
  maxHeight?: string;
  onRowClick?: (row: T) => void;
}

/**
 * A reusable data table component with support for custom columns and row actions
 */
function DataTable<T>({
  columns,
  data,
  keyField,
  isLoading = false,
  emptyMessage = 'لا توجد بيانات للعرض',
  maxHeight,
  onRowClick
}: DataTableProps<T>) {
  return (
    <Box position="relative" overflowX="auto" w="100%">
      {isLoading && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(255, 255, 255, 0.7)"
          zIndex="1"
          justify="center"
          align="center"
        >
          <Spinner size="xl" color="primary.500" thickness="4px" />
        </Flex>
      )}

      <TableContainer maxH={maxHeight} overflowY={maxHeight ? 'auto' : undefined}>
        <Table variant="simple" size="md">
          <Thead position="sticky" top="0" zIndex="1" bg="white">
            <Tr>
              {columns.map((column, index) => (
                <Th 
                  key={index} 
                  width={column.width} 
                  isNumeric={column.isNumeric}
                  textAlign={column.isNumeric ? 'left' : 'right'}
                  py={3}
                  bg="gray.100"
                  color="gray.700"
                  borderBottom="2px"
                  borderColor="gray.200"
                >
                  {column.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" py={8}>
                  <Text color="gray.500" fontSize="md">
                    {emptyMessage}
                  </Text>
                </Td>
              </Tr>
            ) : (
              data.map((row) => (
                <Tr 
                  key={String(row[keyField])} 
                  _hover={{ bg: 'gray.50' }}
                  cursor={onRowClick ? 'pointer' : 'default'}
                  onClick={() => onRowClick && onRowClick(row)}
                  transition="background-color 0.2s"
                >
                  {columns.map((column, index) => {
                    const cellValue = 
                      typeof column.accessor === 'function'
                        ? column.accessor(row)
                        : row[column.accessor];
                    
                    return (
                      <Td 
                        key={index} 
                        isNumeric={column.isNumeric}
                        textAlign={column.isNumeric ? 'left' : 'right'}
                        py={3}
                        borderColor="gray.100"
                      >
                        {cellValue}
                      </Td>
                    );
                  })}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;
