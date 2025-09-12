import { NextResponse } from 'next/server';
import { getConnection, closeConnection } from '@/lib/db';
import oracledb from 'oracledb';

export async function GET() {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await getConnection();
    
    const result: oracledb.Result<string[]> = await connection.execute(
      `SELECT 'Connection is working!' FROM DUAL`
    );

    if (result.rows && result.rows.length > 0) {
      const message = result.rows[0][0];
      return NextResponse.json({ status: 'success', message: message });
    } else {
      return NextResponse.json({ status: 'success', message: 'No data returned.' });
    }

  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    console.error('API Route Error:', error);
    return NextResponse.json(
      { status: 'error', message: `Failed to connect or query the database. Error: ${errorMessage}` },
      { status: 500 }
    );
  } finally {
    await closeConnection(connection);
  }
}