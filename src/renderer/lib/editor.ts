import type { Editor } from "codemirror";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";

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

export function useIpcHandler(editorRef: EditorRef): void {
  useEffect(() => {
    window.ipcRenderer.addListener("clear", () => {
      if (editorRef.current === null) return;
      const cm = editorRef.current;
      cm.setValue("");
      cm.focus();
    });
  }, [editorRef]);
}

export function useCounterEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    window.ipcRenderer.addListener("toggleCounter", () => {
      setEnabled((current) => !current);
    });
  }, []);

  return enabled;
}
