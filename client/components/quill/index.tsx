import React, { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Quill, { TextChangeHandler } from "quill";
import "quill/dist/quill.snow.css";

const SAVE_INTERVAL_MS = 5000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["clean"],
];
const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function EditorComponent() {
  const docId = "6af6e935-2567-4aaf-bc66-073888899019";

  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  //* create local quill editor
  const editorRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const _quill: Quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
      formats: FORMATS,
    });
    _quill.disable();
    _quill.setText("Loading...");
    setQuill(_quill);
  }, []);

  //* connect server socket
  useEffect(() => {
    const socket = io("http://localhost:5000", { path: "/socket.io" });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  //* get doc from server and load doc in local quill editor
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.emit("get-document", docId);

    socket.once("load-document", (doc) => {
      quill.setContents(doc);
      quill.enable();
    });
  }, [socket, quill, docId]);

  //* save doc (emit doc and save interval seconds)
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const delta = quill.getContents();
      socket.emit("save-document", delta);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //* changed doc broadcast and emit other user
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: TextChangeHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //* update contents
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  return <div className="quill-container" ref={editorRef}></div>;
}

export default EditorComponent;
