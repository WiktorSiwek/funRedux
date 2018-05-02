import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import '../../styles/styles.css';

const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activateClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/about" activateClassName="activate">About</Link>
        </nav>
    );
};

export default Header;