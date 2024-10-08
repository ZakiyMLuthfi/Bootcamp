// clock.jsx
// Komponen React untuk menampilkan jam yang di-update setiap detik dengan time zone Bangkok/Hanoi/Jakarta.

import React, { Component } from "react";

class ClockTick extends Component {
  // Constructor untuk inisialisasi state 'time'
  constructor(props) {
    super(props);
    this.state = {
      time: this.getLocalTime(), // Menyimpan waktu lokal (GMT +7)
    };
  }

  // Lifecycle method yang dijalankan setelah komponen dirender pertama kali
  componentDidMount() {
    // Membuat interval untuk memperbarui waktu setiap 1 detik
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // Lifecycle method yang dijalankan ketika komponen akan di-unmount
  componentWillUnmount() {
    // Membersihkan interval ketika komponen dihapus untuk mencegah memory leak
    clearInterval(this.timerID);
  }

  // Method untuk memperbarui state 'time' dengan waktu terbaru
  tick() {
    console.log("Updating time:", this.getLocalTime());
    this.setState({
      time: this.getLocalTime(), // Memanggil fungsi getLocalTime untuk mengambil waktu saat ini
    });
  }

  // Method untuk mendapatkan waktu lokal GMT +7 (Bangkok/Hanoi/Jakarta)
  getLocalTime() {
    const date = new Date(); // Mendapatkan waktu sekarang
    const utcOffset = date.getTimezoneOffset() * 60000; // Menghitung offset dari UTC
    const bangkokTime = new Date(date.getTime() + utcOffset + 7 * 3600000); // Menambahkan 7 jam ke waktu UTC
    return bangkokTime.toLocaleTimeString(); // Mengubah waktu menjadi string format jam
  }

  // Method render untuk menampilkan jam dalam format HTML
  render() {
    return (
      <div>
        <h1>Jam saat ini</h1>
        {/* Menampilkan state 'time' */}
        <h2>{this.state.time}</h2>
      </div>
    );
  }
}

export default ClockTick;
