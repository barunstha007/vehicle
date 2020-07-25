import React from 'react'
// Redux
import { useSelector, useDispatch } from 'react-redux'

function Packages() {

    const dispatch = useDispatch();

    const searchInput = useSelector(state => state.packages.searchInput)
    const orgPackageList = useSelector(state => state.packages.packageList)
    const packageList = useSelector(state => state.packages.packageList.filter(function (item) { return item.title.toUpperCase().includes(searchInput.toUpperCase()); }))

    return (
        <div className="container">
            <div className="header clearfix my-2 ">
                <form className="form-inline my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="SEARCH"
                        value={searchInput}
                        onChange={(e) => dispatch({ type: 'SEARCH_INPUT_CHANGE', value: e.target.value })}
                    />
                </form>

            </div>

            <div className="jumbotron">
                <h1 className="display-3" style={{ paddingRight: ' 0px' }}>Packages</h1>
                <p className="lead">We Provide verious packages for all of your bikes & scooter</p>
                <p><a className="btn btn-lg btn-success" href="/login" role="button" >Sign up today</a></p>
            </div>

            <div className="row marketing">

                {searchInput.trim() ? packageList.map(item => {
                    return (
                        <div className="col-lg-6 my-4 p-4 shadow" key={item.id}>
                            <div key={item.id}>
                                <h4>{item.title.toUpperCase()}</h4>
                                <p>
                                    <img style={{ objectFit: 'cover' }} src={item.image} height="250" width="250" />
                                    <br />
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    )
                }) :
                    orgPackageList.map(item => {
                        return (
                            <div className="col-lg-6 my-4 p-4 shadow" key={item.id}>
                                <div key={item.id}>
                                    <h4>{item.title.toUpperCase()}</h4>
                                    <img style={{ objectFit: 'cover' }} src={item.image} height="250" width="250" />
                                    <br />
                                    <p className="mt-2">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>

    )
}

export default Packages
