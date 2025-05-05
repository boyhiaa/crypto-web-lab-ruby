
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { letterToNumber, numberToLetter, normalizeText, gcd, mod, modInverse } from '@/utils/cipherUtils';

const AffineCipher: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [error, setError] = useState('');

  const validateA = (value: number) => {
    // A must be coprime with 26 for the cipher to be reversible
    return gcd(value, 26) === 1;
  };

  const encrypt = () => {
    if (!validateA(a)) {
      setError('The value of A must be coprime with 26 (values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25)');
      return;
    }
    
    setError('');
    const normalizedText = normalizeText(plaintext);
    
    if (!normalizedText) {
      setError('Please enter valid text');
      return;
    }

    let result = '';
    for (let i = 0; i < normalizedText.length; i++) {
      const textChar = letterToNumber(normalizedText[i]);
      // Affine cipher: E(x) = (ax + b) mod 26
      const encryptedChar = mod((a * textChar + b), 26);
      result += numberToLetter(encryptedChar);
    }
    
    setCiphertext(result);
  };

  const decrypt = () => {
    if (!validateA(a)) {
      setError('The value of A must be coprime with 26 (values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25)');
      return;
    }
    
    setError('');
    const normalizedText = normalizeText(ciphertext);
    
    if (!normalizedText) {
      setError('Please enter valid text');
      return;
    }

    const aInverse = modInverse(a, 26);
    
    let result = '';
    for (let i = 0; i < normalizedText.length; i++) {
      const textChar = letterToNumber(normalizedText[i]);
      // Affine cipher decryption: D(x) = a^-1 * (x - b) mod 26
      const decryptedChar = mod(aInverse * (textChar - b), 26);
      result += numberToLetter(decryptedChar);
    }
    
    setPlaintext(result);
  };

  return (
    <Card className="border-t-4 border-t-crypto-secondary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Affine Cipher</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Encryption using the formula E(x) = (ax + b) mod 26
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="key-a">
                  A (must be coprime with 26)
                </label>
                <Input
                  id="key-a"
                  type="number"
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value) || 1)}
                  className={!validateA(a) ? "border-red-500" : ""}
                />
                {!validateA(a) && (
                  <p className="text-xs text-red-500 mt-1">
                    A must be coprime with 26
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="key-b">
                  B (shift value)
                </label>
                <Input
                  id="key-b"
                  type="number"
                  value={b}
                  onChange={(e) => setB(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

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

            <Button onClick={encrypt} className="w-full mb-2 bg-crypto-secondary hover:bg-crypto-accent">
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

            <Button onClick={decrypt} className="w-full bg-crypto-accent hover:bg-crypto-secondary">
              ← Decrypt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffineCipher;
