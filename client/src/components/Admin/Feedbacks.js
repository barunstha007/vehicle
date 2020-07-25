import React, { useState } from 'react'
import { AiOutlineLike, AiOutlineDislike, AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
// Redux
import { useDispatch } from 'react-redux'
import { sendFeedback } from '../../redux/actions/feedbacks'
import Alert from '../../layout/Alert'
import { useSelector, setAlert } from '../../redux/actions/alert'

function Feedbacks() {

    const [msg, setmsg] = useState('')
    const msgHandler = (e) => setmsg(e.target.value)

    const dispatch = useDispatch()

    const submitFeedback = async (e) => {
        e.preventDefault()
        if (msg.trim()) {
            await dispatch(sendFeedback(msg))
            setmsg('')
        }
        else if (!msg.trim()) dispatch(setAlert('Please write a feedback to submit', 'danger'))
    }

    return (
        <>
            <Alert />
            <h1 className="text-center">Message to Superuser</h1>
            <div className="container material-card mt-4 p-4" style={{ backgroundColor: '#f0f0f0' }}>
                <h3>Message</h3>
                <textarea className="w-100" name="new_message"
                    placeholder="Type Message" style={{ height: '20vh' }} value={msg} onChange={msgHandler} />
                <button className="btn btn-primary align-items-center mt-2" onClick={submitFeedback}> <IoIosSend size={20} /> Send Feedback</button>
            </div>
        </>
    )
}

export default Feedbacks
