import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User is logged in, redirect to the upload page
        router.push('/upload');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>CaribbeanFreedomArena Login</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'github']} // You can add more providers
      />
    </div>
  );
}