import React from 'react'
import axios from 'axios'

export default function auth() {

    const onSubmitHandler = e => {
        const login = {
            username: state.username,
            password: state.password
        }

        axios.post('/login', login)
            .then(req => console.log(req.data))
            .catch(err => {
                const errors = [...err.response.data.error]

                setstate({ ...state, errors: { ...err.response.data.error } })
                // err.response.data.error.map(error)
                console.log(state.errors[0])
            })

        console.log(register)

        setstate({
            name: '', phone: '', email: '', location: '', username: '', password: ''
        })
        e.preventDefault()
    }

    return (
        <div>

        </div>
    )
}
