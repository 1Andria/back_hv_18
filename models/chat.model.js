const { default: mongoose } = require("mongoose");

const chatModel = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    roomId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocketChatMsg", chatModel);
