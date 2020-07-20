import React, { useState } from 'react'
import { AiOutlineLike, AiOutlineDislike, AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { sendFeedback } from '../../redux/actions/feedbacks'
import Alert from '../../layout/Alert'
import { setAlert } from '../../redux/actions/alert'

function CustomerMsg() {
    const [sc, setsc] = useState('')
    const selectHandler = (e) => setsc(e.target.value)

    const [like, setlike] = useState(false)
    const [dislike, setdislike] = useState(false)

    const [msg, setmsg] = useState('')
    const msgHandler = (e) => setmsg(e.target.value)

    const dispatch = useDispatch()
    const sclist = useSelector(state => state.serviceCenterList.sclist)

    const submitFeedback = async (e) => {
        e.preventDefault()
        console.log(dislike)
        if (sc && like && msg.trim()) {
            await dispatch(sendFeedback(sc, 'like', msg))
            setsc(''); setlike(false); setdislike(false); setmsg('')
        }
        else if (sc && dislike && msg.trim()) return dispatch(sendFeedback(sc, 'dislike', msg))
        else if (!sc) dispatch(setAlert('Please choose a service center', 'danger'))
        else if (!like && !dislike) dispatch(setAlert('Please choose a vote', 'danger'))
        else if (!msg.trim()) dispatch(setAlert('Please write a feedback to submit', 'danger'))
    }

    return (
        <>
            <Alert />
            <h1 className="text-center">Send a Feedback</h1>
            <div className="container material-card mt-4 p-4" style={{ backgroundColor: '#f0f0f0' }}>
                <h3>Service center</h3>
                <select className="custom-select custom-select-lg mb-3" value={sc} onChange={selectHandler}>
                    <option selected >-- Choose service center --</option>
                    {sclist.map(list => <option value={list._id}>{list.name}</option>)}
                </select>
                {/* votes */}
                <h3>Vote</h3>
                <div className="p-2 d-flex mb-4 justify-content-center">
                    {like ?
                        <AiTwotoneLike style={{ cursor: 'pointer' }} size={35} color='blue' className='mx-4' onClick={() => { setlike(false); setdislike(false) }} />
                        :
                        <AiOutlineLike style={{ cursor: 'pointer' }} size={35} className={`mx-4 text-primary `} onClick={() => { setlike(true); setdislike(false) }} />
                    }

                    {dislike ?
                        <AiTwotoneDislike style={{ cursor: 'pointer' }} size={35} color='red' className='mx-4' onClick={() => { setdislike(false); setlike(false) }} />
                        :
                        <AiOutlineDislike style={{ cursor: 'pointer' }} size={35} className='mx-4 text-danger' onClick={() => { setdislike(true); setlike(false) }} />
                    }
                </div>
                <h3>Message</h3>
                <textarea className="w-100" name="new_message"
                    placeholder="Type Feedback" style={{ height: '20vh' }} value={msg} onChange={msgHandler} />
                <button className="btn btn-primary align-items-center mt-2" onClick={submitFeedback}> <IoIosSend size={20} /> Send Feedback</button>
            </div>
        </>
    )
}

export default CustomerMsg
