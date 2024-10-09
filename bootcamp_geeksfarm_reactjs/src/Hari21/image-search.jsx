// Import library react & Access Key pada file UnsplashAccess
import React, { Component } from "react";
import AccessKey from "./resources/UnsplashAccess";
import MasonryResult from "./Masonry";

class ImageSearch extends Component {
  // Constructor untuk SearchBar
  constructor(props) {
    super(props);
    this.state = {
      value: "", // Menyimpan nilai input dari pengguna
      results: [], // Menyimpan hasil pencarian dari Unsplash API
    };

    // Mengikat fungsi handleChange dan handleSubmit ke dalam constructor
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const accessKey = AccessKey.unsplashKey;

    // Fetch data dari Unsplash API berdasarkan query yang diinput pengguna
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Menyimpan hasil pencarian dalam state 'results'
        this.setState({ results: data.results });
      })
      .catch((err) => console.error("Error saat fetching data:", err));
  }

  render() {
    return (
      <div className="page-container">
        {/* Form untuk input pencarian */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Search image via unsplash:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="gallery-container">
          {/* Menampilkan hasil dari pencarian yang dilakukan, dengan Masonry */}
          {this.state.results.length > 0 && (
            <MasonryResult images={this.state.results} />
          )}
        </div>
      </div>
    );
  }
}

export default ImageSearch;
