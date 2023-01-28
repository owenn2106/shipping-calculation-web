import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "services/firebase";

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};

export const getUserClaims = async () => {
  return await auth.currentUser?.getIdTokenResult().then((result) => {
    return result.claims;
  });
};

export const getCurrentUser = async () => {
  return auth.currentUser;
};

export async function getAuthToken() {
  if (auth.currentUser === null)
    return { data: null, error: "User not logged in" };

  const result = auth.currentUser
    .getIdToken(true)
    .then(function (idToken) {
      return { data: idToken, error: null };
    })
    .catch(function (error) {
      return { data: null, error: error };
    });
  return result;
}
