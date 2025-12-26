import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, breakfastId } = body;

    if (!userId || !breakfastId) {
      return NextResponse.json(
        { error: "Missing userId or breakfastId" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("saved_breakfasts")
      .insert({
        user_id: userId,
        breakfast_id: breakfastId,
      });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to save breakfast" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
