import mongoose from 'mongoose';

const WebsiteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6})|([0-9]{1,3}\.){3}[0-9]{1,3})([/\w \.-]*)*\/?$/.test(v);
        },
        message: 'Invalid URL format'
      }
    },
    description: {
      type: String
    },
    category: {
      type: String,
      enum: ['Business', 'Portfolio', 'Blog', 'E-commerce', 'Social', 'News', 'Other'],
      default: 'Other'
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    launchCount: {
      type: Number,
      default: 0
    },
    lastLaunchDate: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model('Website', WebsiteSchema);