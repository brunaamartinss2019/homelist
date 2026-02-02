import { useEffect, useState } from 'react';
import * as PropertiesService from '../services/properties-service';
import { Link, useParams } from 'react-router-dom';
import Carrousel from './ui/carrousel/carrousel';
import FavoriteButton from './ui/favorite-button/favorite-button';

function Favorite({id}) {
   const [property, setProperty] = useState();

   const cardStyle = {
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(10, 224, 10, 0.1)'
   };

   useEffect(() => {
      async function fetch() {
         const house = await PropertiesService.getProperty(id);
         setProperty(house);

      }
      fetch();
   }, [id]);

   const handleToggleFavorite  = async () => {
      const newFavoriteStatus = !property.favorite;
      await PropertiesService.toggleFavorite(id, newFavoriteStatus);
      setProperty({ ...property, favorite: newFavoriteStatus });
   };

   if (!property) return (<></>);

   return (
      <div key={property.id} className='property-card' style={{...cardStyle, position: 'relative'}}>

         <FavoriteButton
         isFavorite={property.favorite}
         onToggle={handleToggleFavorite}
         />

         <Carrousel images={property.images} title={property.title} />

         <h2>
            <Link className='text-decoration-none text-reset' to={`/properties/${property.id}`}>
               {property.title}
            </Link>
         </h2>
         <p><strong>{property.location}</strong></p>

         <p className='price'>
            {property.operation === 'sale' ? 'Venta: ' : 'Alquiler: '}
            {property.price?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
         </p>

         <div className='details'>
            <span> 🛏️ {property.rooms} hab. </span>
            <span> 🚿 {property.bathrooms} baños </span>
            <span> 📐 {property.squareMeters} m²</span>
            <span> {property.operation} </span>
            <span> {property.type} </span>
            <span> {property.location} </span>
            <span> {property.city} </span>
            <span> {property.zipCode} </span>
            <span> {property.elevator} </span>
            <span> {property.parking} </span>
            <span> {property.terrace} </span>
         </div>

         <p>{property.description}</p>
      </div>
   );
}

export default Favorite;

