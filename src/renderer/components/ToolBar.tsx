import { keymaps } from "../lib/keymap";
import { modes } from "../lib/mode";
import styles from "./ToolBar.module.css";
import type { FC, ChangeEvent } from "react";
import type { Keymap } from "../lib/keymap";
import type { Mode } from "../lib/mode";

type Props = {
  mode: Mode;
  keymap: Keymap;
  onChangeMode: (name: string) => void;
  onChangeKeymap: (keymap: string) => void;
};

export const ToolBar: FC<Props> = ({ mode, keymap, onChangeKeymap, onChangeMode }) => {
  const handleChangeKeymap = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeKeymap(event.target.value);
  };
  const handleChangeMode = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeMode(event.target.value);
  };
  return (
    <div className={styles.toolbar}>
      <select onChange={handleChangeKeymap} className={styles.select} defaultValue={keymap}>
        {keymaps.map((keymap) => (
          <option key={keymap} value={keymap}>
            {keymap}
          </option>
        ))}
      </select>
      <select onChange={handleChangeMode} className={styles.select} defaultValue={mode.name}>
        {modes.map((mode) => (
          <option key={mode.name} value={mode.name}>
            {mode.name}
          </option>
        ))}
      </select>
    </div>
  );
};
