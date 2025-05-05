
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { transposeText, inverseTranspose } from '@/utils/cipherUtils';

const SuperEncryption: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');
  const [columns, setColumns] = useState(3);
  const [error, setError] = useState('');

  // Extended Vigenere part
  const extendedVigenereEncrypt = (text: string, key: string): string => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const textChar = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      // Extended Vigenere uses all 256 ASCII values
      const encryptedChar = (textChar + keyChar) % 256;
      result += String.fromCharCode(encryptedChar);
    }
    return result;
  };

  const extendedVigenereDecrypt = (text: string, key: string): string => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const textChar = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      // Extended Vigenere uses all 256 ASCII values
      const decryptedChar = (textChar - keyChar + 256) % 256;
      result += String.fromCharCode(decryptedChar);
    }
    return result;
  };

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

    // Step 1: Apply Extended Vigenere Cipher
    const vigenereResult = extendedVigenereEncrypt(plaintext, key);
    
    // Step 2: Apply Columnar Transposition
    const transpositionResult = transposeText(vigenereResult, columns);
    
    setCiphertext(transpositionResult);
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

    // Step 1: Undo the Columnar Transposition
    const inverseTransposeResult = inverseTranspose(ciphertext, columns);
    
    // Step 2: Undo the Extended Vigenere Cipher
    const vigenereDecryptResult = extendedVigenereDecrypt(inverseTransposeResult, key);
    
    setPlaintext(vigenereDecryptResult);
  };

  return (
    <Card className="border-t-4 border-t-crypto-primary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Super Encryption</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Combined Extended Vigenere Cipher and Columnar Transposition
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="key">
                  Vigenere Key
                </label>
                <Input
                  id="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your key..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="columns">
                  Transposition Columns
                </label>
                <Input
                  id="columns"
                  type="number"
                  value={columns}
                  onChange={(e) => setColumns(parseInt(e.target.value) || 3)}
                  min={2}
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

export default SuperEncryption;
