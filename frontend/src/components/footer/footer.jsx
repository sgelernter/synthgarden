import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import '../../assets/stylesheets/footer.scss'

library.add(fab)

const Footer = () => {
    return(
        <footer>
            <div className="footer-box">
                <div className="peeps">
                    <p>Sync with us:</p>
                    <p><a href="https://www.linkedin.com/in/sam-gelernter/" target="_blank">Sam G.</a></p>
                    <p><a href="https://www.linkedin.com/in/stella-c-383742211/" target="_blank">Stella C.</a></p>
                    <p><a href="https://www.linkedin.com/in/em-ng/" target="_blank">Emily N.</a></p>
                </div>

                <div className="repo-link">
                    <a href="https://github.com/stellalc7/synthgarden" target="_blank">
                        <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;