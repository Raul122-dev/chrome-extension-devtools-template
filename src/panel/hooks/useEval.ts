import { useState } from "react";

/**
 * Executes JS in the inspected tab and returns
 * the serializable result (strings, numbers, plain objects).
 */
export const useEval = <T = any>(expr: string) => {
  const [result, setResult] = useState<T | null>(null);

  const run = () => {
    chrome.devtools.inspectedWindow.eval(expr, (res: T, exceptionInfo) => {
      if (exceptionInfo) {
        console.warn("Eval exception", exceptionInfo);
        setResult(null);
      } else {
        setResult(res);
      }
    });
  };

  return { result, run };
};
