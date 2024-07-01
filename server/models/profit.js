import mongoose from 'mongoose';

const ProfitSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nameProfit: {
      type: String,
    },
    amount: {
      type: Number,
      default: '',
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  { timestamps: true },
);

export const Profit = mongoose.model('Profit', ProfitSchema);
