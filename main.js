const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const connectToDb = require("./db/connectToDb");
const chatModel = require("./models/chat.model");
const groupChatModel = require("./models/groupChat.model");

const app = express();
connectToDb();
const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async ({ roomId, userEmail }) => {
    socket.join(roomId);
    console.log(`${userEmail} joined ${roomId}`);
    const messages = await chatModel.find({ roomId }).sort({ createdAt: 1 });
    socket.emit("previousMessages", messages);
  });

  socket.on("joinGroupChat", async () => {
    const previousMsgs = await groupChatModel.find().sort({ createdAt: 1 });
    socket.emit("groupChatMsgs", previousMsgs);
  });

  socket.on("groupChat", async ({ userEmail, msg }) => {
    const newGroupMsg = await groupChatModel.create({ userEmail, msg });
    io.emit("groupChatNewMsg", newGroupMsg);
  });

  socket.on("chatRoom", async ({ roomId, userEmail, msg }) => {
    const createMessage = await chatModel.create({
      roomId,
      userEmail,
      msg,
    });
    io.to(roomId).emit("chatRoomMsg", createMessage);
  });
});
const PORT = process.env.PORT || 4002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
