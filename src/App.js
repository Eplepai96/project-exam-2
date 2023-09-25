import { Header, Footer, RouteNotFound } from './components';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RenderHomepage } from './pages/Home';
import { RenderCountries } from './pages/Countries';
import { RenderCities } from './pages/Cities';
import { RenderVenues } from './pages/AllVenues';
import { RenderSingleVenue } from './pages/SingleVenue';
import { RenderSearchResults } from './pages';
import { RenderLoginPage } from './pages/Login';
import { RenderRegisterPage } from './pages/Register';
import { RenderBookingPage } from './pages/BookVenue';
import { RenderProfile } from './pages';
import { AuthProvider } from './storage';
import './App.css';
import { RenderUserBookings } from './pages/UserBookings';
import { RenderUserVenues } from './pages/UserVenues';
import { RenderAddVenue } from './pages/AddVenue';
import { RenderUpdateVenue } from './pages/UpdateVenue';


function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<RenderHomepage />} />
            <Route path="/countries/:continent" element={<RenderCountries />} /> 
            <Route path="/cities/:continent/:country" element={<RenderCities />} />
            <Route path="/venues/:continent/:country/:city" element={<RenderVenues />} />
            <Route path="/venue/:continent/:country/:city/:id" element={<RenderSingleVenue />} />
            <Route path="/book/:venue/:continent/:country/:city/:id" element={<RenderBookingPage />}/>
            <Route path="/search/:query" element={<RenderSearchResults />} />
            <Route path="/login" element={<RenderLoginPage />} />
            <Route path="/register/:login" element={<RenderRegisterPage />} />
            <Route path="/profile/:name" element={<RenderProfile />}/>
            <Route path="/venues/:profile" element={<RenderUserVenues />}/>
            <Route path="/bookings/:profile"  element={<RenderUserBookings />} />
            <Route path='/add/:venues/:profile' element={<RenderAddVenue />} />
            <Route path='/venues/:edit/:venueId' element={<RenderUpdateVenue />} />
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

