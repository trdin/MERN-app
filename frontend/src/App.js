import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from "./userContext";
import Header from "./components/Header";
import Photos from "./components/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import AddPhoto from "./components/AddPhoto";
import ShowPhoto from "./components/ShowPhoto";
import Decay from "./components/Decay";
function App() {

  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="My application"></Header>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-12">
                <div className="card mt-5 text-center">
                  <div className="card-body">
                    <Routes>
                      <Route path="/" exact element={<Photos />}></Route>
                      <Route path="/login" exact element={<Login />}></Route>
                      <Route path="/register" element={<Register />}></Route>
                      <Route path="/publish" element={<AddPhoto />}></Route>
                      <Route path="/profile" element={<Profile />}></Route>
                      <Route path="/logout" element={<Logout />}></Route>
                      <Route exact path="/showPhoto/:id" element={<ShowPhoto />}></Route>
                      <Route exact path="/decay" element={<Decay />}></Route>

                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
