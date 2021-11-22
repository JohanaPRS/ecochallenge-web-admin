import React from 'react'
//imagenes
import logoApp from '../assetss/img/logoB2.png'


class Header extends React.Component{

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand">
                        <img src={logoApp} width="80" height="50" className="d-inline-block align-top" alt=""/>
                        
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" onSubmit={this.manejadorSubmit}>
                            <a className="nav-link" href="/home">
                                Home<span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active" onSubmit={this.manejadorSubmit}>
                            <a className="nav-link" href="/desafios">
                                Desafíos<span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/prueba"><span className="sr-only"></span></a>
                        </li>
                        </ul>
                    </div>
                </div> 
            </nav>
        );

        
    }
}

export default Header;