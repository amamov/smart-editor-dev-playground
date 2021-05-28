import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 4rem;
`;

function Home() {
  return (
    <Wrapper>
      <h1>Smart Editor Develop Playground</h1>
      <h1>
        <ul>
          <li>
            <Link href="/quill">quill</Link>
          </li>
          <li>
            <Link href="/draft">draft-js | react-draft-wysiwyg</Link>
          </li>
          <li>
            <Link href="/toast">toast-ui</Link>
          </li>
        </ul>
      </h1>
    </Wrapper>
  );
}

export default Home;
