const STYLES = [
  { id: "children's story", label: "🧸 Children's Story", desc: "sweet & imaginative" },
  { id: "poem", label: "🌸 Poem", desc: "lyrical & expressive" },
  { id: "thriller", label: "🔦 Thriller", desc: "dark & suspenseful" },
  { id: "fairy tale", label: "🧚 Fairy Tale", desc: "magical & whimsical" },
  { id: "sci-fi story", label: "🚀 Sci-Fi", desc: "futuristic & bold" },
  { id: "haiku", label: "🍃 Haiku", desc: "minimal & meditative" },
];

export default function StylePicker({ selected, onChange }) {
  return (
    <div className="style-picker">
      <p className="style-label">choose your story style</p>
      <div className="style-grid">
        {STYLES.map((s) => (
          <button
            key={s.id}
            className={`style-card ${selected === s.id ? "active" : ""}`}
            onClick={() => onChange(s.id)}
          >
            <span className="style-name">{s.label}</span>
            <span className="style-desc">{s.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
