import React from 'react';
import { Link } from 'react-router-dom';


const links = [
    {
        name: 'My account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User information',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My cart',
        linkTo: '/user/cart'
    }
];

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((link, i) => (
            <Link to={link.linkTo} key={i}>
                {link.name}
            </Link>
        ))
    );

    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My Account</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                </div>
                <div className="user_right">
                    <div>{props.children}</div>
                </div>
            </div>
        </div>    
    );
};

export default UserLayout;