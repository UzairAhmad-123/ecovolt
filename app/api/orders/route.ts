import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("myshop");

    const order = {
      ...body,
      status: "pending", // ✅ ADD THIS
      createdAt: new Date(),
    };

    await db.collection("orders").insertOne(order);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false });
  }
}
