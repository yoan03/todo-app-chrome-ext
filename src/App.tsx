import { app } from './firebaseConfig';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Pages
import Main from './pages/main';
import Login from './pages/login';

// Google Authentication constants
const auth = getAuth(app);

export type signResponse = {
  data?: any,
  error?: string
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Google OAuth Not supported yet due to new security policies on Manifest V3

  // const onGoogleSignInHandler = () => {
  //   signInWithPopup(auth, provider)
  //     .then(result => {
  //       const credentials = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credentials?.accessToken;

  //       const user = result.user;

  //       console.log("Logged-in Successfully: ", {
  //         token,
  //         user
  //       });
  //     }).catch(error => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;

  //       console.error("Error while trying to log-in: ", {
  //         errorCode,
  //         errorMessage
  //       });
  //     }) 
  // };

  const onSignInHandler = (email: string, password: string) : Promise<signResponse> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Logged In User: ", user);

        resolve({
          data: user
        });
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;

        console.error(`Error on signing-in user: with code ${errorCode} and following message: ${errorMessage}`);
        resolve({
          error: errorCode
        });
      });
    });
  }
  
  const onSignUpHandler = (email: string, password: string): Promise<signResponse> => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Logged In User: ", user);

        resolve({
          data: user
        });
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;

        console.error(`Error on registering user: with code ${errorCode} and following message: ${errorMessage}`);
        resolve({
          error: errorCode
        });
      });
    })
    
  }

  const signOutHandler = () => {
    signOut(auth).then(() => {
        // Sign Out
    }).catch(error => {
      console.error("Error on signing out: ", error);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      {isLoggedIn ? <Main onLogoutClicked={signOutHandler} /> : <Login onSignIn={onSignInHandler} onSignUp={onSignUpHandler} />}
    </>
    
  );
}

export default App;
