const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

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
    get: createdAtVal => dateFormat(createdAtVal)
  },
},
{
  toJSON:{
    getters:true
  },
}
);

module.exports = reactionSchema;
