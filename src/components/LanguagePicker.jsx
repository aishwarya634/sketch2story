const LANGUAGES = [
  { id: "English", flag: "🇬🇧" },
  { id: "Hindi", flag: "🇮🇳" },
  { id: "Kannada", flag: "🇮🇳" },
  { id: "Tamil", flag: "🇮🇳" },
  { id: "Telugu", flag: "🇮🇳" },
  { id: "Spanish", flag: "🇪🇸" },
  { id: "French", flag: "🇫🇷" },
  { id: "German", flag: "🇩🇪" },
  { id: "Japanese", flag: "🇯🇵" },
];

export default function LanguagePicker({ selected, onChange }) {
  return (
    <div className="language-picker">
      <p className="style-label">story language</p>
      <div className="language-grid">
        {LANGUAGES.map((l) => (
          <button
            key={l.id}
            className={`lang-btn ${selected === l.id ? "active" : ""}`}
            onClick={() => onChange(l.id)}
          >
            <span>{l.flag}</span>
            <span>{l.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
