// components/Carousel.tsx

import React, { useEffect, useState } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getCarouselImages } from "../services/firebase";
import "../styles/Carousel.css";

const Carousel: React.FC = () => {
  const [images, setImages] = useState<{ url: string; description: string }[]>(
    []
  );

  useEffect(() => {
    const fetchImages = async () => {
      const carouselImages = await getCarouselImages();
      setImages(carouselImages);
    };

    fetchImages();
  }, []);

  return (
    <ResponsiveCarousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      dynamicHeight={false}
      interval={5000}
      transitionTime={500}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={image.description} />
          <p className="legend">{image.description}</p>
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
