import { useEffect, useState } from 'react';

function Carrousel({ images, title }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const carrouselContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    };

    const buttonStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        padding: '15px 20px',
        cursor: 'pointer',
        fontSize: '18px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
        zIndex: 10
    };

    const indicatorsContainerStyle = {
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
    };

    const indicatorStyle = (isActive) => ({
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.5)',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    });

    const counterStyle = {
        position: 'absolute',
        top: '15px',
        right: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        zIndex: 10
    };

    const nextImage = () => {
        if (images?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        }
    };

    const prevImage = () => {
        if (images?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        }
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div style={carrouselContainerStyle}>
            <img
                src={images[currentImageIndex]}
                alt={`${title} - imagen ${currentImageIndex + 1}`}
                style={imageStyle}
            />

            {images.length > 1 && (
                <div style={counterStyle}>
                    {currentImageIndex + 1} / {images.length}
                </div>
            )}

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        style={{ ...buttonStyle, left: '10px' }}
                        aria-label="Imagen anterior"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextImage}
                        style={{ ...buttonStyle, right: '10px' }}
                        aria-label="Imagen siguiente"
                    >
                        ❯
                    </button>
                </>
            )}

            {images.length > 1 && (
                <div style={indicatorsContainerStyle}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            style={indicatorStyle(index === currentImageIndex)}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}
export default Carrousel;
