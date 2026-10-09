import { createHash, randomBytes, scrypt, timingSafeEqual } from 'crypto';

const KEY_LENGTH = 64;
const COST = 16384;

function scryptAsync(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, { N: COST, r: 8, p: 1 }, (err, key) =>
      err ? reject(err) : resolve(key),
    );
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(password, salt);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}

/** A real-looking hash so unknown emails take as long to reject as wrong passwords. */
const DUMMY_HASH = `scrypt$${Buffer.alloc(16).toString('base64')}$${Buffer.alloc(KEY_LENGTH).toString('base64')}`;

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  const [scheme, saltB64, keyB64] = (stored ?? DUMMY_HASH).split('$');
  if (scheme !== 'scrypt' || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, 'base64');
  const actual = await scryptAsync(password, Buffer.from(saltB64, 'base64'));
  return stored !== null && expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function newToken(): string {
  return randomBytes(32).toString('base64url');
}

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
