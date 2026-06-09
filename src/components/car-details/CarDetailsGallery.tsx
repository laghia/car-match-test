import { useState } from 'react';
import './CarDetailsGallery.css';

type CarDetailsGalleryProps = {
  images: string[];
  moreImagesCount: number;
  alt: string;
};

export function CarDetailsGallery({ images, moreImagesCount, alt }: CarDetailsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroImage = images[activeIndex] ?? images[0];
  const thumbnails = images.slice(0, 4);

  return (
    <div className="car-details-gallery">
      <div className="car-details-gallery__hero-wrap">
        <div className="car-details-gallery__hero">
          <img src={heroImage} alt={alt} />
        </div>
        <p className="car-details-gallery__disclaimer">Images are indicative only</p>
      </div>

      <div className="car-details-gallery__thumbnails">
        {thumbnails.map((image, index) => {
          const isLast = index === thumbnails.length - 1 && moreImagesCount > 0;
          const isActive = index === activeIndex;

          return (
            <button
              key={image}
              type="button"
              className={`car-details-gallery__thumb ${isActive ? 'car-details-gallery__thumb--active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={isLast ? `View image ${index + 1}, ${moreImagesCount} more available` : `View image ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <img src={image} alt="" />
              {isLast && (
                <span className="car-details-gallery__more">+{moreImagesCount} more</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
