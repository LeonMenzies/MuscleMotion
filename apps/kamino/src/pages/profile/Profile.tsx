import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/User';

const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <div>
      <div>{user.loggedIn}</div>
      <div>{user.user.Roles}</div>
      <div>{user.user.Email}</div>
      <div>{user.user.FirstName}</div>
      <div>{user.user.LastName}</div>
    </div>
  );
};

export default Profile;
