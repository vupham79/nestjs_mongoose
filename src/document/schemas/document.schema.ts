import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const DocumentSchema = new mongoose.Schema(
  {
    originalDocumentUrl: {
      type: String,
      required: [true, 'ORGINAL DOCUMENT URL IS BLANK'],
      validate: validator.isURL,
    },
    signedDocumentUrl: {
      type: String,
      validate: validator.isURL,
    },
    filename: {
      type: String,
      required: [true, 'FILENAME IS BLANK'],
    },
    tagSignatureLocations: {
      type: [
        {
          x: {
            type: Number,
          },
          y: { type: Number },
          width: { type: Number },
          height: { type: Number },
        },
      ],
      required: [true, 'TAG SIGNATURE LOCATIONS ARE BLANK'],
    },
    isNotifySigner: {
      type: Boolean,
      default: false,
    },
    signedAt: {
      type: Date,
    },
    secret: {
      type: String,
      required: [true, 'SECRET HASH KEY IS BLANK'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'USER IS UNKNOWN'],
      ref: 'User',
    },
    signer: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'SIGNER IS UNKNOWN'],
      ref: 'Signer',
    },
  },
  {
    timestamps: true,
  },
);

DocumentSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (this['secret']) {
      return next();
    }
    const hashed = await bcrypt.hash(this['originalDocumentUrl'], 10);
    this['secret'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
