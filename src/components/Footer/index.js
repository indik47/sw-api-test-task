import React from 'react';
import './styles.css'

function Footer () {
    return (
      <footer>
        <div className="footer-inner">
          <span>Made with</span>
          <a href="https://swapi.co/" target="_blank" rel="noopener noreferrer">SW API</a>
          <span>by</span>
          <a href="https://www.linkedin.com/in/denysoligov/">Denys Oligov</a>
        </div>
      </footer>
    )
}

export default Footer;