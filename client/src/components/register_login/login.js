import React, { Component } from 'react';
import FormField from '../utils/formfield';

import { update, trimData, checkData } from '../utils/form/formActions';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { loginUser} from '../../actions/user_actions';

class Login extends Component {

    state = {
        formError: true,
        formSuccess: '',
        formData: {
            email: {
                element:'input', //the type of input
                value: '', //the data
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element:'input', //the type of input
                value: '', //the data
                config: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }

    }
    componentDidMount(){
        console.log('state at mount', this.state)
    }


    updateForm = (element) => {
        const updateFormData = update(element, this.state.formData,'login');
        this.setState({
            formError: false,
            formData: updateFormData
        })
        console.log(this.state);
    };

    submitForm = (event) => {
        event.preventDefault();

        const dataForSubmit = trimData(this.state.formData, 'login');

        const formValidStatus = checkData(this.state.formData, 'login');
        if(formValidStatus){
            this.setState({ formError: false })
            this.props.dispatch(loginUser(dataForSubmit));
            this.props.history.push('/user/dashboard');
        }else{
            this.setState({ formError: true })
        }
    };

    render(){
        return(
            <div className="signin_wrapper">
                <form onSubmit={(event) => {this.submitForm(event)}}>
                    <FormField 
                        id={'email'}
                        formdata={this.state.formData.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField 
                        id={'password'}
                        formdata={this.state.formData.password}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.state.formError ? <h4 style={{color: 'red'}}>form error</h4> : null} 
                    <button onClick={(event)=>{this.submitForm(event) }}>continue</button>           
                </form>
            </div>
        )
    }
}

export default connect()(withRouter(Login));