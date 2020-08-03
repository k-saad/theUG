import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../hoc/user';
import PButton from '../utils/button';

class DashBoard extends Component {
    render(){
        return (
            <UserLayout>
                <div>
                    <div className="user_nfo_panel">
                        {console.log(this.props)}
                        <h1>User Information</h1>
                        <div>
                            <span>{this.props.user.userData.name}</span>
                            <span>{this.props.user.userData.email}</span>
                        </div>
                        <PButton 
                            type="default" 
                            title="edit account information" 
                            linkTo="/user/user_profile" 
                        />
                    </div>
                    <div className="user_nfo_panel">
                        <h1>History</h1>
                        <div className="user_product_block_wrapper">
                        <span>product</span>
                        <Link to={'/'}>home</Link>
                        </div>
                    </div>
                </div>
            </UserLayout>
        )
    }
}

export default DashBoard;