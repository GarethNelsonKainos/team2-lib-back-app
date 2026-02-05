import db from '../db';
import { Book } from '../types/types';

export const getBooks = async (): Promise<Book[]> => {
  const result = await db.query('SELECT * FROM books WHERE is_removed = false');
  return result as Book[];
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const result = await db.query('SELECT * FROM books WHERE book_id = $1 AND is_removed = false', [id]);
  return result.length > 0 ? (result[0] as Book) : null;
};

export const createBook = async (book: Omit<Book, 'book_id' | 'is_removed'>): Promise<Book> => {
  const { title, isbn, publication_year, genre_id } = book;
  const result = await db.query(
    'INSERT INTO books (title, isbn, publication_year, genre_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, isbn, publication_year, genre_id]
  );
  return result[0] as Book;
};

export const updateBook = async (id: number, book: Partial<Book>): Promise<Book | null> => {
  const existingBook = await getBookById(id);
  if (!existingBook) {
    return null;
  }

  const updatedBook = { ...existingBook, ...book };
  const { title, isbn, publication_year, genre_id } = updatedBook;

  const result = await db.query(
    'UPDATE books SET title = $1, isbn = $2, publication_year = $3, genre_id = $4 WHERE book_id = $5 RETURNING *',
    [title, isbn, publication_year, genre_id, id]
  );

  return result[0] as Book;
};

export const deleteBook = async (id: number): Promise<boolean> => {
    // Instead of deleting, we mark as removed
    const result = await db.query('UPDATE books SET is_removed = true WHERE book_id = $1', [id]);
    return true;
};
