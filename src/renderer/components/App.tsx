import { Editor } from "./Editor";
import { Header } from "./Header";
import { ToolBar } from "./ToolBar";
import { useKeymap } from "../lib/keymap";
import { useMode } from "../lib/mode";
import type { FC } from "react";

export const App: FC = () => {
  const { keymap, setKeymap } = useKeymap();
  const { mode, setMode } = useMode();

  return (
    <div>
      <Header />
      <Editor mode={mode} keymap={keymap} />
      <ToolBar mode={mode} keymap={keymap} onChangeMode={setMode} onChangeKeymap={setKeymap} />
    </div>
  );
};
