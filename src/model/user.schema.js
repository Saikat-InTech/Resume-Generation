import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "user name already taken"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already have"],
  },
  password: {
    type: String,
    required: true,
  },
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
