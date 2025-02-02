import { db } from './drizzle';
import { eq } from 'drizzle-orm';
import { users } from './schema';

export const createUser = async (user: {
    username: string;
    email: string;
    salt: string;
    password_hash: string;
    sessiontoken?: string;
  }): Promise<number> => {
    try {
      const [result] = await db
        .insert(users)
        .values({
          name: user.username,
          email: user.email,
          salt: user.salt,
          password_hash: user.password_hash,
          sessiontoken: user.sessiontoken || null, // Default to null if not provided
          created_at: new Date(),
          updated_at: new Date(),
          role: "admin",
        })
        .execute();
  
      return result.insertId; // MySQL returns insertId for auto-increment primary keys
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Database insertion failed");
    }
  };

export const getUserByUID = async (id: number): Promise<any[]> => {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id));
  
      return result;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Database query failed');
    }
  };