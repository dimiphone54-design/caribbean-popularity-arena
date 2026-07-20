import Link from "next/link";

const options = [
  { href: "/sell", title: "Sell Products", desc: "List your products. Buyers pay you directly.", emoji: "🛍️" },
  { href: "/teach", title: "Teach", desc: "Offer lessons. Students pay you directly.", emoji: "📚" },
  { href: "/create", title: "Create", desc: "Offer your projects. Clients pay you directly.", emoji: "🎨" },
  { href: "/market", title: "Browse Marketplace", desc: "Discover sellers and buy directly.", emoji: "🌎" },
];

export default function JoinPage() {
  return (
    <main style={{ minHeight: "100vh", padding: 40, background: "#f5f5f5" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ color: "#111", marginBottom: 4 }}>Join the Arena</h1>
        <p style={{ color: "#555", marginTop: 0, fontSize: 15 }}>
          Choose how you want to take part. Everyone gets paid directly through their own payment link — the platform never handles the money.
        </p>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", marginTop: 24 }}>
          {options.map((o) => (
            <Link key={o.href} href={o.href} style={cardStyle}>
              <span style={{ fontSize: 32 }}>{o.emoji}</span>
              <h3 style={{ margin: "8px 0 4px", color: "#111" }}>{o.title}</h3>
              <p style={{ margin: 0, color: "#555", fontSize: 14 }}>{o.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  display: "block",
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  textDecoration: "none",
  cursor: "pointer",
};