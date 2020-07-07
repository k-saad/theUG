import React from 'react';

import PButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>new customers</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                            sheets containing Lorem Ipsum passages, and more recently with desktop 
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <PButton type="default" 
                        title="Create an Account" 
                        linkTo="/register" 
                        addStyles={{margin:'10px 0 0 0'}} 
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account, login here</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin;