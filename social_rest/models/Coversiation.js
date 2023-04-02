const mongoose = require("mongoose");

const ConversitionSchema = new mongoose.Schema(
  {
    members:{
        type:Array
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversiation", ConversitionSchema);
