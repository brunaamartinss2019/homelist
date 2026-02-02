
import { useEffect, useState } from 'react';
import { getFavorites } from '../services/properties-service';
import Favorite from '../components/favorite';
import PageLayout  from '../components/layouts/pages-layout/page-layout';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites()
      .then(response => {
        setFavorites(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading favorites:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando favoritos...</div>;

  return (
    <PageLayout>
      <h1>Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún</p>
      ) : (
        <div>
          {favorites.map(property => 
            <Favorite id={property.id}/>
          )}
        </div>
      )}
    </PageLayout>
  );
}

export default Favorites;