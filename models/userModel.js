import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Check if passwords match
userSchema.methods.matchPassword = async function (eneteredPassword) {
  return await bcrypt.compare(eneteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
