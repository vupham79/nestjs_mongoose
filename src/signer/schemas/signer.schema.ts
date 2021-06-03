import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const SignerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: 255,
      required: [true, 'FIRST_NAME__IS_BLANK'],
    },
    lastname: {
      type: String,
      maxlength: 255,
      required: [true, 'LAST_NAME_IS_BLANK'],
    },
    email: {
      type: String,
      lowercase: true,
      validate: validator.isEmail,
      maxlength: 255,
      minlength: 6,
      required: [true, 'EMAIL_IS_BLANK'],
    },
    phoneNumber: {
      type: String,
      maxlength: 32,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'USER_IS_BLANK'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
