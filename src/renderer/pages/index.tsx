import { useState } from "react";
import dynamic from "next/dynamic";
import type { EditorConfiguration } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.css";

type Mode = {
  label: string;
  name: string;
};

const modes: Mode[] = [
  { label: "Markdown", name: "markdown" },
  { label: "JavaScript", name: "javascript" },
  { label: "TypeScript", name: "text/typescript" },
  { label: "JSON", name: "application/json" },
  { label: "SQL", name: "sql" },
  { label: "Ruby", name: "ruby" },
];

const keymaps = ["default", "vim"] as const;
type Keymap = typeof keymaps[number];

const CodeMirror = dynamic(
  async () => {
    await Promise.all([
      // @ts-expect-error
      import("codemirror/mode/markdown/markdown"),
      // @ts-expect-error
      import("codemirror/mode/javascript/javascript"),
      // @ts-expect-error
      import("codemirror/mode/sql/sql"),
      // @ts-expect-error
      import("codemirror/mode/ruby/ruby"),
      // @ts-expect-error
      import("codemirror/keymap/vim"),
    ]);

    const codemirror = await import("react-codemirror2");
    return codemirror.UnControlled;
  },
  { ssr: false }
);

const IndexPage = () => {
  const [keymap, setKeymap] = useState<Keymap>(keymaps[0]);
  const [mode, setMode] = useState<Mode>(modes[0]);
  const handleKeymapChange = (event: React.FormEvent) => {
    const { target } = event;
    if (!(target instanceof HTMLSelectElement)) return;
    const keymap =
      keymaps.find((keymap) => keymap === target.value) || keymaps[0];
    setKeymap(keymap);
  };
  const handleModeChange = (event: React.FormEvent) => {
    const { target } = event;
    if (!(target instanceof HTMLSelectElement)) return;
    const mode = modes.find((mode) => mode.name === target.value) || modes[0];
    setMode(mode);
  };
  const options: EditorConfiguration = {
    mode: mode.name,
    keyMap: keymap,
    theme: "draftan-dark",
    lineWrapping: true,
  };
  return (
    <div id="layout">
      <header id="header"></header>
      <div id="editor">
        <CodeMirror options={options}></CodeMirror>
        <div id="toolbar">
          <select onChange={handleKeymapChange} className="select">
            {keymaps.map((keymap) => (
              <option key={keymap} value={keymap}>
                {keymap}
              </option>
            ))}
          </select>
          <select onChange={handleModeChange} className="select">
            {modes.map((mode) => (
              <option key={mode.name} value={mode.name}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
