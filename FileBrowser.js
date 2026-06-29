import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/FileBrowser.module.css';

export default function FileBrowser({ bucketName }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);

      // List files in the root directory of the bucket
      const { data, error: listError } = await supabase.storage
        .from(bucketName)
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (listError) {
        setError(listError.message);
        console.error('Error listing files:', listError);
      } else {
        // Filter out the default .emptyFolderPlaceholder file if it exists
        const filteredFiles = data.filter(file => file.name !== '.emptyFolderPlaceholder');
        setFiles(filteredFiles);
      }
      setLoading(false);
    };

    if (bucketName) {
      fetchFiles();
    }
  }, [bucketName]);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className={styles.fileList}>
      {files.length === 0 ? (
        <p>No files or folders found. Try uploading a folder!</p>
      ) : (
        files.map((file) => (
          <div key={file.id || file.name} className={styles.fileItem}>
            {/* A simple check to see if it's a folder (no extension, no metadata means it's a folder placeholder) */}
            <span className={styles.icon}>{file.id ? '📄' : '📁'}</span>
            <span className={styles.fileName}>{file.name}</span>
          </div>
        ))
      )}
    </div>
  );
}