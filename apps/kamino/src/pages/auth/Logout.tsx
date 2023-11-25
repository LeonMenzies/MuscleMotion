import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/User';

const Logout = () => {
  const navigate = useNavigate();
  const [user, serUser] = useRecoilState(userAtom);

  useEffect(() => {
    serUser({
      loggedIn: false,
      user: {
        ID: 0,
        FirstName: '',
        LastName: '',
        Email: '',
        Roles: '',
      },
      jwt: '',
    });
  }, [navigate]);

  return <></>;
};

export default Logout;
