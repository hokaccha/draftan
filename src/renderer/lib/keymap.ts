import { useCallback, useState } from "react";
import "codemirror/keymap/vim";

export const keymaps = ["default", "vim"] as const;
export type Keymap = typeof keymaps[number];

const keymapSet = new Set<string>(keymaps);
const defaultKeymap = keymaps[0];

const STORAGE_KEY = "draftan:keymap";

function isKeymap(value: string): value is Keymap {
  return keymapSet.has(value);
}

function findKeymap(keymap: string | null): Keymap {
  if (keymap === null) return defaultKeymap;
  return isKeymap(keymap) ? keymap : defaultKeymap;
}

function fetchDefaultKeymap(): Keymap {
  return findKeymap(localStorage.getItem(STORAGE_KEY));
}

export function useKeymap(): { keymap: Keymap; setKeymap: (keymap: string) => void } {
  const [keymap, setKeymapValue] = useState<Keymap>(fetchDefaultKeymap);

  const setKeymap = useCallback((keymap: string) => {
    const keymapValue = findKeymap(keymap);
    setKeymapValue(keymapValue);
    localStorage.setItem(STORAGE_KEY, keymapValue);
  }, []);

  return { keymap, setKeymap };
}
