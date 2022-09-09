const http = require("http").createServer();

const io = require("socket.io")(http, {
    cors: {
     origin: "*",
    },
     allowEIO3: true,
});

io.on("connection", (socket) => {
    console.log("New websocket connection");
    socket.on("reply", (data) => {
        console.log("receive: ", data);
        io.emit("reply", data);
    });
});


http.listen(8080, () => {
	console.log("Server launched on port 8080");
});
