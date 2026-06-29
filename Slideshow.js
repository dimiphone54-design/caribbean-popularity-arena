import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from '../styles/Slideshow.module.css';

export default function Slideshow({ images }) {
  // Create a new array that includes your requested static image plus the dynamic ones
  const allImages = useMemo(() => {
    const staticImage = {
      id: 'static-uk-dropshipping-group',
      name: 'uk-dropshipping-group-in-a-classroom.jpg',
      publicUrl: 'https://via.placeholder.com/800x600.png?text=UK+Dropshipping+Group+in+a+Classroom'
    };
    // Add the static image to the beginning of the array from props
    return [staticImage, ...(images || [])];
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!allImages || allImages.length === 0) {
    return <p>No images to display in this folder.</p>;
  }

  const generateDescription = (filename) => {
    if (!filename) return '';
    // Remove file extension
    const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
    // Replace hyphens and underscores with spaces
    const withSpaces = nameWithoutExtension.replace(/[-_]/g, ' ');
    // Capitalize the first letter
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? allImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, allImages.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === allImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, allImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrevious]);

  const currentImage = allImages[currentIndex];
  const description = generateDescription(currentImage.name);

  return (
    <div className={styles.slideshowContainer}>
      <button onClick={goToPrevious} className={styles.arrow}>❮</button>
      <div className={styles.imageContainer}>
        <img src={currentImage.publicUrl} alt={description} className={styles.image} />
        <div className={styles.descriptionBox}>
          <p className={styles.descriptionText}>{description}</p>
        </div>
        <div className={styles.controls}>
          <p className={styles.imageName}>{currentImage.name}</p>
          <a href={currentImage.publicUrl} download={currentImage.name} className={styles.downloadButton}>
            Download
          </a>
        </div>
      </div>
      <button onClick={goToNext} className={styles.arrow}>❯</button>
    </div>
  );
}