import React from 'react';
import '../../fonts/starwars-glyphicons/css/starwars-glyphicons.css'
import './styles.css'

function Header() {
  return (
    <header>
      <div className="header-background">
        <div className="header-inner">
          <img className="header-img" src={require('../../images/sw-header.png')} alt="header-img" width="80"
               height="65"/>
          <h1>
            <span>Star Wars</span>
            portal
          </h1>
        </div>
      </div>
    </header>
  )
}

export default Header;