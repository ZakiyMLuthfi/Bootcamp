import React, { useState } from "react";
import axios from "axios";
import "./style/youtube-style.css";

const Youtube = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = value;
    const API_KEY = "AIzaSyCZglwek189HOAR7qK0OsLYidT-dMQQ28Y";

    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          maxResults: 5,
          key: API_KEY,
          q: query,
        },
      })
      .then((response) => {
        const results = response.data.items;
        setResults(results);
        setSelectedVideo(results[0]);
      })
      .catch((err) => console.error("Error saat fetching data", err));
  };

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="page-container">
      {/* Form untuk input pencarian */}
      <form onSubmit={handleSubmit}>
        <label>
          Search youtube vids:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {selectedVideo && (
        <div className="video-player">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
            frameBorder="0"
            allowFullScreen
            title={selectedVideo.snippet.title}
          ></iframe>
          <h3>{selectedVideo.snippet.title}</h3>
          <p>{selectedVideo.snippet.description}</p>
        </div>
      )}

      <div className="video-container">
        <div className="video-list">
          {results.map((video) => (
            <div
              key={video.id.videoId}
              onClick={() => selectVideo(video)}
              className="video-item"
              style={{
                cursor: "pointer",
                margin: "10px 0",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
              />
              <p>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Youtube;
