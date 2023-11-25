import { useEffect, useState } from 'react';
import Text from '../../components/input/Text';
import { useApi } from '../../api/Api';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/User';
import { LoginRequest, LoginResponse } from '../../types/ApiTypes';

const Login = () => {
  const [user, serUser] = useRecoilState(userAtom);

  const {
    data,
    loading,
    error,
    postData: submitLoginDetails,
  } = useApi<LoginResponse>();
  const url = 'http://localhost:3000/login';
  const [loginDetails, setLoginDetails] = useState<LoginRequest>({
    Email: 'leon.menzies@hotmail.com',
    Password: 'Testing123',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitLoginDetails(url, loginDetails);
  };

  useEffect(() => {
    if (data?.success) {
      serUser({
        loggedIn: true,
        user: data.data.user,
        jwt: data.data.jwt,
      });
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Text
          title={'Email'}
          type={'email'}
          placeholder={'Enter email address'}
          value={loginDetails.Email}
          id={'email'}
          required={true}
          onChange={handleInputChange}
        />

        <Text
          title={'Password'}
          type={'password'}
          placeholder={'Enter password'}
          value={loginDetails.Password}
          id={'password'}
          required={true}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, Password: e.target.value })
          }
        />
        {error && <div className="error">{error.message}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
