// input.jsx
// Komponen React untuk input data pengguna dan menampilkan alert ketika data disubmit.

import React, { Component } from "react";

class InputData extends Component {
  // Constructor untuk inisialisasi state 'value'
  constructor(props) {
    super(props);
    this.state = {
      value: "", // Menyimpan nilai input dari pengguna
    };

    // Binding fungsi handleChange dan handleSubmit
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Fungsi untuk memperbarui state 'value' sesuai dengan input pengguna
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Fungsi untuk menampilkan alert ketika form disubmit
  handleSubmit(event) {
    // Mencegah form melakukan reload default
    event.preventDefault();
    // Menampilkan alert dengan nilai input yang dimasukkan pengguna
    alert("Thy name was submitted: " + this.state.value);
  }

  // Fungsi render untuk menampilkan form input
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          {/* Input teks dengan event handler untuk menangani perubahan input */}
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        {/* Tombol submit */}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InputData;
