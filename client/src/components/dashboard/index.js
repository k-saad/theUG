import React, { Component } from 'react';
import UserLayout from '../hoc/user';
import PButton from '../utils/button';

class DashBoard extends Component {
    render(){
        return (
            <UserLayout>
                <div>
                    <div className="user_nfo_panel">
                        <h1>User Information</h1>
                        <div>
                            <span>name</span>
                            <span>lastname</span>
                            <span>email</span>
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
                        </div>
                    </div>
                </div>
            </UserLayout>
        )
    }
}

export default DashBoard;