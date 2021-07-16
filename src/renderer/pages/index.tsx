import dynamic from "next/dynamic";

const Editor = dynamic(
  async () => (await import("../components/Editor")).Editor,
  { ssr: false }
);

const IndexPage = () => {
  return <Editor></Editor>;
};

export default IndexPage;
