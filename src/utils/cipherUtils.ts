
// Helper functions for cipher operations

// Modular arithmetic functions
export const mod = (n: number, m: number): number => ((n % m) + m) % m;

export const modInverse = (a: number, m: number): number => {
  // Find modular multiplicative inverse
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1; // No modular inverse exists
};

export const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

// Letter to number conversion (A=0, B=1, ..., Z=25)
export const letterToNumber = (letter: string): number => {
  return letter.toUpperCase().charCodeAt(0) - 65;
};

// Number to letter conversion (0=A, 1=B, ..., 25=Z)
export const numberToLetter = (num: number): string => {
  return String.fromCharCode((mod(num, 26) + 65));
};

// Matrix operations for Hill cipher
export const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

export const determinant = (matrix: number[][]): number => {
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    const subMatrix: number[][] = [];
    for (let j = 1; j < matrix.length; j++) {
      subMatrix[j-1] = [];
      for (let k = 0; k < matrix.length; k++) {
        if (k !== i) {
          subMatrix[j-1].push(matrix[j][k]);
        }
      }
    }
    det += Math.pow(-1, i) * matrix[0][i] * determinant(subMatrix);
  }
  return det;
};

export const adjugate = (matrix: number[][]): number[][] => {
  if (matrix.length === 2) {
    return [
      [matrix[1][1], -matrix[0][1]],
      [-matrix[1][0], matrix[0][0]]
    ];
  }
  
  const adj: number[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    adj[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      const sub: number[][] = [];
      for (let k = 0; k < matrix.length; k++) {
        if (k !== i) {
          sub.push([]);
          for (let l = 0; l < matrix.length; l++) {
            if (l !== j) {
              sub[sub.length-1].push(matrix[k][l]);
            }
          }
        }
      }
      adj[i][j] = Math.pow(-1, i+j) * determinant(sub);
    }
  }
  return adj;
};

export const invertMatrix = (matrix: number[][]): number[][] | null => {
  const det = mod(determinant(matrix), 26);
  const invDet = modInverse(det, 26);
  
  if (!invDet) return null;
  
  const adj = adjugate(matrix);
  const result: number[][] = [];
  
  for (let i = 0; i < matrix.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      result[i][j] = mod(adj[j][i] * invDet, 26);
    }
  }
  
  return result;
};

// String normalization for ciphers
export const normalizeText = (text: string): string => {
  return text.toUpperCase().replace(/[^A-Z]/g, '');
};

// Convert string to matrix for Hill Cipher
export const stringToMatrix = (text: string, size: number): number[][] => {
  const matrix: number[][] = [];
  let index = 0;
  
  for (let i = 0; i < Math.ceil(text.length / size); i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = index < text.length ? 
        letterToNumber(text[index++]) : 
        letterToNumber('X'); // Padding
    }
  }
  
  return matrix;
};

// Generate 5x5 Playfair matrix from key
export const generatePlayfairMatrix = (key: string): string[][] => {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // No J
  const usedChars: Set<string> = new Set();
  const matrix: string[][] = Array(5).fill(0).map(() => Array(5).fill(''));
  
  let normKey = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  
  // Fill matrix with key characters first
  let row = 0, col = 0;
  for (let i = 0; i < normKey.length; i++) {
    const char = normKey[i];
    if (!usedChars.has(char)) {
      matrix[row][col] = char;
      usedChars.add(char);
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  }
  
  // Fill the rest with remaining alphabet letters
  for (let i = 0; i < alphabet.length; i++) {
    const char = alphabet[i];
    if (!usedChars.has(char)) {
      matrix[row][col] = char;
      usedChars.add(char);
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  }
  
  return matrix;
};

// Find position of character in Playfair matrix
export const findPositionInPlayfair = (matrix: string[][], char: string): [number, number] => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return [row, col];
      }
    }
  }
  return [0, 0]; // Should not happen with proper input
};

// Transpose text for super encryption
export const transposeText = (text: string, numColumns: number): string => {
  // Ensure we have a valid number of columns
  if (numColumns <= 0) numColumns = 1;
  
  const numRows = Math.ceil(text.length / numColumns);
  const grid: string[][] = [];
  
  // Create grid and fill with characters
  for (let i = 0; i < numRows; i++) {
    grid[i] = [];
    for (let j = 0; j < numColumns; j++) {
      const index = i * numColumns + j;
      grid[i][j] = index < text.length ? text[index] : '';
    }
  }
  
  // Read by columns
  let result = '';
  for (let j = 0; j < numColumns; j++) {
    for (let i = 0; i < numRows; i++) {
      if (grid[i][j]) result += grid[i][j];
    }
  }
  
  return result;
};

// Inverse transpose (for decryption)
export const inverseTranspose = (text: string, numColumns: number): string => {
  // Ensure we have a valid number of columns
  if (numColumns <= 0) numColumns = 1;
  
  const numRows = Math.ceil(text.length / numColumns);
  const colSizes: number[] = [];
  
  // Calculate the size of each column
  for (let j = 0; j < numColumns; j++) {
    colSizes[j] = (j < text.length % numColumns || text.length % numColumns === 0) ? numRows : numRows - 1;
  }
  
  // Create grid
  const grid: string[][] = [];
  for (let i = 0; i < numRows; i++) {
    grid[i] = Array(numColumns).fill('');
  }
  
  // Fill grid by columns
  let index = 0;
  for (let j = 0; j < numColumns; j++) {
    for (let i = 0; i < colSizes[j]; i++) {
      if (index < text.length) {
        grid[i][j] = text[index++];
      }
    }
  }
  
  // Read by rows
  let result = '';
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      if (grid[i][j]) result += grid[i][j];
    }
  }
  
  return result;
};
