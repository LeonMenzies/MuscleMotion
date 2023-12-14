import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { usePostApi } from '@musclemotion/hooks';
import { LoginRequestT, LoginResponseT } from '@musclemotion/types';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../recoil/User';
import { useNavigate } from 'react-router-dom';

export interface LoginContainerProps {}

export function LoginContainer(props: LoginContainerProps) {
  const setUserAtom = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const [postLoginResponse, postLoginLoading, postLogin] = usePostApi<
    LoginRequestT,
    LoginResponseT
  >('/login');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<LoginRequestT>({
    email: 'leon.menzies@mm.com',
    password: 'Testing123!',
  });

  useEffect(() => {
    if (postLoginResponse.success && postLoginResponse.data) {
      setUserAtom({
        loggedIn: true,
        user: {
          id: postLoginResponse.data.user.id,
          firstName: postLoginResponse.data.user.firstName,
          lastName: postLoginResponse.data.user.lastName,
          email: postLoginResponse.data.user.email,
          roles: postLoginResponse.data.user.roles,
        },
        jwt: postLoginResponse.data.jwt,
      });
      navigate('/dashboard');
    } else {
      setErrorMessage(postLoginResponse.errorMessage);
    }
  }, [postLoginResponse, setUserAtom, navigate]);

  const handleFieldChange = (fieldName: keyof typeof user, value: string) => {
    setUser({
      ...user,
      [fieldName]: value,
    });
  };

  const handleLogin = async () => {
    postLogin(user);
  };

  return (
    <StyledLoginContainer>
      <LoginForm
        user={user}
        handleFieldChange={handleFieldChange}
        handleLogin={handleLogin}
        loading={postLoginLoading}
        errorMessage={errorMessage}
      />
    </StyledLoginContainer>
  );
}

export default LoginContainer;

const StyledLoginContainer = styled.div`
  margin-right: 50px;
`;
