const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    require: "Username is required",
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/],
    require: "email address is required",
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},

{
    toJSON: {
        virtuals: true, 
    },
}

);

UserSchema.virtual("friendCount").get(() => {
    return this.friends.length; 
})

const User = model("User", UserSchema);

module.exports = User;


