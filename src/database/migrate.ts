import { type SQLiteDatabase } from "expo-sqlite";

export async function migrate(database: SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount FLOAT NOT NULL,
      type TEXT NOT NULL,
      is_installment INTEGER NOT NULL DEFAULT 0,
      installments INTEGER,
      
      category_id INTEGER NOT NULL,
      account_id INTEGER NOT NULL,

      transaction_date timestamp NOT NULL,
      created_at timestamp NOT NULL DEFAULT current_timestamp,
      updated_at timestamp NOT NULL DEFAULT current_timestamp,

      CONSTRAINT fk_transactions_category
        FOREIGN KEY (category_id) REFERENCES categories(id),

      CONSTRAINT fk_transactions_account
        FOREIGN KEY (account_id) REFERENCES accounts(id)
    );

    CREATE TABLE IF NOT EXISTS installments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_id INTEGER NOT NULL,
      installment_number INTEGER NOT NULL,
      amount REAL NOT NULL,
      due_date DATE NOT NULL,

      FOREIGN KEY (transaction_id)
        REFERENCES transactions(id)
        ON DELETE CASCADE
    );
  `);
}

/* export async function migrate(database: SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA foreign_keys = OFF;

    DROP TABLE IF EXISTS installments;
    DROP TABLE IF EXISTS transactions;
    DROP TABLE IF EXISTS accounts;
    DROP TABLE IF EXISTS categories;

    PRAGMA foreign_keys = ON;
  `);
} */
