import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { db } from "../db/drizzle";

// ✅ Create User
export const createUser = async (user: {
  username: string;
  email: string;
  salt: string;
  password_hash: string;
  sessiontoken?: string;
  role: string;
}): Promise<number> => {
  const [result] = await db
    .insert(users)
    .values({
      name: user.username,
      email: user.email,
      salt: user.salt,
      password_hash: user.password_hash,
      role: user.role
    })
    .execute();

  return result.insertId;
};

// ✅ Get All Users
export const getAllUsers = async () => {
  return await db.select().from(users).execute();
};

// ✅ Get User by ID
export const getUserById = async (userId: number) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .execute();

  return user || null;
};

export const getUserByName = async (username: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.name, username))  // Filter by name (username)
    .execute();

  return user || null; // Return user or null if not found
};

// ✅ Update User
export const updateUser = async (
  userId: number,
  updateData: Partial<{
    username: string;
    email: string;
    salt: string;
    password_hash: string;
    sessiontoken?: string;
    role: string;
  }>
) => {
  const [result] = await db
    .update(users)
    .set({
      ...updateData
    })
    .where(eq(users.id, userId))
    .execute();

  return result.affectedRows;
};

export const getUserBySessionToken = async (sessiontoken: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.sessiontoken, sessiontoken))  // Filter by sessiontoken
    .execute();

  return user || null; // Return user or null if not found
};

// ✅ Delete User
export const deleteUser = async (userId: number) => {
  const [result] = await db
    .delete(users)
    .where(eq(users.id, userId))
    .execute();

  return result.affectedRows;
};
