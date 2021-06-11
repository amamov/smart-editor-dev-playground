//* https://nhn.github.io/tui.editor/latest/
//! error

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import { SourceType } from "@toast-ui/editor";
import videoPlugin from "utils/toast-video-plugin";
import axios from "axios";
import ViewerComponent from "./viewer";
import { Socket, io } from "socket.io-client";

const docId = "6af6e935-2567-4aaf-bc66-07327899019";
const SAVE_INTERVAL_MS = 3000;

function EditorComponent() {
  const [content, setContent] = useState<string>("");
  const editorRef = useRef<Editor | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleChangeEditor = useCallback<
    (param: { source: SourceType | "viewer"; data: MouseEvent }) => void
  >(({ source }) => {
    console.log(source);
    const editor = editorRef.current.getInstance();
    const html = editor.getHtml();
    console.log(html);
    setContent(html);
  }, []);

  const uploadImage = async (blob: Blob | File): Promise<string> => {
    try {
      let form = new FormData();
      form.append("image", blob);
      const response = await axios.post(
        "http://localhost:5000/upload/img",
        form,
        { withCredentials: true }
      );
      return response.data.link;
    } catch (error) {
      console.error(error);
      throw new Error("Server or Network error");
    }
  };

  const addImageBlobCallback = useCallback(
    async (
      blob: Blob | File,
      callback: (url: string, altText: string) => void
    ) => {
      if (!editorRef.current) return;
      const uploadedImageURL = await uploadImage(blob);
      callback(uploadedImageURL, "image name");
      return false;
    },
    [editorRef]
  );

  //* connect server socket
  useEffect(() => {
    const socket = io("http://localhost:5000", { path: "/socket.io" });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  //* get doc from server and load doc in local editor
  useEffect(() => {
    if (socket === null || editorRef === null) return;
    socket.emit("get-document", docId);
    socket.once("load-document", (doc) => {
      const html = editorRef.current.getInstance();
      html.setMarkdown(doc);
    });
  }, [socket, editorRef, docId]);

  //* changed doc broadcast and emit other user
  useEffect(() => {
    if (socket === null || editorRef === null) return;
    socket.emit("send-changes", content);
  }, [socket, editorRef, content]);

  //* update contents
  useEffect(() => {
    if (socket === null || editorRef === null) return;
    const handler = (doc): void => {
      const html = editorRef.current.getInstance().setHtml(doc);

      //   html.setHtml();
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, editorRef]);

  return (
    <>
      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        plugins={[videoPlugin]}
        onChange={handleChangeEditor}
        hooks={{
          addImageBlobHook: addImageBlobCallback,
        }}
      />
      <h1>Sever Read Doc</h1>
      <ViewerComponent content={content} />
    </>
  );
}

export default EditorComponent;
