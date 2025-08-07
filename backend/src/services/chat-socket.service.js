const { Server } = require("socket.io");
const createResponse = require("./gimini-ai.service");

const history = [];

function initSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Socket connected");

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("message-user", async (message) => {
      const response = await createResponse(message.prompt);

      socket.emit("message-ai", { response });
    });
  });
}

module.exports = initSocket;
