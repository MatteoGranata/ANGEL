import mongoose from 'mongoose';
import { User } from './user.js';
import { Post } from './post.js';
import { Password } from './password.js';
import { Timer } from './timer.js';
import { Expense } from './expense.js';
import { Profit } from './profit.js';

const projectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    name: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post,
      },
    ],
    piggyBanks: {
      expenses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: Expense,
        },
      ],
      profits: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: Profit,
        },
      ],
      total: {
        type: Number,
        default: 0,
      },
    },
    passwords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Password,
      },
    ],
    timers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Timer,
      },
    ],
  },
  { timestamps: true },
);

export const Project = mongoose.model('Project', projectSchema);
