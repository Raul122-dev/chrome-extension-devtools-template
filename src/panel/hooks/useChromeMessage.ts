import { useCallback, useMemo } from "react";

type MsgPayload<P = unknown> = P & {
  type: string;
  tabId: number;
};

export function useChromeMessage() {
  // The tabId is constant throughout the DevTools session.
  const tabId = useMemo(() => chrome.devtools.inspectedWindow.tabId, []);

  /**
   * Sends a message to the background and returns a Promise.
   * @param type Message identifier (e.g. ‘COUNT_IMAGES’).
   * @param data Optional payload (merged with type).
   */
  const send = useCallback(
    <T = any, P = Record<string, unknown>>(
      type: string,
      data?: P
    ): Promise<T> =>
      new Promise((resolve, reject) => {
        const message: MsgPayload<P> = { ...((data || {}) as P), type, tabId };

        chrome.runtime.sendMessage(message, (resp) => {
          const err = chrome.runtime.lastError;
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(resp as T);
          }
        });
      }),
    [tabId]
  );

  return send;
}
