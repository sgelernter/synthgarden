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
                    <p><a href="https://github.com/sgelernter">Sam</a></p>
                    <p><a href="https://github.com/stellalc7">Stella</a></p>
                    <p><a href="https://github.com/em-ng">Emily</a></p>
                </div>

                <div className="repo-link">
                    <a href="https://github.com/stellalc7/synthgarden">
                        <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;