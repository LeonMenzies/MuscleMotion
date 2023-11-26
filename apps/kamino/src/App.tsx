import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import GlobalStyles from './utils/GlobalStyles';
import { useRecoilState } from 'recoil';
import { userAtom } from './recoil/User';
import { TopNav } from '@musclemotion/components';

import Accessories from './pages/accessories/Accessories';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Mens from './pages/mens/Mens';
import Supplements from './pages/supplements/Supplements';
import Womans from './pages/womans/Womans';
import ForgotPassword from './pages/auth/ForgotPassword';
import Logout from './pages/auth/Logout';

import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import PageNotFound from './utils/PageNotFound';

import MuscleMotionAltLogo from './assets/images/muscle-motion.jpg';

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <div>
      <GlobalStyles />
      <TopNav logo={MuscleMotionAltLogo} />

      <Routes>
        <Route
          element={
            <ProtectedRoute isAllowed={user.loggedIn} redirectPath={'/'} />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAllowed={!user.loggedIn} redirectPath={'/'} />
          }
        >
          <Route path="login" element={<Auth />} />
        </Route>

        <Route index element={<Home />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="mens" element={<Mens />} />
        <Route path="supplements" element={<Supplements />} />
        <Route path="womans" element={<Womans />} />
        <Route path="cart" element={<Cart />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
