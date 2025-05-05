
import React from 'react';
import CipherTabs from '@/components/CipherTabs';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-background">
      <header className="py-8 bg-gradient-to-r from-crypto-primary to-crypto-tertiary">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Classical Cryptography Laboratory
          </h1>
          <p className="text-white/80 text-center mt-2">
            Implementation of Various Cipher Algorithms
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">About This Application</h2>
            <p className="text-muted-foreground">
              This web application implements various classical cipher algorithms for educational purposes.
              You can encrypt and decrypt messages using different techniques developed throughout the history of cryptography.
            </p>
          </CardContent>
        </Card>

        <CipherTabs />
        
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Select a cipher algorithm from the tabs above</li>
              <li>Enter your plaintext (message to encrypt) or ciphertext (message to decrypt)</li>
              <li>Enter the required keys and parameters for the selected algorithm</li>
              <li>Click "Encrypt" to generate ciphertext or "Decrypt" to recover plaintext</li>
              <li>Each cipher has different key requirements, so read the descriptions carefully</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 bg-crypto-dark text-white/70">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Cryptography Course Assignment - Classical Cipher Implementation</p>
          <p className="mt-2">© {new Date().getFullYear()} - All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
