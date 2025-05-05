Cara Menjalankan Program Cryptography Laboratory
Persyaratan Sistem
Untuk menjalankan aplikasi ini, pastikan Anda telah menginstal:

Node.js (versi terbaru direkomendasikan)
npm (Node Package Manager)
Langkah-langkah Instalasi
Clone atau Download Repository

Jika menggunakan Git: git clone <URL-REPOSITORY>
Atau download file ZIP dan ekstrak ke direktori pilihan Anda
Instalasi Dependensi

Buka terminal/command prompt
Arahkan ke direktori proyek: cd <NAMA-DIREKTORI-PROYEK>
Jalankan perintah: npm install
Menjalankan Aplikasi

Setelah instalasi selesai, jalankan perintah: npm run dev
Aplikasi akan berjalan di browser pada alamat: http://localhost:8080
Fitur Aplikasi
Aplikasi ini mengimplementasikan berbagai algoritma cipher klasik:

Vigenere Cipher standard (26 huruf alfabet)
Auto-Key Vigenere Cipher (26 huruf alfabet)
Extended Vigenere Cipher (256 karakter ASCII)
Playfair Cipher (26 huruf alfabet)
Affine Cipher (26 huruf alfabet)
Hill Cipher (26 huruf alfabet)
Super enkripsi (gabungan Extended Vigenere dan cipher transposisi)
Cara Penggunaan
Pilih jenis cipher yang ingin digunakan dengan mengklik tab yang sesuai
Masukkan teks (plaintext) yang ingin dienkripsi
Masukkan kunci sesuai dengan jenis cipher yang dipilih
Klik tombol "Encrypt" untuk mengenkripsi teks
Untuk dekripsi, masukkan ciphertext dan kunci, lalu klik tombol "Decrypt"
Catatan Tambahan
Setiap cipher memiliki persyaratan kunci yang berbeda, silakan baca deskripsi pada setiap tab
Untuk hill cipher, kunci harus berupa matriks dengan determinan yang relatif prima terhadap 26
Untuk affine cipher, nilai a harus relatif prima terhadap 26
