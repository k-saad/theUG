import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/user_actions';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedComponent, reload, isAdmin = null) {

    class AuthenticationCheck extends Component {   
        state = {
            loading: true
        };

        componentDidMount(){
            console.log('auth at mount');
            this.props.dispatch(authenticateUser()).then((response) => {
                const user = this.props.user.userData;
                console.log('user is',user);
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login');
                    }
                    this.setState({loading:false})
                }else{
                    if(!reload){
                        this.props.history.push('/dashboard');
                    }
                    console.log(user);
                    this.setState({loading: false})
                }
            });
        }
        
        render(){
            if(this.state.loading){
                return (
                    <div className="main_loader">
                        <CircularProgress style={{ color:'#2196F3'}} thickness={7} />
                    </div>
                )
            }else {
                return (
                    <ComposedComponent {...this.props} user={this.props.user}/>
                );
            }

        }
    }

    function mapStateToProps(state){
        return {
            user:state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}