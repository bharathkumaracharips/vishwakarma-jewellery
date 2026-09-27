import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vishwakarma_jewelers";
    
    // Query local MongoDB collections directly via mongosh
    const cmd = `mongosh "${mongoUri}" --quiet --eval 'JSON.stringify({ database: "vishwakarma_jewelers", host: "127.0.0.1:27017", collections: db.getCollectionNames(), users: db.users.find().toArray(), interactions: db.interactions.find().toArray(), otps: db.otps.find().toArray() })'`;
    
    const { stdout } = await execAsync(cmd);
    const parsed = JSON.parse(stdout.trim());

    return NextResponse.json({
      status: "connected",
      ...parsed,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to query local MongoDB. Verify mongod is active on port 27017.",
        error: String(err),
      },
      { status: 500 }
    );
  }
}
