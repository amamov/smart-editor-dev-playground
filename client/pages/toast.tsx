import dynamic from "next/dynamic";

const Editor = dynamic(() => import("components/toast"), {
  ssr: false,
  loading: () => {
    return <span>Loading...</span>;
  },
});

function Toast() {
  return <Editor />;
}

export default Toast;
