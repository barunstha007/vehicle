import React, { useState } from 'react'

export default function Config() {

    const [state, setstate] = useState({
        bookingLimit: '20',
        bookableDays: '4'
    })

    const onBookingLimit = e => {
        setstate({
            bookingLimit: e.target.value
        })
    }

    const onBookableDays = e => {
        setstate({
            bookableDays: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2 className="my-3"><strong>Booking Control Panel </strong></h2><br />
                    <form>
                        <div className="form-group">
                            <label for="bookingLimit">Max Booking Limit</label>
                            <input type="number"
                                className="form-control"
                                id="bookingLimit"
                                placeholder="eg: '20' bikes"
                                required
                                value={state.bookingLimit}
                                onChange={onBookingLimit} />
                        </div>
                        <div className="form-group">
                            <label for="bookableDays">Max Bookable Days</label>
                            <input type="number"
                                className="form-control"
                                name="bookableDays"
                                id="pbookableDays"
                                placeholder="eg: '4' days"
                                required
                                value={state.bookableDays}
                                onChange={onBookableDays} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div >
    )
}
