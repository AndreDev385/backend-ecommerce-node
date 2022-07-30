const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'seller', 'user'],
      default: 'user',
    },
    recoveryToken: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const userModel = this.toObject();
  delete userModel.password;
  delete userModel.recoveryToken;
  delete userModel.email;
  delete userModel.createdAt;
  delete userModel.updatedAt;
  delete userModel.__v;
  delete userModel.isActive;
  return userModel;
};

const user = mongoose.model('User', userSchema);

module.exports = user;
