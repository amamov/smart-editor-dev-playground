import dynamic from "next/dynamic";

const Editor = dynamic(() => import("components/quill"), {
  ssr: false,
  loading: () => {
    return <span>Loading...</span>;
  },
});

function Home() {
  return <Editor />;
}

export default Home;
