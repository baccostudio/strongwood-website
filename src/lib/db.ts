import "server-only";
import mysql, { type Pool } from "mysql2/promise";

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const logDatabaseIssue = (message: string, error?: unknown) => {
  const detail =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : null;

  if (error) {
    console.warn(detail ? `[db] ${message} ${detail}` : `[db] ${message}`);
    return;
  }

  console.warn(`[db] ${message}`);
};

const getEnvValue = (key: string) => {
  const value = process.env[key]?.trim();
  return value ? value : null;
};

const getDatabasePort = (value: string | null) => {
  if (!value) {
    return 3306;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    logDatabaseIssue("Invalid DB_PORT value. Falling back to static content.");
    return null;
  }

  return port;
};

const globalForMysql = globalThis as typeof globalThis & {
  mysqlPool?: Pool | null;
  mysqlPoolInitialized?: boolean;
};

const getDatabaseConfig = (): DatabaseConfig | null => {
  const host = getEnvValue("DB_HOST");
  const user = getEnvValue("DB_USER");
  const password = getEnvValue("DB_PASSWORD");
  const database = getEnvValue("DB_NAME");
  const port = getDatabasePort(getEnvValue("DB_PORT"));

  if (!host || !user || !password || !database || port === null) {
    logDatabaseIssue("Missing database environment variables. Falling back to static content.");
    return null;
  }

  return {
    host,
    port,
    user,
    password,
    database,
  };
};

const createDbPool = () => {
  const databaseConfig = getDatabaseConfig();

  if (!databaseConfig) {
    return null;
  }

  try {
    return mysql.createPool({
      ...databaseConfig,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60_000,
      queueLimit: 0,
      enableKeepAlive: true,
      dateStrings: true,
    });
  } catch (error) {
    logDatabaseIssue("Failed to create the MySQL pool.", error);
    return null;
  }
};

export const getDb = () => {
  if (!globalForMysql.mysqlPoolInitialized) {
    globalForMysql.mysqlPool = createDbPool();
    globalForMysql.mysqlPoolInitialized = true;
  }

  return globalForMysql.mysqlPool ?? null;
};

export default getDb;
