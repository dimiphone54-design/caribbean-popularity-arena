import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Use the central Supabase client
import styles from '../styles/FolderUploader.module.css'; // Import styles

export default function FolderUploader({ bucketName }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFolderUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.log('No folder selected.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    const totalFiles = files.length;
    let uploadedCount = 0;
    const uploadErrors = [];

    for (const file of files) {
      // `webkitRelativePath` preserves the folder structure.
      // Example: "my-folder/my-image.png"
      const filePath = file.webkitRelativePath;

      try {
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false, // Set to true to overwrite existing files
          });

        if (uploadError) {
          throw uploadError;
        }

        uploadedCount++;
        setProgress(Math.round((uploadedCount / totalFiles) * 100));

      } catch (uploadError) {
        console.error(`Error uploading ${filePath}:`, uploadError);
        uploadErrors.push(`${filePath}: ${uploadError.message}`);
      }
    }

    setUploading(false);

    if (uploadErrors.length > 0) {
      setError(`Finished with ${uploadErrors.length} error(s). See console for details.`);
      console.error('Upload errors:', uploadErrors);
    }

    if (uploadedCount > 0) {
      setSuccess(`${uploadedCount} file(s) uploaded successfully!`);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Upload a Folder to '{bucketName}' bucket</h3>
      <label htmlFor="folder-upload">
        <input
          type="file"
          id="folder-upload"
          webkitdirectory="true"
          directory="true"
          className={styles.uploadInput}
          onChange={handleFolderUpload}
          disabled={uploading}
        />
      </label>

      {uploading && (
        <div className={styles.progressContainer}>
          <p>Uploading... {progress}%</p>
          <progress className={styles.progressBar} value={progress} max="100" />
        </div>
      )}

      {error && <p className={styles.message} style={{ color: 'red' }}>{error}</p>}
      {success && <p className={styles.message} style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

// Add webkitdirectory="true" and directory="true" for cross-browser compatibility
// on the file input.