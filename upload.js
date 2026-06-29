import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import FolderUploader from '../components/FolderUploader';

export default function UploadPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      // If no session is found, redirect to the login page
      if (!session) {
        router.push('/login');
      }
    };

    getSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Show a loading message while checking for a session
  if (loading) {
    return <p style={{ padding: '20px' }}>Loading...</p>;
  }

  // If there is a session, show the upload page
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>CaribbeanFreedomArena - Folder Upload</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Logout</button>
      </div>
      <p>Welcome, {session?.user?.email}! Select a folder to upload.</p>
      <hr style={{ margin: '20px 0' }} />

      <FolderUploader bucketName={process.env.NEXT_PUBLIC_SUPABASE_BUCKET} />

      <p style={{ marginTop: '30px', fontSize: '14px', color: '#555' }}>Note: Also, ensure you have your .env.local file set up with your Supabase credentials.</p>
    </div>
  );
}