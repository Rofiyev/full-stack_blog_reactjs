import logo from '../image/logo-size.png';
import { Input } from '../ui';
import { useDispatch, useSelector } from 'react-redux';
import { signUserFailure, signUserStart, signUserSuccess, reset } from '../slice/auth';
import AuthService from '../service/auth';
import { toast } from 'react-toastify';
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, error, loggedIn } = useSelector(state => state.auth);
  const ref = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Alert
  const errorMessege = useCallback(() => {
    return Object.keys(error).map(name => {
      const msg = error[name].join(', ');
      return `${name} - ${msg}`;
    })
  }, [error]);
  // 

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(signUserStart());
    const { username, email, password } = ref.current;
    const user = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    dispatch(reset());
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user));
      navigate('/');
      ref.current.reset();
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  }


  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn]);

  return (
    <div className="row m-0 p-0 mt-5 overflow-hidden">
      <div className="col-10 col-sm-8 col-md-5 col-lg-4 mx-auto">
        <div className="w-100">
          <div className='d-none'>
            {error !== null ?
              toast.error(errorMessege()[0].charAt(0).toUpperCase() + errorMessege()[0].slice(1), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                progressStyle: { background: '#fff' },
                theme: 'colored',
                style: { background: '#ea0229' },
              })
              : <></>}
          </div>
          <form ref={ref} className="form-signin">
            <div className="text-center">
              <img className="mb-4" src={logo} style={{ objectFit: 'cover' }} alt="Logo" width="72" height="72" />
              <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
              <Input placeholder={'Username'} name={'username'} type={'text'} change={setUsername} value={username} />
              <Input placeholder={'Email address'} name={'email'} type={'email'} change={setEmail} value={email} />
              <Input placeholder={'Password'} name={'password'} type={'password'} change={setPassword} value={password} />
            </div>
            <button className="btn btn-primary btn-block mt-2" type="submit" disabled={isLoading} onClick={submitHandler}>
              {isLoading ? <><span className="spinner-border spinner-border-sm" role="status"></span> &nbsp; </> : <></>}
              Sign up
            </button>
            <p className="mt-5 mb-3 text-muted text-center fixed-bottom">&copy;Rof1yev | 2022-2023 years</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;