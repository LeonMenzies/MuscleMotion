import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginForm from './login_form';
import { usePostApi } from '@musclemotion/hooks';
import { LoginRequestT, LoginResponseT } from '@musclemotion/types';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../recoil/user';
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
        id: postLoginResponse.data.id,
        firstName: postLoginResponse.data.firstName,
        lastName: postLoginResponse.data.lastName,
        email: postLoginResponse.data.email,
        roles: postLoginResponse.data.roles,
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
