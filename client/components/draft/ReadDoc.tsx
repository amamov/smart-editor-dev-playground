import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 3rem;
  border: solid black 1px;
`;

type DocumentProps = {
  docId: string;
};

function Document() {
  const [doc, setDoc] = useState<EditorState>(EditorState.createEmpty());
  const [isReady, setIsReady] = useState<boolean>(false);

  const getDoc = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `http://localhost:5000/doc/${"675ed178-61d4-4d79-8540-b4408637eae4"}`
      );
      const state: ContentState = convertFromRaw(JSON.parse(data));
      setDoc(EditorState.createWithContent(state));
      setIsReady(true);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <Container>
      <h1>Read Document</h1>
      <hr />
      {isReady ? (
        <Editor
          wrapperClassName="editor_wrapper"
          editorClassName="editor_main"
          toolbarHidden
          editorState={doc}
          readOnly
        />
      ) : (
        <div className="loading">Loading...</div>
      )}
    </Container>
  );
}

export default Document;
