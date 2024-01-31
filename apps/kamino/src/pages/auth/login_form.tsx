import { LoginRequestT } from '@musclemotion/types';
import { Text, Button, Error } from '@musclemotion/components';
import styled from 'styled-components';

interface LoginFormProps {
  user: LoginRequestT;
  handleFieldChange: (fieldName: keyof LoginRequestT, value: string) => void;
  handleLogin: () => void;
  loading: boolean;
  errorMessage: string;
}

export function LoginForm({
  user,
  handleFieldChange,
  handleLogin,
  loading,
  errorMessage,
}: LoginFormProps) {
  return (
    <CenteredContainer>
      <StyledLoginForm>
        <Text
          title={'Email'}
          type={'email'}
          placeholder={'Email'}
          value={user.email}
          required={true}
          id={'login-form-email'}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />

        <Text
          title={'Password'}
          type={'password'}
          placeholder={'Password'}
          value={user.password}
          required={true}
          id={'login-form-password'}
          onChange={(e) => handleFieldChange('password', e.target.value)}
        />

        <Button
          text={'Login'}
          onClick={handleLogin}
          disabled={loading}
          loading={loading}
        />
        <Error errorMessage={errorMessage} />
      </StyledLoginForm>
    </CenteredContainer>
  );
}

export default LoginForm;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #cac6c3;
  padding: 20px;
  width: 300px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;
