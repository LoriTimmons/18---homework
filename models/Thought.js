const { Schema, model} = require("mongoose");
const reactionSchema = require("./Reaction");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "Thought text is required ",
    min: [1, "Must be at least one character"],
    max: 280,
  },
createdAt: {
    type: Date, 
    default: Date.now,
    // create date function 🚫 look at activities date format 
    get: createdAtVal => dateFormat(createdAtVal)
},

username: {
    type: String, 
    required: 'Username is required'
},

reactions: [
  reactionSchema
]
},

{
  toJSON: {
    virtuals: true
  }
}
);

ThoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
})

const Thoughts = model("Thoughts", ThoughtSchema);

module.exports = Thoughts;
