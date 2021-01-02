import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a review title'],
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, 'Please add your review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, 'Please add a rating between 1 and 10'],
    },
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
