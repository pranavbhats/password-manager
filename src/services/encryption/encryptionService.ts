// Client-side encryption utility for password data
// This provides zero-knowledge encryption where the server never sees plaintext passwords

export class EncryptionService {
  private static encoder = new TextEncoder();
  private static decoder = new TextDecoder();

    // Generate cryptographically secure salt
  static generateSalt(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(32));
  }

  // Generate cryptographically secure IV
  private static generateIV(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
  }

    // Derive key from master password using PBKDF2
  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      this.encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt.buffer as ArrayBuffer,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // Encrypt data using AES-GCM
  static async encrypt(data: string, masterPassword: string): Promise<{
    encryptedData: string;
    salt: string;
    iv: string;
  }> {
    try {
      const salt = this.generateSalt();
      const iv = this.generateIV();
      const key = await this.deriveKey(masterPassword, salt);

      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
        key,
        this.encoder.encode(data)
      );

      return {
        encryptedData: this.uint8ArrayToBase64(new Uint8Array(encryptedBuffer)),
        salt: this.uint8ArrayToBase64(salt),
        iv: this.uint8ArrayToBase64(iv)
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  // Decrypt data using AES-GCM
  static async decrypt(
    encryptedData: string,
    salt: string,
    iv: string,
    masterPassword: string
  ): Promise<string> {
    try {
      const key = await this.deriveKey(masterPassword, this.base64ToUint8Array(salt));

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: this.base64ToUint8Array(iv).buffer as ArrayBuffer },
        key,
        this.base64ToUint8Array(encryptedData).buffer as ArrayBuffer
      );

      return this.decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data - incorrect master password or corrupted data');
    }
  }

  // Convert Uint8Array to Base64 string
  private static uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Convert Base64 string to Uint8Array
  private static base64ToUint8Array(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  // Hash master password for verification (without storing it)
  static async hashMasterPassword(password: string, salt: Uint8Array): Promise<string> {
    const key = await this.deriveKey(password, salt);
    const exported = await crypto.subtle.exportKey('raw', key);
    return this.uint8ArrayToBase64(new Uint8Array(exported));
  }

  // Generate a secure random password
  static generateSecurePassword(length: number = 16, includeSymbols: boolean = true): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = lowercase + uppercase + numbers;
    if (includeSymbols) {
      charset += symbols;
    }

    let password = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }

    // Ensure password contains at least one character from each required set
    if (!includeSymbols) {
      // At least one lowercase, uppercase, and number
      if (!/[a-z]/.test(password)) {
        password = lowercase[array[0] % lowercase.length] + password.slice(1);
      }
      if (!/[A-Z]/.test(password)) {
        password = password.slice(0, 1) + uppercase[array[1] % uppercase.length] + password.slice(2);
      }
      if (!/[0-9]/.test(password)) {
        password = password.slice(0, 2) + numbers[array[2] % numbers.length] + password.slice(3);
      }
    }

    return password;
  }

  // Evaluate password strength
  static evaluatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' | 'very-strong' {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Bonus for length
    if (password.length >= 20) score += 1;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    if (score <= 6) return 'strong';
    return 'very-strong';
  }
}

export default EncryptionService;