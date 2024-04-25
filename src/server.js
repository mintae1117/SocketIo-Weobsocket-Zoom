import express from "express";
import path from 'path';
import http from "http";
import {Server} from "socket.io";


const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const socketIOServer = new Server(httpServer);

socketIOServer.on("connection", (socket) => {
    socket.on("enter_room", (msg, done) => {
      console.log(msg);
      setTimeout(() => {
        done();
      }, 10000);
    });
});


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
