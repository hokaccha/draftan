import type { EditorConfiguration } from "codemirror";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import type { IUnControlledCodeMirror } from "react-codemirror2";
import { useEditorRef, useEditorContent, useIpcHandler } from "../lib/editor";
import type { Keymap } from "../lib/keymap";
import type { Mode } from "../lib/mode";
import styles from "./Editor.module.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.css";

const theme = "draftan";

type ChangeCodeMirror = IUnControlledCodeMirror["onChange"];

type Props = {
  mode: Mode;
  keymap: Keymap;
};

export const Editor: FC<Props> = ({ mode, keymap }) => {
  const editorRef = useEditorRef();
  const { content, setContent } = useEditorContent();
  const { hasCopied } = useIpcHandler(editorRef);
  const handleUpdateEditor: ChangeCodeMirror = useCallback(
    (_editor, _data, value) => {
      setContent(value);
    },
    [setContent]
  );
  const options: EditorConfiguration = useMemo(
    () => ({
      mode: mode.value,
      keyMap: keymap,
      theme,
      lineWrapping: true,
    }),
    [mode.value, keymap]
  );
  return (
    <div className={styles.editor}>
      <CodeMirror
        value={content}
        onChange={handleUpdateEditor}
        options={options}
        editorDidMount={(editor) => (editorRef.current = editor)}
      ></CodeMirror>
      {hasCopied && <div className={styles.dialog}>Copied</div>}
    </div>
  );
};
