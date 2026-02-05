import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const book = await bookService.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updatedBook = await bookService.updateBook(id, req.body);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
};


/// WOULD BE PATCH IE SOFT DELETE
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await bookService.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};
