import { useState } from "react";
import SketchCanvas from "./components/SketchCanvas";
import StoryDisplay from "./components/StoryDisplay";
import StylePicker from "./components/StylePicker";
import "./App.css";

export default function App() {
  const [imageData, setImageData] = useState(null);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("children's story");
  const [error, setError] = useState("");

  const generateStory = async () => {
    if (!imageData) {
      setError("Please draw or upload a sketch first!");
      return;
    }
    setError("");
    setLoading(true);
    setStory("");

    try {
      const base64 = imageData.split(",")[1];

      const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/png;base64,${base64}`,
                  },
                },
                {
                  type: "text",
                  text: `Look at this sketch carefully. Describe what you see, then write a creative ${style} inspired by it. Make it vivid, imaginative, and around 150-200 words. Format it nicely with a title.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setStory(data.choices[0].message.content);
    } catch (err) {
      setError("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="noise" />
      <header className="header">
        <div className="logo-mark">✦</div>
        <h1 className="title">sketch<span>2</span>story</h1>
        <p className="subtitle">draw something. anything. watch it become a story.</p>
      </header>

      <main className="main">
        <div className="left-panel">
          <SketchCanvas onImageReady={setImageData} />
          <StylePicker selected={style} onChange={setStyle} />
          <button
            className="generate-btn"
            onClick={generateStory}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-inner">
                <span className="spinner" /> conjuring story...
              </span>
            ) : (
              <span className="btn-inner">✦ generate story</span>
            )}
          </button>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="right-panel">
          <StoryDisplay story={story} loading={loading} />
        </div>
      </main>
    </div>
  );
}