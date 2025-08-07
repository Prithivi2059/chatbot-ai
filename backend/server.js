const { createServer } = require("http");
const app = require("./src/app");
const initSocket = require("./src/services/chat-socket.service");
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

const io = initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
