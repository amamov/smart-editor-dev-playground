//* https://nhn.github.io/tui.editor/latest/

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useCallback, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import { youtubePlugin } from "utils/toast-editor-plugins";
import axios from "axios";
import ViewerComponent from "./viewer";

// TOAST UI Editor Plugins
// import "tui-chart/dist/tui-chart.css";
// import chart from "@toast-ui/editor-plugin-chart";
// import "highlight.js/styles/github.css";
// import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
// import uml from "@toast-ui/editor-plugin-uml";

/*
```youtube
Zl07LUsR6P0
```
*/

function EditorComponent() {
  const [content, setContent] = useState<string>("");
  const editorRef = useRef<Editor | null>(null);

  const handleSaveClick = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getInstance();
    const html = editor.getHtml();
    setContent(html);
  }, [editorRef]);

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

  const addImageBlobCallback = async (
    blob: Blob | File,
    callback: (url: string, altText: string) => void
  ) => {
    if (!editorRef.current) return;
    const uploadedImageURL = await uploadImage(blob);
    callback(uploadedImageURL, "image name");
    return false;
  };

  return (
    <>
      <Editor
        initialValue="hello editor!!!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        plugins={[youtubePlugin]}
        hooks={{
          addImageBlobHook: addImageBlobCallback,
        }}
      />
      <button onClick={handleSaveClick}>Save</button>
      <h1>Current Doc</h1>
      <textarea value={content} readOnly></textarea>
      <h1>Sever Read Doc</h1>
      <ViewerComponent content={content} />
    </>
  );
}

export default EditorComponent;
