import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add a valid email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
    },
    password: {
      type: String,
      select: false,
      minlength: 6,
      required: [
        true,
        'Please add a password of minimum length of 6 characters',
      ],
    },
    resetPasswordToken: String,
    resetPasswordExpir: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
