import { NextResponse } from "next/server";
import { getBookDetails } from "@/lib/actions/book.actions";
import { auth } from "@clerk/nextjs/server";
import { UnauthorizedError } from "@/app/books/errors/errors";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { userId } = await auth();
  if (!userId) {
    throw UnauthorizedError;
  }
  const { id } = await params;
  try {
    const data = await getBookDetails(userId, id);
    return NextResponse.json({
      success:true,
      title: data,
    });
  } catch (e) {
    return NextResponse.json({
      success:false,
      error: `Get title failed ${e}`,
    });
  }
}
