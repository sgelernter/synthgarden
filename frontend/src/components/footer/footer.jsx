import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return(
        <footer>
            <div className="footer-box">
                <div className="peeps">
                    <p>Sync with us:</p>
                    <a href="">Sam</a>
                    <a href="">Stella</a>
                    <a href="">Emily</a>
                </div>

                <div className="repo-link">
                    <a href="https://github.com/stellalc7/synthgarden"><FontAwesomeIcon icon={ faGithubAlt } /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;