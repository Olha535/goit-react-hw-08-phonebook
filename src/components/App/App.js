import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// import s from './App.module.css';
// import Container from '../Container';
import AppBar from '../AppBar';
import RegisterView from '../../views/RegisterView';
import LoginView from '../../views/LoginView';
import { authOperations } from '../../redux/auth';
import HomeView from '../../views/HomeView';
import ContactView from '../../views/ContactView';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import contactJson from '../contacts.json';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {/* <Container> */}
      <AppBar />

      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<HomeView />} />
        </Route>

        <Route path="/register" element={<PublicRoute restricted />}>
          <Route path="/register" element={<RegisterView />} />
        </Route>

        <Route path="/login" element={<PublicRoute restricted />}>
          <Route path="/login" element={<LoginView />} />
        </Route>

        <Route path="/contacts" element={<PrivateRoute />}>
          <Route path="/contacts" element={<ContactView />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        // closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
      {/* </Container> */}
    </>
  );
}
