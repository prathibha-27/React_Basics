import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER_LIST } from "../../redux/actions";
import { useNavigate, Link } from "react-router-dom";
// import { UserDetailContext } from "../../App";
// import { UPDATE_USER_LIST } from "../../redux/actions";
import "./userList.css";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  console.log(userList);

  // const users = useContext(UserDetailContext);

  const handleDeleteUser = (id) => {
    const filteredUser = userList?.filter((user) => user?.id !== id);
    dispatch(UPDATE_USER_LIST(filteredUser));
  };

  // const handleDeleteUser = (id) => {
  //   const filteredUser = userList.filter(
  //     (user, index, userList) => userList[id] !== userList[index]
  //   );
  //   dispatch(UPDATE_USER_LIST(filteredUser));
  // };

  const handleDeleteAllUser = () => {
    const userList = "";
    dispatch(UPDATE_USER_LIST(userList));
  };

  return (
    <div className="user">
      <h1>Contact List</h1>
      <hr />
      {userList?.length ? (
        userList.map((user, id) => (
          <div className="user-btn-primary" key={user.id}>
            <h1>Welcome, {user.username}</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "75%",
              }}
            >
              <button
                className="user-btn"
                onClick={() => handleDeleteUser(user?.id)}
              >
                Delete
              </button>
              <button
                className="user-btn"
                onClick={() => navigate(`/edit/${user.id}`)}
              >
                Edit
              </button>

              {/* <button onClick={() => navigate(`/edit/${user?.id}`)}>
                {" "}
                Edit
              </button> */}
            </div>
          </div>
        ))
      ) : (
        <h1>No users found</h1>
      )}
      <div className="user-actions">
        {userList.length ? (
          <button className="user-btn" onClick={() => handleDeleteAllUser()}>
            Delete All
          </button>
        ) : null}
        <Link className="user-link" to="/">
          Back
        </Link>
      </div>
    </div>
  );
}
