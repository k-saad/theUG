import React, { Component } from 'react';

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
                        buttons
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;