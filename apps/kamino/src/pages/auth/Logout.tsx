import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { defaultUser, userAtom } from '../../recoil/user';

const Logout = () => {
  const navigate = useNavigate();
  const [user, serUser] = useRecoilState(userAtom);

  useEffect(() => {
    serUser(defaultUser);
  }, [serUser]);

  return <></>;
};

export default Logout;
