
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { letterToNumber, numberToLetter, normalizeText } from '@/utils/cipherUtils';

const VigenereCipher: React.FC = () => {
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
    const normalizedText = normalizeText(plaintext);
    const normalizedKey = normalizeText(key);
    
    if (!normalizedText || !normalizedKey) {
      setError('Please enter valid text and key');
      return;
    }

    let result = '';
    for (let i = 0; i < normalizedText.length; i++) {
      const textChar = letterToNumber(normalizedText[i]);
      const keyChar = letterToNumber(normalizedKey[i % normalizedKey.length]);
      const encryptedChar = (textChar + keyChar) % 26;
      result += numberToLetter(encryptedChar);
    }
    
    setCiphertext(result);
  };

  const decrypt = () => {
    if (!key) {
      setError('Please enter a key');
      return;
    }
    
    setError('');
    const normalizedText = normalizeText(ciphertext);
    const normalizedKey = normalizeText(key);
    
    if (!normalizedText || !normalizedKey) {
      setError('Please enter valid text and key');
      return;
    }

    let result = '';
    for (let i = 0; i < normalizedText.length; i++) {
      const textChar = letterToNumber(normalizedText[i]);
      const keyChar = letterToNumber(normalizedKey[i % normalizedKey.length]);
      const decryptedChar = (textChar - keyChar + 26) % 26;
      result += numberToLetter(decryptedChar);
    }
    
    setPlaintext(result);
  };

  return (
    <Card className="border-t-4 border-t-crypto-primary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Vigenere Cipher (Standard)</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Encryption using a keyword to determine shift values
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="key">
              Key (Alphabet Letters Only)
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

            <Button onClick={encrypt} className="w-full mb-2 bg-crypto-primary hover:bg-crypto-accent">
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

            <Button onClick={decrypt} className="w-full bg-crypto-accent hover:bg-crypto-primary">
              ← Decrypt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VigenereCipher;
