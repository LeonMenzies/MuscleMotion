import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/User';

const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <div>
      <div>{user.loggedIn}</div>
      <div>{user.id}</div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </div>
  );
};

export default Profile;
