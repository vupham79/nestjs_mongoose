import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const UserSchema = new mongoose.Schema(
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
    phoneNumber: {
      type: String,
      maxlength: 32,
    },
    email: {
      type: String,
      lowercase: true,
      validate: validator.isEmail,
      maxlength: 255,
      minlength: 6,
      required: [true, 'EMAIL_IS_BLANK'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: [true, 'PASSWORD_IS_BLANK'],
    },
    roles: {
      type: [String],
      default: ['user'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
