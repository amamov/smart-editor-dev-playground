import React, { useCallback, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReadDoc from "./ReadDoc";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import editorToolbar from "utils/editorToolbar";

const Container = styled.div`
  border: solid black 1px;
  min-height: 100vh;
`;

function EditorContainer() {
  const [editor, setEditor] = useState<EditorState>(EditorState.createEmpty());

  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      console.log(editorState);
      setEditor(editorState);
    },
    [editor]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = JSON.stringify(convertToRaw(editor.getCurrentContent()));
      try {
        await axios.post("http://localhost:5000/doc", {
          _id: uuidv4(),
          data,
        });
        setEditor(EditorState.createEmpty());
        alert("업로드 성공!");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
    [editor]
  );

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Editor
            wrapperClassName="editor_wrapper"
            editorClassName="editor_main"
            toolbarClassName="editor_toolbar"
            toolbar={editorToolbar}
            editorState={editor}
            onEditorStateChange={handleEditorChange}
          />
          <button type="submit">submit</button>
        </form>
      </Container>
      <div>
        <ReadDoc />
      </div>
    </>
  );
}

export default EditorContainer;
