import fs from 'fs';
import connectDB from './config/db.js';
import Bootcamp from './models/bootcampModel.js';
import Course from './models/courseModel.js';
import User from './models/userModel.js';
import Review from './models/reviewModel.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

connectDB();
const __dirname = path.resolve();

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);
    console.log('Data has been imported');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data has been deleted');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
