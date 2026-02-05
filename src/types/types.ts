export interface Book {
  book_id: number;
  title: string;
  isbn: string;
  publication_year: number;
  is_removed: boolean;
  genre_id: number;
}

export interface Author {
  author_id: number;
  fullname: string;
}

export interface Member {
  member_id: number;
  forename: string;
  surname: string;
  email: string;
  phone_number: string;
  address_line1: string;
  address_line2: string;
  postcode: string;
  city: string;
  status: 'active' | 'inactive' | 'banned';
}

export interface BorrowingTransaction {
  borrowing_transaction_id: number;
  borrow_date: Date;
  due_date: Date;
  returned_date: Date;
  late_fee_amount: number;
  return_condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  status: 'borrowed' | 'returned' | 'overdue';
  member_id: number;
  book_copy_id: number;
}
