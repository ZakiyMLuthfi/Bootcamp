import React, { Component } from "react";
import axios from "axios";
import "./YoutubeSearch.css";

class YoutubeSearch extends Component {
  // Constructor untuk SearchBar
  constructor(props) {
    super(props);
    this.state = {
      value: "", // Menyimpan nilai input dari pengguna
      results: [], // Menyimpan hasil pencarian dari Youtube API
      selectedVideo: null,
    };

    // Mengikat fungsi handleChange dan handleSubmit ke dalam constructor
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
  }

  // Fungsi handleChange untuk memperbarui state 'value' setiap kali pengguna mengetik
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Fungsi handleSubmit untuk memproses pencarian ketika pengguna menekan tombol submit
  handleSubmit(event) {
    // Mencegah form melakukan reload
    event.preventDefault();

    // Menyederhanakan akses nilai state dan Access Key dari file UnsplashAccess
    const query = this.state.value;
    const API_KEY = "AIzaSyCZglwek189HOAR7qK0OsLYidT-dMQQ28Y";
    // Fetch data dari Unsplash API berdasarkan query yang diinput pengguna
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
        this.setState({
          results: results,
          selectedVideo: results[0],
        });
      })
      .catch((err) => console.error("Error saat fetching data", err));
  }

  selectVideo(video) {
    this.setState({ selectedVideo: video });
  }

  render() {
    const { selectedVideo, results } = this.state;
    return (
      <div>
        {/* Form untuk input pencarian */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Search youtube vids:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
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
                onClick={() => this.selectVideo(video)}
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
  }
}

export default YoutubeSearch;
