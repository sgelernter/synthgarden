import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithubAlt } from "@fortawesome/free-solid-svg-icons";
// import { faGithubAlt } from "react-icons/fa"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab)

const Footer = () => {
    return(
        <footer>
            <div className="footer-box">
                <div className="peeps">
                    <p>Sync with us:</p>
                    <a href="https://github.com/sgelernter">Sam</a>
                    <a href="https://github.com/stellalc7">Stella</a>
                    <a href="https://github.com/em-ng">Emily</a>
                </div>

                <div className="repo-link">
                    <a href="https://github.com/stellalc7/synthgarden"><FontAwesomeIcon icon={["fab", "github-alt"]} /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;