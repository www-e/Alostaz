/**
 * Student Selector Component
 * Provides a searchable dropdown to select students for payment operations
 */

import React, { useState, useEffect, useRef } from 'react';
import { getStudentsByGroup } from '@/features/students/api/students-service';
import { Student } from '@/types/database';
import { 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface StudentSelectorProps {
  groupDayId: number;
  selectedStudentId: string;
  onSelectStudent: (studentId: string, studentName: string) => void;
  placeholder?: string;
  className?: string;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  groupDayId,
  selectedStudentId,
  onSelectStudent,
  placeholder = 'اختر طالب',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch students when groupDayId changes
  useEffect(() => {
    if (groupDayId) {
      fetchStudents();
    } else {
      setStudents([]);
      setFilteredStudents([]);
    }
  }, [groupDayId]);

  // Update selected student when selectedStudentId changes
  useEffect(() => {
    if (selectedStudentId && students.length > 0) {
      const student = students.find(s => s.id === selectedStudentId);
      if (student) {
        setSelectedStudent(student);
      }
    } else if (!selectedStudentId) {
      setSelectedStudent(null);
    }
  }, [selectedStudentId, students]);

  // Filter students when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudentsByGroup(groupDayId);
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    onSelectStudent(student.id, student.full_name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="relative w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-right cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {selectedStudent ? (
            <>
              <UserIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="block truncate">{selectedStudent.full_name}</span>
            </>
          ) : (
            <span className="block truncate text-gray-500 dark:text-gray-400">{placeholder}</span>
          )}
        </span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-700 p-2">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="block w-full pr-10 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-2 px-3 text-gray-500 dark:text-gray-400 text-center">
              {searchTerm ? 'لا توجد نتائج' : 'لا يوجد طلاب في هذه المجموعة'}
            </div>
          ) : (
            <ul className="max-h-48 overflow-y-auto" role="listbox">
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    selectedStudent?.id === student.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                  }`}
                  role="option"
                  aria-selected={selectedStudent?.id === student.id}
                  onClick={() => handleSelectStudent(student)}
                >
                  <div className="flex items-center">
                    <UserIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="font-normal block truncate">{student.full_name}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSelector;
