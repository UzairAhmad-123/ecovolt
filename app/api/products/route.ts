import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("myshop");

    const result = await db.collection("products").insertOne(body);

    return Response.json({ success: true, id: result.insertedId });
  } catch (error) {
    return Response.json({ success: false });
  }
}