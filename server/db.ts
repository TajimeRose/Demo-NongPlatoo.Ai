import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "chat.db");
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL, -- 'user' | 'assistant' | 'system'
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
  );
`);

export interface Session {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface MessageRecord {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export const getOrCreateSession = (sessionId: string, initialTitle = "สนทนาใหม่"): Session => {
  const existing = db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId) as Session | undefined;
  if (existing) return existing;

  db.prepare("INSERT INTO sessions (id, title) VALUES (?, ?)").run(sessionId, initialTitle);
  return db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId) as Session;
};

export const listSessions = (): Session[] => {
  return db.prepare("SELECT * FROM sessions ORDER BY updated_at DESC").all() as Session[];
};

export const getSession = (sessionId: string): Session | undefined => {
  return db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId) as Session | undefined;
};

export const updateSessionTitle = (sessionId: string, title: string): void => {
  db.prepare("UPDATE sessions SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(title, sessionId);
};

export const deleteSession = (sessionId: string): void => {
  db.prepare("DELETE FROM messages WHERE session_id = ?").run(sessionId);
  db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
};

export const getMessagesBySessionId = (sessionId: string, limit = 50): MessageRecord[] => {
  return db
    .prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY datetime(created_at) ASC LIMIT ?")
    .all(sessionId, limit) as MessageRecord[];
};

export const saveMessage = (
  id: string,
  sessionId: string,
  role: "user" | "assistant" | "system",
  content: string
): MessageRecord => {
  getOrCreateSession(sessionId);
  db.prepare("INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, ?, ?)").run(
    id,
    sessionId,
    role,
    content
  );
  db.prepare("UPDATE sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(sessionId);

  return db.prepare("SELECT * FROM messages WHERE id = ?").get(id) as MessageRecord;
};

export default db;
