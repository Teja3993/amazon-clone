const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users'); // We need users because products belong to a user (Admin)
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create Users (We need a user to be the "Owner" of the products)
    // Note: We will create a default admin user here for testing
    const createdUsers = await User.insertMany([
       {
         name: 'Admin User',
         email: 'admin@example.com',
         password: '$2a$10$F5.j/7.j/7.j/7.j/7.j/7', // Hashed '123456' (Mock)
         isAdmin: true
       },
       {
         name: 'John Doe',
         email: 'john@example.com',
         password: '$2a$10$F5.j/7.j/7.j/7.j/7.j/7',
         isAdmin: false
       }
    ]);

    const adminUser = createdUsers[0]._id;

    // 3. Add the Admin ID to every product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 4. Insert Products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}