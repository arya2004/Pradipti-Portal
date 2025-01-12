import { db } from './drizzle';
import { eq } from 'drizzle-orm';
import { users } from './schema';
import express from 'express';

export const createUser = async (user: {
  id: number;
  name: string;
  email: string;
  salt: string;
  password: string;
  sessiontoken: string;
}): Promise<any> => {
  try {
    const result = await db
      .insert(users)
      .values({
        name: user.name,
        email: user.email,
        salt: user.salt,
        password: user.password,
        sessiontoken: user.sessiontoken,
      })
      .returning();

    return result[0]; 
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database insertion failed');
  }
};
export const getUsers = async (): Promise<any[]> => {
  try {
    const result = await db
      .select()
      .from(users);

    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Database query failed');
  }
};

export const getAllUsers = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const users = await getUsers();

    if (!users || users.length === 0) {
      res.status(404).json({ message: 'No users found' });
      return;
    }
    res.status(200).json(users);

  } catch (e) {
    console.error('Error fetching users:', e);
    res.status(500).json({ message: 'Internal server error' });
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

export const getUserBySessionToken = async (sessiontoken : string): Promise<any[]> => {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.sessiontoken, sessiontoken));
  
      return result;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Database query failed');
    }
  };

  export const getUserByName = async (username: string): Promise<any[]> => {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.name, username));
  
      return result;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw new Error('Database query failed');
    }
  };
  
  export const updateUserById = async (id: number, updatedUser: {
    name?: string;
    email?: string;
    salt?: string;
    password?: string;
    sessiontoken?: string;
  }): Promise<any> => {
    try {
      const result = await db
        .update(users)
        .set({
          ...(updatedUser.name && { name: updatedUser.name }),
          ...(updatedUser.email && { email: updatedUser.email }),
          ...(updatedUser.salt && { salt: updatedUser.salt }),
          ...(updatedUser.password && { password: updatedUser.password }),
          ...(updatedUser.sessiontoken && { sessiontoken: updatedUser.sessiontoken }),
        })
        .where(eq(users.id, id))
        .returning();
  
      return result[0];
    } catch (error) {
      console.error('Error updating user by ID:', error);
      throw new Error('Database update failed');
    }
  };