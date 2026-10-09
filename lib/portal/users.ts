import { randomUUID } from 'crypto';
import { createJsonStore } from '@/lib/json-store';
import { hashPassword, newToken, sha256 } from '@/lib/portal/crypto';

export type PortalUser = {
  id: string;
  email: string;
  name: string;
  site: string;
  passwordHash: string | null;
  sessionVersion: number;
  invite: { tokenHash: string; expiresAt: string } | null;
  createdAt: string;
  lastLoginAt: string | null;
};

export type PublicPortalUser = Omit<PortalUser, 'passwordHash' | 'invite'> & {
  status: 'active' | 'invited' | 'invite-expired';
};

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const store = createJsonStore<{ users: PortalUser[] }>('portal-users.json', () => ({ users: [] }));

export const SITE_SLUG_RE = /^[a-z0-9-]{1,32}$/;
export const MIN_PASSWORD_LENGTH = 10;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function toPublicUser(user: PortalUser): PublicPortalUser {
  const { passwordHash, invite, ...rest } = user;
  const status = passwordHash
    ? 'active'
    : invite && new Date(invite.expiresAt).getTime() > Date.now()
      ? 'invited'
      : 'invite-expired';
  return { ...rest, status };
}

export async function listUsers(): Promise<PortalUser[]> {
  return (await store.read()).users;
}

export async function findUserById(id: string): Promise<PortalUser | null> {
  return (await listUsers()).find((user) => user.id === id) ?? null;
}

export async function findUserByEmail(email: string): Promise<PortalUser | null> {
  const target = normalizeEmail(email);
  return (await listUsers()).find((user) => user.email === target) ?? null;
}

function freshInvite() {
  const token = newToken();
  return {
    token,
    invite: {
      tokenHash: sha256(token),
      expiresAt: new Date(Date.now() + INVITE_TTL_MS).toISOString(),
    },
  };
}

/** Creates an invited user and returns the one-time invite token. */
export function createInvitedUser(input: { email: string; name: string; site: string }) {
  return store.update((data) => {
    const email = normalizeEmail(input.email);
    if (data.users.some((user) => user.email === email)) {
      throw new Error('A client with this email already exists.');
    }
    const { token, invite } = freshInvite();
    const user: PortalUser = {
      id: randomUUID(),
      email,
      name: input.name.trim(),
      site: input.site,
      passwordHash: null,
      sessionVersion: 1,
      invite,
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    };
    data.users.push(user);
    return { user, token };
  });
}

export function reissueInvite(userId: string) {
  return store.update((data) => {
    const user = data.users.find((entry) => entry.id === userId);
    if (!user) throw new Error('Client not found.');
    const { token, invite } = freshInvite();
    user.invite = invite;
    return { user, token };
  });
}

export async function findUserByInviteToken(token: string): Promise<PortalUser | null> {
  const tokenHash = sha256(token);
  const user = (await listUsers()).find((entry) => entry.invite?.tokenHash === tokenHash);
  if (!user?.invite || new Date(user.invite.expiresAt).getTime() <= Date.now()) return null;
  return user;
}

/** Sets the password from an invite link and invalidates the link and any old sessions. */
export async function acceptInvite(token: string, password: string): Promise<PortalUser | null> {
  const passwordHash = await hashPassword(password);
  const tokenHash = sha256(token);
  return store.update((data) => {
    const user = data.users.find((entry) => entry.invite?.tokenHash === tokenHash);
    if (!user?.invite || new Date(user.invite.expiresAt).getTime() <= Date.now()) return null;
    user.passwordHash = passwordHash;
    user.invite = null;
    user.sessionVersion += 1;
    user.lastLoginAt = new Date().toISOString();
    return user;
  });
}

export function recordLogin(userId: string) {
  return store.update((data) => {
    const user = data.users.find((entry) => entry.id === userId);
    if (user) user.lastLoginAt = new Date().toISOString();
  });
}
