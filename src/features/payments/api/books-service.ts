/**
 * Books Service
 * Handles API operations related to books and book payments
 */

import { supabase } from '@/lib/supabase';
import { BookOption } from '@/types/database';

/**
 * Get all available books for purchase
 * @returns Array of book options with id, name, and price
 */
export const getAvailableBooks = async (): Promise<BookOption[]> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('id, name, price')
      .eq('active', true)
      .order('name');

    if (error) {
      console.error('Error fetching books:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAvailableBooks:', error);
    throw error;
  }
};

/**
 * Get book details by ID
 * @param bookId - The ID of the book
 * @returns Book details
 */
export const getBookById = async (bookId: number): Promise<BookOption | null> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('id, name, price')
      .eq('id', bookId)
      .single();

    if (error) {
      console.error('Error fetching book details:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in getBookById:', error);
    throw error;
  }
};

/**
 * Add a new book to the system
 * @param name - Book name
 * @param price - Book price
 * @returns The newly created book
 */
export const addBook = async (name: string, price: number): Promise<BookOption> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([
        { name, price, active: true }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding book:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in addBook:', error);
    throw error;
  }
};

/**
 * Update book details
 * @param bookId - The ID of the book to update
 * @param name - Updated book name
 * @param price - Updated book price
 * @returns The updated book
 */
export const updateBook = async (
  bookId: number,
  name: string,
  price: number
): Promise<BookOption> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .update({ name, price })
      .eq('id', bookId)
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in updateBook:', error);
    throw error;
  }
};

/**
 * Deactivate a book (soft delete)
 * @param bookId - The ID of the book to deactivate
 */
export const deactivateBook = async (bookId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('books')
      .update({ active: false })
      .eq('id', bookId);

    if (error) {
      console.error('Error deactivating book:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in deactivateBook:', error);
    throw error;
  }
};

/**
 * Get books purchased by a student
 * @param studentId - The student ID
 * @returns Array of books purchased by the student
 */
export const getStudentBooks = async (studentId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        id,
        amount,
        payment_date,
        receipt_number,
        notes,
        book_name,
        books (
          id,
          name,
          price
        )
      `)
      .eq('student_id', studentId)
      .eq('payment_type', 'book')
      .order('payment_date', { ascending: false });

    if (error) {
      console.error('Error fetching student books:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getStudentBooks:', error);
    throw error;
  }
};

export default {
  getAvailableBooks,
  getBookById,
  addBook,
  updateBook,
  deactivateBook,
  getStudentBooks
};
