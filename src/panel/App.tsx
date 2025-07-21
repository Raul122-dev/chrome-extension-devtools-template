import { useState } from "react";
import { useEval } from "./hooks/useEval";
import { useChromeMessage } from "./hooks/useChromeMessage";

export default function App() {
  const { result: title, run: fetchTitle } = useEval<string>("document.title");
  const send = useChromeMessage();

  const [imgCount, setImgCount] = useState<number | null>(null);

  const countImages = async () => {
    try {
      const { total } = await send<{ total: number }>("COUNT_IMAGES");
      setImgCount(total);
    } catch (e) {
      console.error("Error contando imágenes", e);
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: "system-ui" }}>
      <h2>👀 DevTools Panel</h2>

      <section>
        <button onClick={fetchTitle}>Título de la página</button>
        {title && <p>➡️ {title}</p>}
      </section>

      <hr />

      <section>
        <button onClick={countImages}>Contar &lt;img&gt; en la página</button>
        {imgCount !== null && <p>🖼️ Hay {imgCount} imágenes.</p>}
      </section>
    </div>
  );
}
