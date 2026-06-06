import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Website',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    launchDate: {
      type: Date,
      default: Date.now
    },
    visitDuration: {
      type: Number
    },
    userAgent: {
      type: String
    },
    ipAddress: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Analytics', AnalyticsSchema);