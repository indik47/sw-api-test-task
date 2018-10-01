import React, { Component } from 'react';
import '../../fonts/starwars-glyphicons/css/starwars-glyphicons.css'

class Header extends Component {
    render() {
        return(
            <header>
                <div className="header-inner">
                    <i className="swg swg-lightsabers swg-1x"/>
                    <h1>
                        <span>Star Wars</span>
                        portal
                    </h1>
                </div>
            </header>
        )
    }
}

export default Header;