import dynamic from "next/dynamic";
import "codemirror/lib/codemirror.css";
import type { EditorConfiguration } from "codemirror";
import { useState } from "react";

const CodeMirror = dynamic(
  async () => {
    await import("codemirror/mode/markdown/markdown");
    await import("codemirror/mode/javascript/javascript");
    await import("codemirror/keymap/vim");

    const codemirror = await import("react-codemirror2");
    return codemirror.UnControlled;
  },
  { ssr: false }
);

const IndexPage = () => {
  const [mode, setMode] = useState("markdown");
  const handleClickMode = () => {
    setMode(mode === "markdown" ? "javascript" : "markdown");
  };
  const options: EditorConfiguration = {
    mode,
    theme: "vscode-dark",
    keyMap: "vim",
  };
  return (
    <div id="editor">
      <CodeMirror options={options}></CodeMirror>
      <div id="toolbar">
        <span onClick={handleClickMode}>{mode}</span>
      </div>
    </div>
  );
};

export default IndexPage;
