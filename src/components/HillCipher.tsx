
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  letterToNumber, 
  numberToLetter, 
  normalizeText, 
  invertMatrix, 
  stringToMatrix,
  multiplyMatrices
} from '@/utils/cipherUtils';

const HillCipher: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [matrixSize, setMatrixSize] = useState(2);
  const [keyMatrix, setKeyMatrix] = useState<number[][]>([
    [1, 2],
    [3, 4]
  ]);
  const [error, setError] = useState('');

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newMatrix = [...keyMatrix];
    if (!newMatrix[row]) {
      newMatrix[row] = [];
    }
    newMatrix[row][col] = numValue;
    setKeyMatrix(newMatrix);
  };

  const handleSizeChange = (size: string) => {
    const numSize = parseInt(size);
    setMatrixSize(numSize);
    
    // Initialize new matrix of correct size
    const newMatrix: number[][] = [];
    for (let i = 0; i < numSize; i++) {
      newMatrix[i] = [];
      for (let j = 0; j < numSize; j++) {
        newMatrix[i][j] = i === j ? 1 : 0; // Identity matrix as default
      }
    }
    setKeyMatrix(newMatrix);
  };

  const encrypt = () => {
    setError('');
    const normalizedText = normalizeText(plaintext);
    
    if (!normalizedText) {
      setError('Please enter valid text');
      return;
    }

    // Make sure text length is a multiple of matrix size
    let processedText = normalizedText;
    while (processedText.length % matrixSize !== 0) {
      processedText += 'X';
    }

    // Convert text to column vectors
    const textMatrix = stringToMatrix(processedText, matrixSize);
    const resultMatrix = multiplyMatrices(keyMatrix, textMatrix);
    
    // Convert result back to text
    let result = '';
    for (let i = 0; i < resultMatrix[0].length; i++) {
      for (let j = 0; j < matrixSize; j++) {
        result += numberToLetter(resultMatrix[j][i]);
      }
    }
    
    setCiphertext(result);
  };

  const decrypt = () => {
    setError('');
    const normalizedText = normalizeText(ciphertext);
    
    if (!normalizedText) {
      setError('Please enter valid text');
      return;
    }

    // Check if matrix is invertible
    const inverse = invertMatrix(keyMatrix);
    if (!inverse) {
      setError('The key matrix is not invertible. Please choose a different matrix.');
      return;
    }

    // Make sure text length is a multiple of matrix size
    if (normalizedText.length % matrixSize !== 0) {
      setError(`Ciphertext length must be a multiple of matrix size (${matrixSize})`);
      return;
    }

    // Convert text to column vectors
    const textMatrix: number[][] = [];
    for (let i = 0; i < normalizedText.length / matrixSize; i++) {
      textMatrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
        const charIndex = i * matrixSize + j;
        textMatrix[i][j] = letterToNumber(normalizedText[charIndex]);
      }
    }

    // Transpose for matrix multiplication
    const transposedText: number[][] = [];
    for (let i = 0; i < matrixSize; i++) {
      transposedText[i] = [];
      for (let j = 0; j < textMatrix.length; j++) {
        transposedText[i][j] = textMatrix[j][i];
      }
    }

    const resultMatrix = multiplyMatrices(inverse, transposedText);
    
    // Convert result back to text
    let result = '';
    for (let i = 0; i < resultMatrix[0].length; i++) {
      for (let j = 0; j < matrixSize; j++) {
        result += numberToLetter(resultMatrix[j][i]);
      }
    }
    
    setPlaintext(result);
  };

  return (
    <Card className="border-t-4 border-t-crypto-tertiary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Hill Cipher</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Encryption using matrix multiplication
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="matrix-size">
                Matrix Size
              </label>
              <Select
                value={matrixSize.toString()}
                onValueChange={handleSizeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select matrix size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2×2</SelectItem>
                  <SelectItem value="3">3×3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Key Matrix
              </label>
              <div className="border rounded p-4 bg-muted/20">
                {Array.from({ length: matrixSize }).map((_, row) => (
                  <div key={row} className="flex justify-center mb-2">
                    {Array.from({ length: matrixSize }).map((_, col) => (
                      <input
                        key={`${row}-${col}`}
                        type="number"
                        value={keyMatrix[row]?.[col] || 0}
                        onChange={(e) => handleMatrixChange(row, col, e.target.value)}
                        className="matrix-input"
                      />
                    ))}
                  </div>
                ))}
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

export default HillCipher;
