import { Server } from "socket.io";

export const GET = (req, res) => {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.IO server...");
        const io = new Server(res.socket.server);

        io.on("connection", (socket) => {
            console.log("a user connected");

            socket.on("message", (msg) => {
                io.emit("message", msg);
            });

            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
        });

        res.socket.server.io = io;
    } else {
        console.log("Socket.IO server already initialized.");
    }
    res.end();
};

export const POST = GET;
