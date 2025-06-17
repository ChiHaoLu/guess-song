import React, { useEffect, useState } from "react";
import { PROBLEM_SETS } from "./problems";
import Footer from "./Footer";

// Remove the static YOUTUBE_API_KEY
// const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function getYouTubeSearchUrl(query, apiKey) {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;
}

function App() {
  const [selectedSet, setSelectedSet] = useState("");
  const [questions, setQuestions] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [usedIndices, setUsedIndices] = useState([]);
  const [apiKey, setApiKey] = useState(() => {
    return (
      process.env.REACT_APP_YOUTUBE_API_KEY ||
      localStorage.getItem("youtube_api_key") ||
      ""
    );
  });
  const [showMask, setShowMask] = useState(false);

  // Save apiKey to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("youtube_api_key", apiKey);
    }
  }, [apiKey]);

  // Load questions from the selected problem set
  useEffect(() => {
    if (!selectedSet) return;
    setLoading(true);
    setQuestions([]);
    setVideoId(null);
    setError("");
    setUsedIndices([]); // Reset used indices when changing problem set

    const problemSet = PROBLEM_SETS.find((set) => set.file === selectedSet);
    if (problemSet) {
      setQuestions(problemSet.problems);
      setLoading(false);
    } else {
      setError("Problem set not found");
      setLoading(false);
    }
  }, [selectedSet]);

  // Pick a random question and search YouTube
  const pickRandomQuestion = async () => {
    setVideoId(null);
    if (questions.length === 0) return;
    if (!apiKey) {
      setFeedback(
        "Please enter your YouTube API key above. If you are not an engineer, you can request from me https://www.instagram.com/gospel_mur"
      );
      return;
    }

    // If all questions have been used, reset the used indices
    if (usedIndices.length >= questions.length) {
      setUsedIndices([]);
    }

    // Find an unused index
    let idx;
    do {
      idx = Math.floor(Math.random() * questions.length);
    } while (usedIndices.includes(idx));

    // Add the index to used indices
    setUsedIndices([...usedIndices, idx]);

    setShowMask(true); // Show mask when picking a new question
    const q = questions[idx];
    // Search YouTube
    const searchQuery = `${q.song} ${q.singer}`;
    try {
      const res = await fetch(getYouTubeSearchUrl(searchQuery, apiKey));
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setVideoId(data.items[0].id.videoId);
      } else {
        setVideoId(null);
        setFeedback("No YouTube video found for this song. Please try again.");
      }
    } catch (err) {
      setVideoId(null);
      setFeedback("Error searching YouTube. Please try again.");
    }
  };

  // On questions load, pick a question
  useEffect(() => {
    if (!loading && questions.length > 0) {
      pickRandomQuestion();
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className="app-container">
      <div className="main-content">
        {/* API Key input field if not present */}
        {!apiKey && (
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="api-key-input" style={{ marginRight: 8 }}>
              Enter your YouTube API Key:
            </label>
            <input
              id="api-key-input"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="YouTube API Key"
              style={{ width: 300 }}
            />
          </div>
        )}
        <h1>SimpleDog's Guess Song Game</h1>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="problem-set-select" style={{ marginRight: 8 }}>
            Choose a song set:
          </label>
          <select
            id="problem-set-select"
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
          >
            <option value="">-- Select --</option>
            {PROBLEM_SETS.map((set) => (
              <option key={set.file} value={set.file}>
                {set.label}
              </option>
            ))}
          </select>
          {selectedSet && !loading && questions.length > 0 && (
            <span style={{ marginLeft: 10 }}>
              (Total songs: {questions.length})
            </span>
          )}
        </div>
        {!selectedSet && <div>Please select a problem set to start.</div>}
        {selectedSet && loading && <div>Loading questions...</div>}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}
        {selectedSet && !loading && questions.length > 0 && (
          <>
            <button onClick={pickRandomQuestion}>
              Next Song ({usedIndices.length}/{questions.length})
            </button>
            {videoId ? (
              <div
                className="video-frame"
                style={{
                  position: "relative",
                  width: "80vw",
                  maxWidth: "400px",
                  aspectRatio: "16/9",
                  height: "auto",
                  margin: "2rem auto",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{ opacity: 0.9 }}
                ></iframe>
                {showMask && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0,0,0,1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    <button
                      onClick={() => setShowMask(false)}
                      style={{
                        padding: "1rem 2rem",
                        fontSize: "1.2rem",
                        borderRadius: "8px",
                        border: "none",
                        background: "#fff",
                        color: "#222",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      Show Answer
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>No video found.</div>
            )}
            {feedback && (
              <div style={{ color: "red", margin: "1rem 0" }}>{feedback}</div>
            )}
          </>
        )}
        <iframe
          title="媒體播放器"
          src="https://embed.podcasts.apple.com/us/podcast/simple-dog/id1812055953?l=zh-Hant-TW&amp;itscg=30200&amp;itsct=podcast_box_player&amp;ls=1&amp;mttnsubad=1812055953&amp;theme=auto"
          id="embedPlayer"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          allow="autoplay *; encrypted-media *; clipboard-write"
          className="podcast-frame"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
