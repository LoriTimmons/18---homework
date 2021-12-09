const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: "This is required",
    maxlength: 280,
  },
  username: {
    type: String,
    required: "Username required",
  },

  createdAt: {
      type: Date, 
      default: Date.now,
    // create date function 🚫 look at activities date format 
    get: createdAtVal => dateFormat(createdAtVal)
  },
});

module.exports = reactionSchema;
