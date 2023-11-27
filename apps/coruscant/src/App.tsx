import { Routes, Route } from 'react-router-dom';
// import { ProtectedRoute } from '@musclemotion/components';
import { PageNotFound } from '@musclemotion/components';
import { GlobalStyles } from '@musclemotion/styles';
// import { useRecoilState } from 'recoil';
// import { userAtom } from './recoil/User';
import { TopNav } from '@musclemotion/components';

import Dashboard from './pages/dashboard/Dashboard';

import MuscleMotionAltLogo from './assets/images/muscle-motion.jpg';

function App() {
  // const [user, setUser] = useRecoilState(userAtom);

  return (
    <div>
      <GlobalStyles />
      <TopNav logo={MuscleMotionAltLogo} />

      <Routes>
        {/* <Route
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
        </Route> */}

        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<Dashboard />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
