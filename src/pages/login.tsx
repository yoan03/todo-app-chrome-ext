import { FC, FormEvent, useState } from 'react';
import styles from './styles/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { signResponse } from '../App';
import { getErrorMessage } from '../inc/error';

// Components
import Spinner from '../components/Spinner';

type AppProps = {
    onSignIn: (email: string, password: string) => Promise<signResponse>
    onSignUp: (email: string, password: string) => Promise<signResponse>
}

const Login: FC<AppProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signError, setSignError] = useState('');

    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

    const onSwapModeHandler = () => {
        setSignError('');
        setIsLoginMode(old => !old);
    }

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isLoginMode)
            return props.onSignIn(email, password).then(data => {
                setLoading(false);
                
                if (data.error) {
                    return setSignError(getErrorMessage(data.error));
                }

                setSignError('');
            });

        return props.onSignUp(email, password).then(data => {
            setLoading(false);
            
            if (data.error) {
                return setSignError(getErrorMessage(data.error));
            }

            setSignError('');
        });
    }

    return (
        <div className={styles.LoginPage}>
            <h3>Please {isLoginMode ? `Log-In` : `Register`} to Use ToDo App</h3>
            <hr />
            <form onSubmit={onSubmitHandler}>
                <div className={styles.TextInputs}>
                    <input type="text" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <p className={styles.ErrorText}>{signError}</p>
                </div>
                <button className={styles.btn} onClick={onSubmitHandler}>
                    <span>{isLoginMode ? `Sign In` : `Register`}</span>
                    {loading ? <Spinner /> : <FontAwesomeIcon icon={faRightToBracket} />}
                </button>
                <div className={styles.SwapModeLink} onClick={onSwapModeHandler}>{isLoginMode ? `If you haven't register` : `To switch to log-in`} click here</div>
            </form>
        </div>
    )
};

export default Login;