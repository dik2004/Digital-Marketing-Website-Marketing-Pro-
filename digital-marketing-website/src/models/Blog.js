import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Admin" },
  excerpt: { type: String },
  imageUrl: { type: String },
  category: { type: String, default: "Marketing" },
}, {
  timestamps: true,
});

export default mongoose.model("Blog", blogSchema);
