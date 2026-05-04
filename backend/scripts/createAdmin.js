const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const AdminUser = require('../src/models/AdminUser');
require('dotenv').config(); // Loads .env from the directory where the command is run (backend)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fashcycle_db';

const createAdmin = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB.');

    rl.question('Enter admin email: ', async (email) => {
      rl.question('Enter admin password: ', async (password) => {
        try {
          const existingUser = await AdminUser.findOne({ email });
          if (existingUser) {
            console.log('\nAn admin user with this email already exists!');
            process.exit(0);
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newAdmin = new AdminUser({
            email,
            password: hashedPassword
          });

          await newAdmin.save();
          console.log(`\nSuccess! Admin user created for: ${email}`);
          console.log('You can now log in using these credentials.');
          process.exit(0);
        } catch (err) {
          console.error('\nError creating admin:', err);
          process.exit(1);
        }
      });
    });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

createAdmin();
