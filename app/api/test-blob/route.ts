// app/api/test-blob/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blob = await put(`test-${Date.now()}.txt`, "hello blob", {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("TEST BLOB ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}