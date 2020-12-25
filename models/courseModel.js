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

courseSchema.statics.getAvgCoursesCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.round(obj[0].averageCost),
    });
  } catch (err) {
    console.error(err);
  }
};

courseSchema.post('save', function () {
  this.constructor.getAvgCoursesCost(this.bootcamp);
});
courseSchema.pre('remove', function () {
  this.constructor.getAvgCoursesCost(this.bootcamp);
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
