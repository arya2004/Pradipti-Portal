import { Request, Response } from 'express';
import { fetchUsers, addUser } from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  const users = await fetchUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await addUser({ name, email });
  res.json(user);
};
