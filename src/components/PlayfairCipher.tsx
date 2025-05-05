
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { normalizeText, generatePlayfairMatrix, findPositionInPlayfair } from '@/utils/cipherUtils';

const PlayfairCipher: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (key) {
      setMatrix(generatePlayfairMatrix(key));
    } else {
      setMatrix([]);
    }
  }, [key]);

  const preparePlaintext = (text: string): string => {
    // Replace J with I, remove non-alphabet characters
    let normalized = normalizeText(text).replace(/J/g, 'I');
    
    // Insert X between double letters
    let prepared = '';
    for (let i = 0; i < normalized.length; i++) {
      prepared += normalized[i];
      if (i < normalized.length - 1 && normalized[i] === normalized[i + 1]) {
        prepared += 'X';
      }
    }
    
    // Add X if text length is odd
    if (prepared.length % 2 !== 0) {
      prepared += 'X';
    }
    
    return prepared;
  };

  const encrypt = () => {
    if (!key) {
      setError('Please enter a key');
      return;
    }
    
    setError('');
    const preparedText = preparePlaintext(plaintext);
    
    if (!preparedText || matrix.length === 0) {
      setError('Please enter valid text and key');
      return;
    }

    let result = '';
    
    // Process pairs of letters
    for (let i = 0; i < preparedText.length; i += 2) {
      const char1 = preparedText[i];
      const char2 = preparedText[i + 1];
      
      const [row1, col1] = findPositionInPlayfair(matrix, char1);
      const [row2, col2] = findPositionInPlayfair(matrix, char2);
      
      let newChar1, newChar2;
      
      // Same row
      if (row1 === row2) {
        newChar1 = matrix[row1][(col1 + 1) % 5];
        newChar2 = matrix[row2][(col2 + 1) % 5];
      } 
      // Same column
      else if (col1 === col2) {
        newChar1 = matrix[(row1 + 1) % 5][col1];
        newChar2 = matrix[(row2 + 1) % 5][col2];
      } 
      // Rectangle
      else {
        newChar1 = matrix[row1][col2];
        newChar2 = matrix[row2][col1];
      }
      
      result += newChar1 + newChar2;
    }
    
    setCiphertext(result);
  };

  const decrypt = () => {
    if (!key) {
      setError('Please enter a key');
      return;
    }
    
    setError('');
    const normalizedText = normalizeText(ciphertext).replace(/J/g, 'I');
    
    if (!normalizedText || normalizedText.length % 2 !== 0 || matrix.length === 0) {
      setError('Please enter valid ciphertext with even length');
      return;
    }

    let result = '';
    
    // Process pairs of letters
    for (let i = 0; i < normalizedText.length; i += 2) {
      const char1 = normalizedText[i];
      const char2 = normalizedText[i + 1];
      
      const [row1, col1] = findPositionInPlayfair(matrix, char1);
      const [row2, col2] = findPositionInPlayfair(matrix, char2);
      
      let newChar1, newChar2;
      
      // Same row
      if (row1 === row2) {
        newChar1 = matrix[row1][(col1 - 1 + 5) % 5];
        newChar2 = matrix[row2][(col2 - 1 + 5) % 5];
      } 
      // Same column
      else if (col1 === col2) {
        newChar1 = matrix[(row1 - 1 + 5) % 5][col1];
        newChar2 = matrix[(row2 - 1 + 5) % 5][col2];
      } 
      // Rectangle
      else {
        newChar1 = matrix[row1][col2];
        newChar2 = matrix[row2][col1];
      }
      
      result += newChar1 + newChar2;
    }
    
    setPlaintext(result);
  };

  return (
    <Card className="border-t-4 border-t-crypto-primary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Playfair Cipher</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Encryption using digraphs (pairs of letters) in a 5×5 matrix
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

            {matrix.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Playfair Matrix (J is replaced with I)</p>
                <div className="border rounded p-2">
                  {matrix.map((row, i) => (
                    <div key={i} className="flex justify-center">
                      {row.map((cell, j) => (
                        <div key={j} className="w-8 h-8 border flex items-center justify-center m-1">
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

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

export default PlayfairCipher;
