
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const ExtendedVigenere: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const encrypt = () => {
    if (!key) {
      setError('Please enter a key');
      return;
    }
    
    setError('');
    
    if (!plaintext || !key) {
      setError('Please enter valid text and key');
      return;
    }

    let result = '';
    for (let i = 0; i < plaintext.length; i++) {
      const textChar = plaintext.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      // Extended Vigenere uses all 256 ASCII values
      const encryptedChar = (textChar + keyChar) % 256;
      result += String.fromCharCode(encryptedChar);
    }
    
    setCiphertext(result);
  };

  const decrypt = () => {
    if (!key) {
      setError('Please enter a key');
      return;
    }
    
    setError('');
    
    if (!ciphertext || !key) {
      setError('Please enter valid text and key');
      return;
    }

    let result = '';
    for (let i = 0; i < ciphertext.length; i++) {
      const textChar = ciphertext.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      // Extended Vigenere uses all 256 ASCII values
      const decryptedChar = (textChar - keyChar + 256) % 256;
      result += String.fromCharCode(decryptedChar);
    }
    
    setPlaintext(result);
  };

  return (
    <Card className="border-t-4 border-t-crypto-tertiary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Extended Vigenere Cipher (ASCII 256)</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Encryption using all 256 ASCII characters
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="key">
              Key (Any Characters)
            </label>
            <Input
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your key..."
              className="mb-4"
            />

            <label className="block text-sm font-medium mb-2" htmlFor="plaintext">
              Plaintext
            </label>
            <Textarea
              id="plaintext"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Enter text to encrypt..."
              className="h-32 mb-4"
            />

            <Button onClick={encrypt} className="w-full mb-2 bg-crypto-tertiary hover:bg-crypto-accent">
              Encrypt →
            </Button>
          </div>

          <div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <label className="block text-sm font-medium mb-2" htmlFor="ciphertext">
              Ciphertext
            </label>
            <Textarea
              id="ciphertext"
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              placeholder="Encrypted text will appear here..."
              className="h-32 mb-4"
            />

            <Button onClick={decrypt} className="w-full bg-crypto-accent hover:bg-crypto-tertiary">
              ← Decrypt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtendedVigenere;
