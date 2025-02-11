import { db } from './drizzle';
import { eq } from 'drizzle-orm';
import { users } from './schema';

export const createUser = async (user: any): Promise<any> => {
  try {
    const [id] = await db.insert(user).values(users);
    return id
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Database query failed")
  }
}

export const getUserByName = async (username: string): Promise<any> => {
  try {
    const result = await db.select().from(users).where(eq(users.name, username)).execute()

    return result[0] || null
  } catch (error) {
    console.error("Error fetching user by name:", error)
    throw new Error("Database query failed")
  }
}

export const getUserById = async (id: number): Promise<any> => {
  try {
    const result = await db.select().from(users).where(eq(users.id, id)).execute()

    return result[0] || null
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    throw new Error("Database query failed")
  }
}

