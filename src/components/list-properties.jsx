import { useEffect, useState } from 'react';
import * as PropertiesService from '../services/properties-service';
import { Link } from 'react-router-dom';


function ListProperties() {
   const [properties, setProperties] = useState([]);

   const cardStyle = {
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(10, 224, 10, 0.1)',
      display: 'flex',
      gap: '20px',
      minHeight: '250px'
   };

   const imageContainerStyle = {
      flex: '0 0 400px',
      height: '250px',
      overflow: 'hidden',
      borderRadius: '8px'
   };

   const imageStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
   };

   const contentStyle = {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
   };

   useEffect(() => {
      async function fetch() {
         const properties = await PropertiesService.list();
         setProperties(properties);
      }
      fetch();
   }, []);

   return (
      <div className='list-properties'>
         {properties.map((property) => (
            <div key={property.id} className='property-card' style={cardStyle}>

               {property.images?.length > 0 && (
                  <div style={imageContainerStyle}>
                     <Link to={`/properties/${property.id}`}>
                        <img
                           src={property.images[0]}
                           alt={property.title}
                           style={imageStyle}
                           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                     </Link>
                  </div>
               )}

               <div style={contentStyle}>
                  <div>
                     <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
                        <Link className='text-decoration-none text-reset' to={`/properties/${property.id}`}>
                           {property.title}
                        </Link>
                     </h2>
                     <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                        <strong>{property.location}</strong>
                     </p>

                     <p style={{ margin: '0 0 15px 0', color: '#333', lineHeight: '1.5' }}>
                        {property.description?.substring(0, 150)}...
                     </p>
                  </div>

                  <div>
                     <div className='details' style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                        <span>🛏️ {property.rooms}hab.</span>
                        <span>🚿 {property.bathrooms} baños</span>
                        <span>📐 {property.squareMeters} m²</span>
                     </div>

                     <p className='price' style={{
                        margin: '0',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#00a680'
                     }}>
                        {property.price?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#666', marginLeft: '8px' }}>
                           {property.operation === 'sale' ? 'Venta' : 'Alquiler'}
                        </span>
                     </p>
                  </div>
               </div>
            </div>
         ))}

      </div >
   );

}
export default ListProperties;
