const io = require("socket.io")(8500, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};



const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send msg

  socket.on("sendMsg", ({ senderId, reciverId, text }) => {
    const user = getUser(reciverId);
    io.to(user?.socketId).emit("getMsg", { 
      senderId, 
      text,
    });
  });

  //disconnect

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.Id);
    io.emit("getUsers", users);
  });
}); 
