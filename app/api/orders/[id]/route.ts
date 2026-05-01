import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("myshop");

  const order = await db
    .collection("orders")
    .findOne({ _id: new ObjectId(id) });

  return NextResponse.json(order || {});
}