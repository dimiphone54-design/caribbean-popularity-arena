import Link from 'next/link';
import { PLATFORM_COMMERCE_COPY } from '../src/lib/platform-commerce';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F6E56', padding: '16px' }}>
      <div style={{ maxWidth: '320px', width: '100%', background: '#04342C', borderRadius: '12px', padding: '18px 16px', textAlign: 'center' }}>
        <h1 style={{ color: '#FAC775', fontSize: '17px', margin: '0 0 2px', fontWeight: 600 }}>Caribbean Freedom Arena</h1>
        <p style={{ color: '#9FE1CB', fontSize: '12px', margin: '0 0 8px' }}>{PLATFORM_COMMERCE_COPY.freeSignInLabel}</p>
        <p style={{ color: '#7DD3C7', fontSize: '11px', margin: '0 0 12px' }}>{PLATFORM_COMMERCE_COPY.freeSignInNote}</p>
        <p style={{ color: '#cfeee4', fontSize: '12px', lineHeight: 1.5, margin: '0 0 14px' }}>
          Legacy Supabase social login UI is not installed in this build. Use the main app routes for preview, or reconnect the auth UI package before using this page.
        </p>
        <Link href="/" style={{ display: 'inline-block', padding: '10px 14px', borderRadius: '10px', background: '#FAC775', color: '#633806', fontWeight: 700, textDecoration: 'none' }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
