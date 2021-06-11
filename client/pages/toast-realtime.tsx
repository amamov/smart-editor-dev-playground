import dynamic from "next/dynamic";

const Editor = dynamic(() => import("components/toast/realtime"), {
  ssr: false,
  loading: () => {
    return <span>Loading...</span>;
  },
});

function ToastComponent() {
  return <Editor />;
}

export default ToastComponent;
