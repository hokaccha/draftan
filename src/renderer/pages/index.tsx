import { useState } from "react";
import dynamic from "next/dynamic";
import type { EditorConfiguration } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.css";

const CodeMirror = dynamic(
  async () => {
    await Promise.all([
      import("codemirror/mode/markdown/markdown"),
      import("codemirror/mode/javascript/javascript"),
      import("codemirror/keymap/vim"),
    ]);

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
    theme: "draftan-dark",
    keyMap: "vim",
    lineWrapping: true,
  };
  return (
    <div id="layout">
      <header id="header"></header>
      <div id="editor">
        <CodeMirror options={options}></CodeMirror>
        <div id="toolbar">
          <span onClick={handleClickMode}>{mode}</span>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
