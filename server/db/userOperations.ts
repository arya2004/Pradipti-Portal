import { db } from './drizzle';
import { eq } from 'drizzle-orm';
import { users } from './schema';

export const createUser = async (user: {
  id: number;
  name: string;
  email: string;
  salt: string;
  password: string;
}): Promise<any> => {
  try {
    const result = await db
      .insert(users)
      .values({
        name: user.name,
        email: user.email,
        salt: user.salt,
        password: user.password,
      })
      .returning();

    return result[0]; 
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database insertion failed');
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