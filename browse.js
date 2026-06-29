import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import FileBrowser from '../components/FileBrowser';
import CountryPanel from '../components/CountryPanel';
import styles from '../styles/Upload.module.css'; // Re-using styles from the upload page

export default function BrowsePage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

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

  if (loading) {
    return <p className={styles.container}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Browse Content</h1>
        <div>
          <button onClick={() => router.push('/upload')} style={{ marginRight: '10px' }}>Go to Upload</button>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </div>
      </div>

      <p className={styles.welcomeMessage}>
        Here are the top-level folders and files in your storage.
      </p>

      <FileBrowser bucketName={process.env.NEXT_PUBLIC_SUPABASE_BUCKET} />
    </div>
  );
}