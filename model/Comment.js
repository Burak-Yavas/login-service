const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    bookId: {
      type: String,
      required: true
    },
    commentator: {
      type: String,
      required: true
    },
    comment: {
        type: String,
        required: true
      },
    rate: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  

module.exports = mongoose.model("Comment", commentSchema);