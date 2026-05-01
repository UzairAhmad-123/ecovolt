import clientPromise from "@/lib/mongodb";

// ✅ GET ALL PRODUCTS
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myshop");

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json([], { status: 500 });
  }
}

// ✅ ADD PRODUCT
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("myshop");

    const result = await db.collection("products").insertOne(body);

    return Response.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}