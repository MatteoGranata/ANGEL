import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    passwordContent: {
      type: String,
    },
    secret: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    pin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Password = mongoose.model('Password', passwordSchema);
