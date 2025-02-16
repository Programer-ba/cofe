import { useEffect } from 'react';
import { isMac } from '@cofe/utils';

export const CHAR_COMMAND_KEY = '⌘';
export const CHAR_ALT_KEY = '⌥';
export const CHAR_SHIFT_KEY = '⇧';
export const CHAR_BACKSPACE_KEY = '⌫';
export const CHAR_ESCAPE_KEY = '␛';
export const CHAR_DELETE_KEY = '␡';

const keyCodeMap = {
  [CHAR_BACKSPACE_KEY]: 'Backspace',
  [CHAR_ESCAPE_KEY]: 'Escape',
  [CHAR_DELETE_KEY]: 'Delete',
};

export const useShortcut = (
  shortcut: string,
  callback: (e: KeyboardEvent) => void,
) => {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (!e.key) {
        return;
      }

      const keys = shortcut.split('').map((v) => keyCodeMap[v] ?? v);

      if (e.key.toLowerCase() !== keys.pop().toLowerCase()) {
        return;
      }

      if (!e.altKey && keys.includes(CHAR_ALT_KEY)) {
        return;
      }

      if (!e.shiftKey && keys.includes(CHAR_SHIFT_KEY)) {
        return;
      }

      if (
        !((!isMac && e.ctrlKey) || (isMac && e.metaKey)) &&
        keys.includes(CHAR_COMMAND_KEY)
      ) {
        return;
      }

      callback(e);
    };

    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [callback, shortcut]);
};
