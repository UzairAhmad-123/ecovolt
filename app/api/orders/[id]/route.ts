import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("myshop");

  await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: body.status,
      },
    }
  );

  return Response.json({ success: true });
}