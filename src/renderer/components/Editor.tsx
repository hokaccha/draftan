import type { EditorConfiguration } from "codemirror";
import type { FC } from "react";
import { useCallback } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import type { IUnControlledCodeMirror } from "react-codemirror2";
import styles from "./Editor.module.css";
import { useEditorRef, useEditorContent, useIpcHandler } from "~/lib/editor";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.css";

const theme = "draftan";

type ChangeCodeMirror = IUnControlledCodeMirror["onChange"];

export const Editor: FC = () => {
  const editorRef = useEditorRef();
  const { content, setContent } = useEditorContent();
  const handleUpdateEditor: ChangeCodeMirror = useCallback(
    (_editor, _data, value) => {
      setContent(value);
    },
    [setContent]
  );
  const options: EditorConfiguration = {
    theme,
    lineWrapping: true,
  };

  useIpcHandler(editorRef);

  return (
    <div className={styles.editor}>
      <CodeMirror
        value={content}
        onChange={handleUpdateEditor}
        options={options}
        editorDidMount={(editor) => (editorRef.current = editor)}
      ></CodeMirror>
    </div>
  );
};
