import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const users = [
  {
    name: 'User1',
    email: 'user1@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'User2',
    email: 'user2@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
