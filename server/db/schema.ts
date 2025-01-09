import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  email: text('email'),
  salt: varchar('salt'),
  password: varchar('password', {length: 50})
});
