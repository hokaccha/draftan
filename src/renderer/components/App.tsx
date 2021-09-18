import type { FC } from "react";
import { Editor } from "./Editor";
import { Header } from "./Header";

export const App: FC = () => {
  return (
    <div>
      <Header />
      <Editor />
    </div>
  );
};
