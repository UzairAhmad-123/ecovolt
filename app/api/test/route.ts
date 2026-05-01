import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("myshop");

  // 👉 Add ONE product
  await db.collection("products").insertOne({
    name: "EcoVolt Battery",
    price: 150000,
    category: "battery",
    image: "/battery.jpg",
  });

  const products = await db.collection("products").find().toArray();

  return Response.json(products);
}