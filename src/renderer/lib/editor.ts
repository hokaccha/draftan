import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import type { Editor } from "codemirror";

const STORAGE_KEY = "draftan:content";

type EditorRef = MutableRefObject<Editor | null>;

export function useEditorRef(): EditorRef {
  return useRef<Editor | null>(null);
}

export function useEditorContent(): { content: string; setContent: (content: string) => void } {
  const content = useMemo(() => localStorage.getItem(STORAGE_KEY) || "", []);
  const setContent = useCallback((value: string) => {
    localStorage.setItem(STORAGE_KEY, value);
  }, []);

  return { content, setContent };
}

export function useIpcHandler(editorRef: EditorRef): { hasCopied: boolean } {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    global.ipcRenderer.addListener("copy", () => {
      navigator.clipboard.writeText(localStorage.getItem(STORAGE_KEY) || "");
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1000);
    });
    global.ipcRenderer.addListener("clear", () => {
      if (editorRef.current === null) return;
      const cm = editorRef.current;
      cm.setValue("");
      cm.focus();
    });
  }, [editorRef]);

  return { hasCopied };
}
