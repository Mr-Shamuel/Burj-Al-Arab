import React, { useContext } from 'react';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

import "firebase/compat/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button'


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const app = initializeApp(firebaseConfig);
    //  if(firebase.app.length === 0){
    //     const app = initializeApp(firebaseConfig);
    //  }
    const provider = new GoogleAuthProvider();
    const handleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email: email }
                setLoggedInUser(signedInUser);
       
                history.replace(from);
            
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }


  
    return (
        <div>
            <h1 className="text-info text-center mb-4">Signing Page</h1>
            
            <GoogleButton className="mx-auto "
                onClick={handleSignIn}
            />



        </div>
    );
};

export default Login;