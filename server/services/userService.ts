import { db } from '../db/drizzle';
import { users } from '../db/schema';

export const fetchUsers = async () => {
  return db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    salt: users.salt,
    password: users.password,
    sessiontoken: users.sessiontoken
  }).from(users);
};

export const addUser = async (data: { name: string; email: string }) => {
  return db.insert(users).values(data).returning();
};
