"use client";

import { useState } from "react";

export function SellerSignupForm() {
  const [form, setForm] = useState({
    display_name: "",
    country: "",
    product_title: "",
    product_description: "",
    price_label: "",
    payment_url: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit() {
    setMessage("");

    if (!form.display_name.trim()) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }
    if (form.payment_url && !form.payment_url.startsWith("https://")) {
      setStatus("error");
      setMessage("Your payment link must start with https://");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/marketplace/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
        setMessage("Submitted! Your listing is pending review.");
        setForm({
          display_name: "",
          country: "",
          product_title: "",
          product_description: "",
          price_label: "",
          payment_url: "",
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ margin: 0, color: "#111" }}>Become a Seller</h2>
      <p style={{ margin: 0, color: "#444", fontSize: 14 }}>
        List your product. Buyers pay you directly through your own payment link — the platform never handles the money.
      </p>

      <input placeholder="Your name *" value={form.display_name} onChange={(e) => update("display_name", e.target.value)} style={inputStyle} />
      <input placeholder="Country" value={form.country} onChange={(e) => update("country", e.target.value)} style={inputStyle} />
      <input placeholder="Product title" value={form.product_title} onChange={(e) => update("product_title", e.target.value)} style={inputStyle} />
      <textarea placeholder="Product description" value={form.product_description} onChange={(e) => update("product_description", e.target.value)} style={{ ...inputStyle, minHeight: 80 }} />
      <input placeholder="Price (e.g. $25)" value={form.price_label} onChange={(e) => update("price_label", e.target.value)} style={inputStyle} />
      <input placeholder="Your payment link — PayPal, Stripe, your store, WhatsApp, etc." value={form.payment_url} onChange={(e) => update("payment_url", e.target.value)} style={inputStyle} />
      <span style={{ fontSize: 12, color: "#666", marginTop: -6 }}>
        Paste any secure link (must start with https://) where buyers pay you directly. The platform never handles the money.
      </span>

      <button onClick={submit} disabled={status === "sending"} style={buttonStyle}>
        {status === "sending" ? "Submitting..." : "Submit listing"}
      </button>

      {message && (
        <p style={{ margin: 0, color: status === "error" ? "#c0392b" : "#27ae60", fontSize: 14 }}>{message}</p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
  color: "#111",
  background: "#fff",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 8,
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: 15,
  cursor: "pointer",
};