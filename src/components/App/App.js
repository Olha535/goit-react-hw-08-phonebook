import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from '../AppBar';
import { authOperations, authSelectors } from '../../redux/auth';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Loader';

const HomeView = lazy(() =>
  import('../../views/HomeView' /*webpackChunkName: "home-view" */),
);
const RegisterView = lazy(() =>
  import('../../views/RegisterView' /*webpackChunkName: "register-view" */),
);
const LoginView = lazy(() =>
  import('../../views/LoginView' /*webpackChunkName: "login-view" */),
);
const ContactView = lazy(() =>
  import('../../views/ContactView' /*webpackChunkName: "contact-view" */),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <div>
      {isFetchingCurrentUser ? (
        <Spinner />
      ) : (
        <>
          <AppBar />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<HomeView />} />
              </Route>

              <Route
                path="/register"
                element={<PublicRoute redirectTo="/contacts" restricted />}
              >
                <Route path="/register" element={<RegisterView />} />
              </Route>

              <Route
                path="/login"
                element={<PublicRoute redirectTo="/contacts" restricted />}
              >
                <Route path="/login" element={<LoginView />} />
              </Route>

              <Route
                path="/contacts"
                element={<PrivateRoute redirectTo="/contacts" />}
              >
                <Route path="/contacts" element={<ContactView />} />
              </Route>
            </Routes>
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </div>
  );
}
