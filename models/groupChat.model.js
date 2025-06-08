const { default: mongoose } = require("mongoose");

const groupChatModel = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocketGroupChat", groupChatModel);
