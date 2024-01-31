import Login from './login';
import Signup from './signup';
import { useState } from 'react';
import styled from 'styled-components';
import MuscleMotionAltLogo from '../../assets/images/muscle-motion.jpg';

const StyledAuth = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .auth-selector {
    display: flex;
    margin: 1rem;
  }
`;

const Auth = () => {
  const [login, setLogin] = useState(true);

  return (
    <StyledAuth>
      <img
        className={'navLogo'}
        src={MuscleMotionAltLogo}
        alt="MuscleMotionAltLogo"
        width="128"
        height="128"
      />

      <div className={'auth-selector'}>
        <div onClick={() => setLogin(true)}>Login</div>
        <div onClick={() => setLogin(false)}>Signup</div>
      </div>

      {login ? <Login /> : <Signup />}
    </StyledAuth>
  );
};

export default Auth;
