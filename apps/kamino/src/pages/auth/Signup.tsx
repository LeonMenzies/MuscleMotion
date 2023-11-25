import { useState } from 'react';
import Text from '../../components/input/Text';

const Signup = () => {
  const [error, setError] = useState('');
  const [user, serUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      setError('Passwords must match');
      return;
    }

    // createUserWithEmailAndPassword(auth, user.email, user.password)
    //   .then((userCredential) => {
    //     const uid = userCredential.user.uid;
    //     addUser(uid, user, setError);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Text
          title={'First Name'}
          type={'text'}
          placeholder={'Enter first name'}
          value={user.first_name}
          id={'first_name'}
          required={true}
          onChange={(e) => serUser({ ...user, first_name: e.target.value })}
        />

        <Text
          title={'Last Name'}
          type={'text'}
          placeholder={'Enter last name'}
          value={user.last_name}
          id={'last_name'}
          required={true}
          onChange={(e) => serUser({ ...user, last_name: e.target.value })}
        />

        <Text
          title={'Email'}
          type={'email'}
          placeholder={'Enter email address'}
          value={user.email}
          id={'email'}
          required={true}
          onChange={(e) => serUser({ ...user, email: e.target.value })}
        />

        <Text
          title={'Password'}
          type={'password'}
          placeholder={'Enter password'}
          value={user.password}
          id={'password'}
          required={true}
          onChange={(e) => serUser({ ...user, password: e.target.value })}
        />

        <Text
          title={'Confirm Password'}
          type={'password'}
          placeholder={'Confirm password'}
          value={user.confirm_password}
          id={'confirm_password'}
          required={true}
          onChange={(e) =>
            serUser({ ...user, confirm_password: e.target.value })
          }
        />

        {error && <div className="error">{error}</div>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
