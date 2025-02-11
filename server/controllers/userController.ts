import { Request, Response } from 'express';
import { getAllUsers, createUser} from '../services/user.service';
import { authentication, random } from '../encryption';

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email, and password are required' });
    return;
  }

  const salt = random();
  const password_hash = authentication(salt, password);

  const user = await createUser({
    username: name, 
    email: email,
    salt: salt,
    password_hash: password_hash,
    role: 'user',  // Default role can be user
  });
  
  res.status(201).json({ message: 'User created successfully', userId: user });
};