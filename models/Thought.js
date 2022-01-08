const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought text is required ",
      min: [1, "Must be at least one character"],
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    username: {
      type: String,
      required: "Username is required",
    },

    reactions: [reactionSchema]
  },

  {
    toJSON: {
      getters: true,
    },
  }
);

ThoughtSchema.virtual("reactionCount").get( function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
