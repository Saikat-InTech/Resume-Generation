import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token are required to blacklist"],
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklist = mongoose.model("tokenblacklist", tokenBlacklistSchema);

export default tokenBlacklist;
