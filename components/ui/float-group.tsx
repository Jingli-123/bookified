const FloatGroup = () => {
  return (
    <div className="hero-ai-preview">
      <div className="preview-header">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="preview-document">
        <div className="preview-line w-3/4" />
        <div className="preview-line w-full" />
        <div className="preview-line w-2/3" />
      </div>

      <div className="preview-answer">
        <p>Ask your document</p>
        <div className="preview-search">What are the key ideas?</div>
      </div>
    </div>
  );
};
export default FloatGroup;
