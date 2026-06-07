export default function StoryDisplay({ story, loading }) {
  const copyStory = () => {
    navigator.clipboard.writeText(story);
  };

  if (loading) {
    return (
      <div className="story-display loading">
        <div className="loading-animation">
          <div className="ink-drop" />
          <p>weaving your story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-display empty">
        <div className="empty-state">
          <span className="empty-icon">📖</span>
          <p>your story will appear here</p>
          <small>draw or upload a sketch, pick a style, and hit generate</small>
        </div>
      </div>
    );
  }

  return (
    <div className="story-display filled">
      <div className="story-header">
        <span className="story-badge">✦ your story</span>
        <button className="copy-btn" onClick={copyStory} title="Copy story">
          📋 copy
        </button>
      </div>
      <div className="story-text">
        {story.split("\n").map((line, i) =>
          line.trim() ? <p key={i}>{line}</p> : <br key={i} />
        )}
      </div>
    </div>
  );
}
