import React from 'react'

import {BrowserRouter, Route, Link} from 'react-router-dom'

const Header =  ()=>{
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Course List App</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                     <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link to="/enquiries" className="nav-link">Enquiries</Link>
                </li>
                
                
                </ul>
              
            </div>
            </nav>
        </React.Fragment>
    )
}

export default Header