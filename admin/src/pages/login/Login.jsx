import { useCallback, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/apiCalls';
import './login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorDisplay, setErrorDisplay] = useState('');
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        login({ email, password }, dispatch, setErrorDisplay);
    };

    return (
        <div className='login'>
            <form className='loginForm'>
                <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} disabled={isFetching}>
                    Login
                </button>
            </form>

            <h4>{errorDisplay}</h4>
        </div>
    );
};

export default Login;
