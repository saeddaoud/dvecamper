import fs from 'fs';
import connectDB from './config/db.js';
import Bootcamp from './models/bootcampModel.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

connectDB();
const __dirname = path.resolve();
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data has been imported');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
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