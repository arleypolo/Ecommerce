import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Base de datos en memoria (en producción usar una BD real)
let users: User[] = [];

export const getAllUsers = (): Omit<User, 'password'>[] => {
  return users.map(({ password, ...user }) => user);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const createUser = async (
  email: string,
  password: string,
  name: string
): Promise<Omit<User, 'password'>> => {
  // Verificar si el usuario ya existe
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verificar si es admin
  const adminEmails = [process.env.ADMIN_EMAIL || 'arleipolo15@gmail.com'];
  const role = adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';

  const newUser: User = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    role,
    createdAt: new Date(),
  };

  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const validatePassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'> | null> => {
  const user = getUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
