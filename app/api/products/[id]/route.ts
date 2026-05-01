import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Example data
  const products = [
    {
      _id: "69f490b6705f5d80269b31be",
      name: "EcoVolt Battery",
      price: 220000,
    },
  ];

  const product = products.find((p) => p._id === id);

  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}