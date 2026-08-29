import { NextRequest, NextResponse } from "next/server";

// In production, connect to MongoDB. For now we accept and return success.
// Add MongoDB connection when MONGO_URI is set.
const MONGO_URI = process.env.MONGO_URI;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, primaryGoal, platformPreference } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO: When MONGO_URI is set, insert into MongoDB
    if (MONGO_URI) {
      // const client = await MongoClient.connect(MONGO_URI);
      // const db = client.db("mahout");
      // await db.collection("waitlist").insertOne({
      //   email: trimmed,
      //   primaryGoal: primaryGoal || null,
      //   platformPreference: platformPreference || null,
      //   createdAt: new Date(),
      //   status: "pending",
      //   consent: true,
      // });
    } else {
      // Development: log to console
      console.log("[Waitlist signup]", {
        email: trimmed,
        primaryGoal: primaryGoal || null,
        platformPreference: platformPreference || null,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
