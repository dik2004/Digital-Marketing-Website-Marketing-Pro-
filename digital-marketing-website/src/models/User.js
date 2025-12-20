import mongoose from "mongoose";

// userType:
// - "client"  : wants to take services
// - "provider": wants to offer/give services
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    userType: { type: String, enum: ["client", "provider"], required: true },
    // optional: admin/system roles if needed later
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);


