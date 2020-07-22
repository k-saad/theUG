import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Header extends Component {
    render() {
        return (
            <header className="bck_b_dark">
                <div className="container">
                    <div className="left">
                        <div className="logo"><h5>The Underground</h5></div>
                    </div>
                    <div className="right">
                        <div className="top">
                            Search
                        </div>
                        <div className="bottom">  
                            <Button color="white">Home</Button>
                            <Button color="primary">Login</Button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;