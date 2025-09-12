import oracledb from 'oracledb';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION_STRING,
};

export async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

export async function closeConnection(connection: oracledb.Connection | null) {
  if (connection) {
    try {
      await connection.close();
    } catch (err) {
      console.error('Error closing database connection:', err);
    }
  }
}