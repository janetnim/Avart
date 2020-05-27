import firebase from 'firebase';
import { AuthSession } from 'expo';

export const handleGoogleLogin = async (onLoginSuccess, onLoginFailure) =>  {
  try {
    let redirectUrl = 'https://exp.host/@janetnim/expo-template-bare';
    let googleWebAppId = '180000856073-rh5nuiv5qo7ja8c9r5m5kojc0fh5hpml.apps.googleusercontent.com';
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `&client_id=${googleWebAppId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&scope=profile`,
      });
    if(result.type === 'success') {
      const { idToken, accessToken } = result;
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then(onLoginSuccess.bind(this))
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if(errorCode == 'auth/weak-password') {
          onLoginFailure.bind(this)('Weak password!')
        } else {
          onLoginFailure.bind(this)(errorMessage)
        }
      })
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
