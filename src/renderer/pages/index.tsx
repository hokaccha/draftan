import dynamic from "next/dynamic";

const DraftanEditor = dynamic(
  async () => (await import("../components/DraftanEditor")).DraftanEditor,
  { ssr: false }
);

const IndexPage = () => {
  return <DraftanEditor />;
};

export default IndexPage;
