import { Request, Response } from 'express';
import * as borrowingService from '../services/borrowingService';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { memberId, bookCopyId } = req.body;
    const transaction = await borrowingService.borrowBook(memberId, bookCopyId);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book' });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const transaction = await borrowingService.returnBook(id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Borrowing transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error returning book' });
  }
};
