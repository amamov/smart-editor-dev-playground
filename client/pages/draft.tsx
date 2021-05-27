import dynamic from "next/dynamic";

const Editor = dynamic(() => import("components/draft"), {
  ssr: false,
  loading: () => {
    return <span>Loading...</span>;
  },
});

function DraftComponent() {
  return <Editor />;
}

export default DraftComponent;
