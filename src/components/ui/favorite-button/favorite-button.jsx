import './favorite-button.css';

function FavoriteButton({ isFavorite, onToggle }) {
    return (
        <button
        onClick={onToggle}
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
}

export default FavoriteButton;