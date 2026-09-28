import { useRef } from "react";

export default function TitleCard({ title, backstory, imageData }) {
  const cardRef = useRef(null);

  const downloadCard = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: "#faf7f2" });
    const link = document.createElement("a");
    link.download = "sketch2story-card.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="title-card-wrapper">
      <div className="title-card" ref={cardRef}>
        <div className="card-sketch">
          {imageData && <img src={imageData} alt="Your sketch" />}
        </div>
        <div className="card-content">
          <div className="card-badge">✦ sketch2story</div>
          <h2 className="card-title">{title}</h2>
          <p className="card-backstory">{backstory}</p>
        </div>
      </div>
      <button className="download-btn" onClick={downloadCard}>
        ⬇ download title card
      </button>
    </div>
  );
}
