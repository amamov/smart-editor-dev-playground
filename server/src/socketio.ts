import * as http from "http";
import * as express from "express";
import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
// import Doc, { IDoc } from "./schema/Doc";
import Doc, { IDocDocument } from "./schema/QuillDoc";

const defaultValue = "";

async function findOrCreateDoc(id: Types.ObjectId): Promise<IDocDocument> {
  const doc = await Doc.findById(id);
  if (doc) return doc;
  return await Doc.create({ _id: id, data: defaultValue });
}

// async function findOrCreateDoc(id: Types.ObjectId): Promise<IDoc> {
//   const doc = await Doc.findById(id);
//   if (doc) return doc;
//   return await Doc.create({ _id: id, data: defaultValue });
// }

const socket = (server: http.Server, app: express.Application) => {
  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);

  io.on("connection", (socket: Socket) => {
    const req = socket.request;
    const ip = req.headers["X-forwarded-for"] || req.socket.remoteAddress;
    console.log("client connected!", ip, socket.id);

    socket.on("get-document", async (documentId) => {
      const doc = await findOrCreateDoc(documentId);
      socket.join(documentId);
      socket.emit("load-document", doc.data);
      socket.on("send-changes", (delta) => {
        // socket.broadcast.emit("receive-changes", delta);
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });
      socket.on("save-document", async (data) => {
        await Doc.findByIdAndUpdate(documentId, { data });
      });
    });

    socket.on("error", (error) => {
      console.error(error);
    });

    socket.on("disconnect", () => {
      console.log("client disconneted", ip, socket.id);
    });
  });
};

export default socket;
