CREATE TABLE authors (
  author_id   SERIAL PRIMARY KEY,
  fullname    TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE genres (
  genre_id    SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  book_id           SERIAL PRIMARY KEY,
  title             TEXT NOT NULL,
  isbn              VARCHAR(13) UNIQUE,            
  publication_year  INTEGER,
  is_removed        BOOLEAN DEFAULT FALSE,
  author_id         INTEGER REFERENCES authors(author_id), 
  genre_id          INTEGER REFERENCES genres(genre_id)    
);

CREATE TABLE book_authors (
  book_author_id  SERIAL PRIMARY KEY,
  book_id         INTEGER NOT NULL REFERENCES books(book_id) ,
  author_id       INTEGER NOT NULL REFERENCES authors(author_id) ,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE book_copies (
  book_copies_id  SERIAL PRIMARY KEY,
  status          TEXT DEFAULT 'available',  -- e.g., available | borrowed | maintenance | lost
  is_deleted      BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  book_id         INTEGER NOT NULL REFERENCES books(book_id) ON DELETE RESTRICT
);

CREATE TABLE members (
  member_id     SERIAL PRIMARY KEY,
  forename      TEXT,
  surname       TEXT,
  email         TEXT,     -- add UNIQUE if you need to enforce unique emails
  phone_number  TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  postcode      TEXT,
  city          TEXT,
  status        TEXT,     -- e.g., active | suspended | expired
  is_deleted    BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE borrowing_transactions (
  borrowing_transaction_id  SERIAL PRIMARY KEY,
  borrow_date     DATE DEFAULT CURRENT_DATE,
  due_date        DATE,
  returned_date   DATE,
  late_fee_amount NUMERIC(10,2) DEFAULT 0.00,
  return_condition TEXT,     -- e.g., excellent | good | fair | poor | damaged
  status           TEXT,     -- e.g., borrowed | returned | overdue
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  member_id        INTEGER NOT NULL REFERENCES members(member_id),
  book_copies_id   INTEGER NOT NULL REFERENCES book_copies(book_copies_id) 
);