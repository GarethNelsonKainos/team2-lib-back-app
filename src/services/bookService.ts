import db from "../db";
import { Book } from "../types/types";

export const getBooks = async (): Promise<Book[]> => {
  const rows = await db.query("SELECT * FROM books WHERE is_removed = false");
  return rows as Book[];
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const rows = await db.query(
    "SELECT * FROM books WHERE book_id = $1 AND is_removed = false",
    [id],
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0] as Book;
};

export const createBook = async (
  title: string,
  isbn: string,
  publication_year: number,
  genre_id: number,
): Promise<Book> => {
  const rows = await db.query(
    "INSERT INTO books (title, isbn, publication_year, genre_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, isbn, publication_year, genre_id],
  );
  if (rows.length === 0) {
    throw new Error("Could not create book");
  }
  return rows[0] as Book;
};

export const updateBook = async (
  id: number,
  book: Partial<Book>,
): Promise<Book | null> => {
  const existingBook = await getBookById(id);
  if (!existingBook) {
    return null;
  }

  const updatedBook = { ...existingBook, ...book };
  const { title, isbn, publication_year, genre_id } = updatedBook;

  const rows = await db.query(
    "UPDATE books SET title = $1, isbn = $2, publication_year = $3, genre_id = $4 WHERE book_id = $5 RETURNING *",
    [title, isbn, publication_year, genre_id, id],
  );

  if (rows.length === 0) {
    return null;
  }
  return rows[0] as Book;
};

export const setBookAsRemoved = async (id: number): Promise<boolean> => {
  try {
    const rows = await db.query(
      "UPDATE books SET is_removed = true WHERE book_id = $1 RETURNING book_id",
      [id],
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error removing book:", error);
    return false;
  }
};
