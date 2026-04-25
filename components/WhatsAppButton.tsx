"use client";

export default function WhatsAppButton() {
  const phoneNumber = "923179606923";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg"
    >
      💬
    </a>
  );
}