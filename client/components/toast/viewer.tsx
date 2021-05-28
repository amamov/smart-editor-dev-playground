//* https://nhn.github.io/tui.editor/latest/

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import videoPlugin from "utils/toast-video-plugin";
import axios from "axios";

type ViewerProps = {
  content: string;
};

function ViewerComponent({ content }: ViewerProps) {
  const editorRef = useRef<Viewer | null>(null);

  useEffect(() => {
    const html = editorRef.current.getInstance();
    html.setMarkdown(content);
  }, [content]);

  return (
    <>
      <Viewer initialValue={""} plugins={[videoPlugin]} ref={editorRef} />
    </>
  );
}

export default ViewerComponent;
