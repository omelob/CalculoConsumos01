import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (  
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient justify-content-between" id="hedernopdf">
            <div className="container">
                <h1>
                    <Link to={'/'} className="text-light">
                        ELECTRO<span  className="logo">NATURAL</span>
                    </Link> 
                </h1>
            </div>
            <Link 
                to={"/entradas/nueva"}
                className="btn btn-warning nuevo-post d-block de-md-inline-block"
            >Agregar un electrodoméstico &#43;</Link>
        </nav>
    );
}
 
export default Header;