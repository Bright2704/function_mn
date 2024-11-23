const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:123456@localhost:27017', {
        dbName: 'markdownDB', // ระบุชื่อฐานข้อมูล
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // หยุดโปรแกรมหากเชื่อมต่อไม่ได้
  }
};

module.exports = connectDB;