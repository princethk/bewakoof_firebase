import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth as authentication } from "../config/firebase.config";
import { selectAuth, setAuth } from "../redux/slices/auth-slice";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for handling authentication.
 *
 * @returns {Object} Authentication related functions and state.
 */
const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Logs in the user with email and password.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} A promise that resolves when the login is complete.
   */
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      authentication,
      email,
      password
    );
    const user = userCredential.user;
    dispatch(
      setAuth({
        isAuthenticated: true,
        user: {
          email: user.email,
          accessToken: user.accessToken,
          uid: user.uid,
        },
      })
    );
  };

  /**
   * Logs out the current user.
   *
   * @returns {Promise<void>} A promise that resolves when the logout is complete.
   */
  const logout = async () => {
    try {
      await signOut(authentication);
      dispatch(setAuth({ isAuthenticated: false, user: null }));
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: {
              email: user.email,
              accessToken: user.accessToken,
              uid: user.uid,
            },
          })
        );
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  return { auth, login, logout, loading };
};

export default useAuth;
