import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import store from '../../services/store';
import { checkUserAuth } from '../../services/slices/userSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { ModalWithClose } from '../modal-with-close';
import '../../index.css';
import styles from './app.module.css';

const AppRoutes = () => {
  const location = useLocation();
  const background = (location.state as { background?: Location })?.background;

  // Определяем, является ли текущий путь модальным окном
  const isModalRoute =
    location.pathname.startsWith('/feed/') ||
    location.pathname.startsWith('/ingredients/') ||
    location.pathname.startsWith('/profile/orders/');

  // Определяем фоновую страницу для модального окна
  const getBackgroundPath = () => {
    if (background) {
      return background;
    }
    if (location.pathname.startsWith('/feed/')) {
      return { ...location, pathname: '/feed' };
    }
    if (location.pathname.startsWith('/ingredients/')) {
      return { ...location, pathname: '/' };
    }
    if (location.pathname.startsWith('/profile/orders/')) {
      return { ...location, pathname: '/profile/orders' };
    }
    return null;
  };

  const backgroundLocation = getBackgroundPath();

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {isModalRoute && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <ModalWithClose>
                <OrderInfo />
              </ModalWithClose>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <ModalWithClose>
                <IngredientDetails />
              </ModalWithClose>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ModalWithClose>
                  <OrderInfo />
                </ModalWithClose>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <AppRoutes />
      </div>
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
