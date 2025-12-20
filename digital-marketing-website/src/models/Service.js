import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  price: { type: Number, required: true },
  icon: { type: String },
  features: [{ type: String }],
  benefits: [{
    title: String,
    desc: String
  }],
  process: [{
    step: String,
    title: String,
    desc: String
  }],
  faqs: [{
    q: String,
    a: String
  }],
}, {
  timestamps: true,
});

export default mongoose.model("Service", serviceSchema);
