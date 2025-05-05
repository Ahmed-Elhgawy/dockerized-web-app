const mongoose = require('mongoose');

const connectToMongo = async () => {
  const mongoUri = `mongodb://${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}?authSource=admin`;

  try {
    await mongoose.connect(mongoUri, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectToMongo;
