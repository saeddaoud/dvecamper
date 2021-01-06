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

reviewSchema.statics.getAvgRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

reviewSchema.post('save', function () {
  this.constructor.getAvgRating(this.bootcamp);
});
reviewSchema.pre('remove', function () {
  this.constructor.getAvgRating(this.bootcamp);
});

// Prevent a user from writing more than one review per bootcamp
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
