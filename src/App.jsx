import { Routes, Route } from 'react-router';
import { HomePage, LoginPage, RegisterPage } from './pages';
import { Navbar } from './components/ui/navbar';
import PropertyDetail from './pages/property-detail';
import PrivateRouter from './guards/private-route';
import Favorites from './pages/favorites';
function App() {
  return (
    <>
      <Navbar> </Navbar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/properties/:id' element={
          <PrivateRouter>
            <PropertyDetail />
          </PrivateRouter>
        }
        />

        <Route path='/favorites' element={
          <PrivateRouter>
            <Favorites />
          </PrivateRouter>
        }
        />
      </Routes>

    </>
  );
}

export default App;
