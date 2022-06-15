import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UPDATE_USER_LIST } from "../../redux/actions/index";
// import { userList } from "../../redux/reducers/userList";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./Login.css";

export default function Login({ setData, page }) {
  const [formInput, setformInput] = useState({});
  const [click, setclick] = useState(false);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  // const { id } = useParams();

  const unique_id = uuid();

  const handleform = (e) => {
    if (page === "edit") {
      setformInput({
        ...formInput,
        [e.target.name]: e.target.value,
      });
    } else {
      setformInput({
        ...formInput,
        [e.target.name]: e.target.value,
        id: unique_id,
      });
    }

    // setclick(true);
    console.log(formInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setclick(true);
    const { username, password } = formInput;
    if (username && password && confirmPassword()) {
      {
        page === "edit" ? alert("updated") : alert("submitted");
      }
      page !== "edit" && setData(formInput);
      if (page === "edit") {
        const id = window.location?.pathname?.split("/")[2];
        const filteredList = userList?.filter((user) => user?.id !== id);
        dispatch(UPDATE_USER_LIST([...filteredList, formInput]));
        setclick(false);
        navigate("/users");
      } else {
        // navigate("/users");
        dispatch(UPDATE_USER_LIST([...userList, formInput]));
        setclick(false);
        setformInput({ username: "", password: "", password2: "" });
      }
    }
  };

  useEffect(() => {
    if (page === "edit") {
      const id = window.location?.pathname?.split("/")[2];
      const editingUser = userList?.find((user) => user?.id === id);

      const { username, password, password2 } = editingUser;
      setformInput({
        username,
        password,
        password2,
        id,
      });
    }
  }, []);

  const validateInput = () => {
    if (formInput.username.length < 3) {
      return true;
    } else if (formInput.username.length > 20) {
      return true;
    } else if (formInput.username.match("[0-9]+")) {
      return true;
    }
    return false;
  };

  const validatePassword = () => {
    if (formInput.password.length < 6) {
      return true;
    }
    return false;
  };
  const confirmPassword = () => {
    const { password, password2 } = formInput;
    if (password !== password2) {
      seterror(true);
      return false;
    }
    seterror(false);
    return true;
  };

  return (
    <div className="form-page">
      <form className="form-page1" onSubmit={(e) => handleSubmit(e)}>
        {page === "edit" ? <h1>Edit User</h1> : <h1>Create Account</h1>}
        <hr />
        <div className="form-page-fields">
          <div>
            <label> UserName</label>
            <input
              type="text"
              name="username"
              value={formInput?.username}
              onChange={(e) => handleform(e)}
            />
            {!formInput.username && click ? "this is required" : null}
            {formInput.username && validateInput() ? (
              <p className="form-page-fields-para">
                characters should be within 3-20 char only, no digits accepted
              </p>
            ) : null}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formInput.password}
              onChange={(e) => handleform(e)}
            />
            {!formInput.password && click ? (
              <p className="form-page-fields-para">"this is required" </p>
            ) : null}
            {formInput.password && validatePassword() ? "poor strength" : null}
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={formInput.password2}
              onChange={(e) => handleform(e)}
            />
            {!formInput.password2 && click ? "this is a required field" : null}
            {error ? "password doesn\t match" : null}
          </div>

          <div className="btn">
            <button type="submit">
              {page === "edit" ? "Update User" : "Create Account"}
            </button>
          </div>
          <Link to="/users" className="links">
            Contact List
          </Link>
        </div>
      </form>
    </div>
  );
}
