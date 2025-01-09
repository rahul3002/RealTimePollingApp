const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likedPolls: [{ type: Schema.Types.ObjectId, ref: "Poll" }],
});

const pollSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    options: [{ type: String, required: true }],
    votes: [{
      option: { type: String, required: true },
      voter: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

const voteSchema = new Schema({
  poll: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
  option: { type: String, required: true },
  voter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  votedAt: { type: Date, default: Date.now },
});

const commentSchema = new Schema({
  poll: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", fieldSchema);
const Poll = mongoose.model("Poll", pollSchema);
const Vote = mongoose.model("Vote", voteSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  User,
  Poll,
  Vote,
  Comment,
};
