import db from "../db";
import { BorrowingTransaction } from "../types/types";

export const borrowBook = async (
  memberId: number,
  bookCopyId: number,
): Promise<BorrowingTransaction> => {
  // In a real app, you'd have more logic here:
  // 1. Check if the member can borrow (not at their limit, not banned).
  // 2. Check if the book copy is available.
  // 3. Create the transaction and update the book copy status.

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 14-day loan period

  const rows = await db.query(
    "INSERT INTO borrowing_transactions (member_id, book_copy_id, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [memberId, bookCopyId, dueDate, "borrowed"],
  );

  if (rows.length === 0) {
    throw new Error("Could not borrow book");
  }

  await db.query(
    "UPDATE book_copy SET status = 'borrowed' WHERE book_copy_id = $1",
    [bookCopyId],
  );

  return rows[0] as BorrowingTransaction;
};

export const returnBook = async (
  transactionId: number,
): Promise<BorrowingTransaction | null> => {
  const transactionRows = await db.query(
    "SELECT * FROM borrowing_transactions WHERE borrowing_transaction_id = $1",
    [transactionId],
  );
  if (transactionRows.length === 0) {
    return null;
  }
  const transaction = transactionRows[0] as BorrowingTransaction;

  const returnedRows = await db.query(
    "UPDATE borrowing_transactions SET returned_date = CURRENT_DATE, status = 'returned' WHERE borrowing_transaction_id = $1 RETURNING *",
    [transactionId],
  );

  if (returnedRows.length === 0) {
    return null;
  }

  await db.query(
    "UPDATE book_copy SET status = 'available' WHERE book_copy_id = $1",
    [transaction.book_copy_id],
  );

  return returnedRows[0] as BorrowingTransaction;
};
