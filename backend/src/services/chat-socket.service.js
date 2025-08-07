const { Server } = require("socket.io");
const createResponse = require("./gimini-ai.service");

const chatHistory = [];

function initSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Socket connected");

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("message-user", async (message) => {
      chatHistory.push({
        role: "user",
        parts: [{ text: message }],
      });
      const response = await createResponse(chatHistory);

      chatHistory.push({
        role: "model",
        parts: [{ text: response }],
      });

      socket.emit("message-ai", response);
    });
  });
}

module.exports = initSocket;
