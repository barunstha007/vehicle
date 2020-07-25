import React from "react";
import Moment from "react-moment";
// redux
import { useSelector } from "react-redux";

function SuperuserMessage() {
  const adminMessage = useSelector((state) => state.feedbacks.adminMessage);

  return (
    <div className="mt-3 container material-card">
      <h1>Admin Messages</h1>

      {/* USER FEEDBACKS */}
      <div className="p-3">
        {!adminMessage.length && <h5>No Messages</h5>}
        {adminMessage.map((message, i) => (
          <ul className="comment-list" key={i}>
            <li className="comment col-lg-6 col-sm-12 border p-3">
              <div className="vcard bio col-10">
                <img
                  className="rounded-circle"
                  src={message.user_id.avatar}
                  width="50px"
                  height="50px"
                  alt=""
                />
              </div>

              <div className="comment-body">
                <h3>{message.user_id.name}</h3>
                <div className="meta">
                  <Moment format="YYYY/MM/DD">{message.posted}</Moment>
                  date
                </div>
                <p>{message.message}</p>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SuperuserMessage;
