import mongoose from "mongoose";

const leadSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  status: { type: String, default: "new", enum: ["new", "contacted", "qualified", "converted"] },
}, {
  timestamps: true,
});

export default mongoose.model("Lead", leadSchema);
