import type { EditorConfiguration } from "codemirror";
import type { FC } from "react";
import { useState, useCallback } from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import type { IUnControlledCodeMirror } from "react-codemirror2";
import styles from "./Editor.module.css";
import { useEditorRef, useEditorContent, useIpcHandler, useCounterEnabled } from "~/lib/editor";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";

const options: EditorConfiguration = {
  theme: "draftan",
  mode: "markdown",
  lineWrapping: true,
};

type ChangeCodeMirror = IUnControlledCodeMirror["onChange"];

export const Editor: FC = () => {
  const editorRef = useEditorRef();
  const { content, setContent } = useEditorContent();
  const [count, setCount] = useState(0);
  const handleUpdateEditor: ChangeCodeMirror = useCallback(
    (_editor, _data, value) => {
      setContent(value);
      setCount(value.length);
    },
    [setContent]
  );
  const enabledCounter = useCounterEnabled();

  useIpcHandler(editorRef);

  return (
    <div>
      {enabledCounter && <div className={styles.counter}>{count}</div>}
      <CodeMirror
        value={content}
        onChange={handleUpdateEditor}
        options={options}
        editorDidMount={(editor) => (editorRef.current = editor)}
      ></CodeMirror>
    </div>
  );
};
