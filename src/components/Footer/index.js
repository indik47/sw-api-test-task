import React, { Component } from 'react';
import './styles.css'

class Footer extends Component {
    render() {
        return(
            <footer>
                    <div className="footer-inner">
                        <span>Made with</span>
                        <a href="https://swapi.co/" target="_blank">SW API</a>
                        <span>by</span>
                        <a href="#">Denys Oligov</a>
                    </div>
            </footer>
        )
    }
}

export default Footer;