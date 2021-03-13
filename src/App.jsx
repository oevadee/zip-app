import { useEffect, useState } from "react";
import "./App.scss";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/LoginPage/LoginPage";

import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is: ", authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
        db.collection("users").doc(authUser.uid).set({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        });
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);


  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar user={user} mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
          <Dashboard setMobileNavOpen={setMobileNavOpen} mobileNavOpen={mobileNavOpen} />
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
