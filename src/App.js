import Login from "./components/LoginForm";
import React, { createContext, useState } from "react";
import UserList from "./components/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import EditForm from "./components/EditForm";

export const UserDetails = createContext();

function App() {
  const [data, setData] = useState();
  return (
    <div className="App">
      <Provider store={store}>
        <UserDetails.Provider value={data}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login setData={setData} />} />
            </Routes>
            <Routes>
              <Route path="/users" element={<UserList />} />
            </Routes>
            <Routes>
              <Route path="/edit/:i" element={<EditForm />} />
            </Routes>
          </BrowserRouter>
        </UserDetails.Provider>
      </Provider>
    </div>
  );
}

export default App;
