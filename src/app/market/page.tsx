"use client";

import { useEffect, useState } from "react";

type Seller = {
  id: string;
  display_name: string;
  country: string | null;
  payment_url: string | null;
  product_title: string | null;
  product_description: string | null;
  price_label: string | null;
};

export default function MarketPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/marketplace/sellers")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSellers(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function payLink(url: string | null) {
    if (url && url.startsWith("https://")) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: 40, background: "#f5f5f5" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ color: "#111", marginBottom: 4 }}>Marketplace</h1>
        <p style={{ color: "#555", marginTop: 0, fontSize: 14 }}>
          Buy directly from sellers. Payment happens on the seller&apos;s own page — the platform never handles the money.
        </p>

        {loading && <p style={{ color: "#555" }}>Loading listings...</p>}

        {!loading && sellers.length === 0 && (
          <p style={{ color: "#555" }}>No listings yet. Check back soon.</p>
        )}

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", marginTop: 20 }}>
          {sellers.map((s) => (
            <div key={s.id} style={cardStyle}>
              <h3 style={{ margin: "0 0 4px", color: "#111" }}>{s.product_title || "Untitled product"}</h3>
              <p style={{ margin: "0 0 8px", color: "#666", fontSize: 13 }}>
                by {s.display_name}{s.country ? ` · ${s.country}` : ""}
              </p>
              {s.product_description && (
                <p style={{ margin: "0 0 8px", color: "#444", fontSize: 14 }}>{s.product_description}</p>
              )}
              {s.price_label && (
                <p style={{ margin: "0 0 12px", color: "#111", fontWeight: 600 }}>{s.price_label}</p>
              )}
              {s.payment_url ? (
                <button onClick={() => payLink(s.payment_url)} style={payButtonStyle}>
                  Pay seller directly
                </button>
              ) : (
                <button disabled style={{ ...payButtonStyle, background: "#999", cursor: "default" }}>
                  Payment not available
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
};

const payButtonStyle: React.CSSProperties = {
  marginTop: "auto",
  padding: "10px 14px",
  borderRadius: 8,
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: 14,
  cursor: "pointer",
};