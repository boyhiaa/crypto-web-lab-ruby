
import React from 'react';
import CipherTabs from '@/components/CipherTabs';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-background">
      <header className="py-8 bg-gradient-to-r from-crypto-primary to-crypto-secondary">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Laboratorium Kriptografi Klasik
          </h1>
          <p className="text-white/80 text-center mt-2">
            Implementasi Berbagai Algoritma Cipher
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-crypto-accent/20 shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2 text-crypto-primary">Tentang Aplikasi Ini</h2>
            <p className="text-muted-foreground">
              Aplikasi web ini mengimplementasikan berbagai algoritma cipher klasik untuk tujuan pendidikan.
              Anda dapat mengenkripsi dan mendekripsi pesan menggunakan berbagai teknik yang dikembangkan sepanjang
              sejarah kriptografi.
            </p>
          </CardContent>
        </Card>

        <CipherTabs />
        
        <Card className="mt-8 border-crypto-accent/20 shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2 text-crypto-primary">Petunjuk Penggunaan</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Pilih algoritma cipher dari tab di atas</li>
              <li>Masukkan plaintext (pesan untuk dienkripsi) atau ciphertext (pesan untuk didekripsi)</li>
              <li>Masukkan kunci dan parameter yang diperlukan untuk algoritma yang dipilih</li>
              <li>Klik "Enkripsi" untuk menghasilkan ciphertext atau "Dekripsi" untuk memulihkan plaintext</li>
              <li>Setiap cipher memiliki persyaratan kunci yang berbeda, jadi baca deskripsi dengan seksama</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 bg-crypto-dark text-white/70">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Tugas Mata Kuliah Kriptografi - Implementasi Cipher Klasik</p>
          <p className="mt-2">© {new Date().getFullYear()} - Hak Cipta Dilindungi</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
