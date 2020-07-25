import React, { useState } from "react";
// icon
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { sendFeedback } from "../../redux/actions/feedbacks";
import Alert from "../../layout/Alert";
import { setAlert } from "../../redux/actions/alert";
// React moment
import Moment from "react-moment";
// css
import "./Feedbacks.css";

function Feedbacks() {
  const [msg, setmsg] = useState("");
  const msgHandler = (e) => setmsg(e.target.value);

  const dispatch = useDispatch();

  const feedbacks = useSelector((state) => state.feedbacks.feedbackList);

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (msg.trim()) {
      await dispatch(sendFeedback(null, "", msg));
      setmsg("");
    } else if (!msg.trim())
      dispatch(setAlert("Please write a feedback to submit", "danger"));
  };

  return (
    <div className="">
      <Alert />
      <h1 className="text-center">Message to Superuser</h1>
      <div
        className="container material-card mt-4 p-4"
      >
        <h3>Message</h3>
        <textarea
          className="w-100"
          name="new_message"
          placeholder="Type Message"
          style={{ height: "20vh" }}
          value={msg}
          onChange={msgHandler}
        />
        <button
          className="btn btn-primary align-items-center mt-2"
          onClick={submitFeedback}
        >
          {" "}
          <IoIosSend size={20} /> Send Feedback
        </button>
      </div>

      <hr />
      <div className="mt-3 container p-4">
        <h1>Feedbacks</h1>

        {/* USER FEEDBACKS */}
        <div className="pt-3">
          {feedbacks.length ? (
            feedbacks.map((feedback, i) => (
              <ul className="comment-list material-card" key={i}>
                <li className="comment col-lg-6 col-sm-12 border material-card p-3">
                  <div className="d-flex">
                    <div className="vcard bio col-10">
                      <img
                        className="rounded-circle"
                        src={feedback.user_id.avatar}
                        width="50px"
                        height="50px"
                        alt=""
                      />
                    </div>
                    <div className="col text-right">
                      {feedback.vote === "like" ? (
                        <AiTwotoneLike size={30} color="blue" />
                      ) : (
                          <AiTwotoneDislike size={30} color="red" />
                        )}
                    </div>
                  </div>
                  <div className="comment-body">
                    <h3>{feedback.user_id.name}</h3>
                    <div className="meta">
                      <Moment format="YYYY/MM/DD">{feedback.posted}</Moment>
                    </div>
                    <p>{feedback.message}</p>
                  </div>
                </li>
              </ul>
            ))
          ) : <div className="material-card p-4">
              <h4>No Feedbacks</h4>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Feedbacks;
