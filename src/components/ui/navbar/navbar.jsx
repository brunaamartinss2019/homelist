import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useEffect, useRef, useState } from "react";
import * as PropertiesService from '../../../services/properties-service';

function Navbar() {
  const { user, logout } = useAuth();
  const dropDown = useRef()
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    dropDown.current && new window.bootstrap.Dropdown(dropDown.current);
  }, []);

  useEffect(() => {
    async function loadFavoritesCount() {
      if (user) {
        try {
          const favorites = await PropertiesService.getFavorites();
          setFavoritesCount(favorites.length);
        } catch (error) {
          console.error('Error al cargar favoritos:', error);
        }

      } else {
        setFavoritesCount(0);
      }
    }
    loadFavoritesCount();
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand fs-3 fw-bold" to="/">Homelist</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  alert('EN DESAROLLO');
                }}
                className="nav-link fw-bold" to="/">Propietarios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/">Buscas casas</Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  alert('EN DESAROLLO');
                }}
                className="nav-link fw-bold" to="/">Hipotecas
              </Link>
            </li>
       
            {user && (
              <li className='nav-item'>
                <Link className='nav-link fw-bold positio-relative' to='/favorites'>
                  ❤️ Mis favoritos
                  {favoritesCount > 0 && (
                    <span
                      className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                      style={{ fontSize: '0.7rem' }}
                    >
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">

            <Link onClick={(event) => {
              event.preventDefault();
              alert('EN DESAROLLO');
            }}

              to={user ? '/' : '/register'} className='btn btn-link text-dark'>
              <i className='btn btn-outline-primary fw-bold'>Pon tu anuncio gratis</i>
            </Link>

            {!user ? (
              <Link to='/login' className='btn btn-link text-dark'>
                <i className='btn btn-outline-primary fw-bold'>Acceder</i>
              </Link>
            ) : (

              <div className="dropdown">
                <a
                  className="btn btn-outline-primary fw-bold dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  ref={dropDown}
                >
                  {user.name || user.email}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/meus-anuncios">
                      Meus anuncios
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/favorites">
                      ❤️ Mis Favoritos
                      {favoritesCount > 0 && (
                        <span className="badge bg-danger ms-2">{favoritesCount}</span>
                      )}
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Salir
                    </button>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div >
    </nav >
  );
}
export default Navbar;