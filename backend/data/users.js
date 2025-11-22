const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$F5.j/7.j/7.j/7.j/7.j/7', // This is a hashed '123456'
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$F5.j/7.j/7.j/7.j/7.j/7',
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '$2a$10$F5.j/7.j/7.j/7.j/7.j/7',
    isAdmin: false,
  },
];

module.exports = users;