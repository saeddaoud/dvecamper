import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    weeks: {
      type: String,
      required: [true, 'Please add the number of weeks'],
    },
    tuition: {
      type: Number,
      required: [true, 'Please add the cost'],
    },
    minimumSkill: {
      type: String,
      required: [true, 'Please add the cost'],
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    scholarshipAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
