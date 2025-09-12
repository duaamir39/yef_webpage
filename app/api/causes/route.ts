
import { NextResponse } from 'next/server';
import oracledb from 'oracledb';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

type CauseRow = [number, string, string, string];

async function getCausesFromDB() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id, title, description, image FROM causes_table`
    );

    if (!result.rows) {
      return [];
    }

    const rows = result.rows as CauseRow[];
    
    const causes = rows.map((row) => ({
      id: row[0],
      title: row[1],
      description: row[2],
      image: row[3],
    }));

    return causes;
  } catch (err) {
    console.error('Error fetching data from Oracle:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing Oracle connection:', err);
      }
    }
  }
}

export async function GET() {
  try {
    const causes = await getCausesFromDB();
    return NextResponse.json(causes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch causes' }, { status: 500 });
  }
}