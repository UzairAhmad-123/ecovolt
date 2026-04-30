import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX

  const client = await clientPromise;
  const db = client.db("myshop");

  await db.collection("products").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ success: true });
}