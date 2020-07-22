import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/formfield';


import { update, trimData, checkData } from '../utils/form/formActions';
import { registerUser } from '../../actions/user_actions';

class Register extends Component {

    state = {
        formError: false,
        formErrorMessage:'Form error, please check the values you inputted',
        formSuccess: false,
        formData: {
            email: {
                element:'input', //the type of input
                value: '', //the data
                config: {
                    name: 'email_input',
                    type: 'text',
                    placeholder: 'Enter your email address'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            name: {
                element:'input', //the type of input
                value: '', //the data
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name or title'
                },
                validation: {
                    required: true,
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
            },
            confirmPassword: {
                element:'input', //the type of input
                value: '', //the data
                config: {
                    name: 'confirm_password',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const updateFormData = update(element, this.state.formData,'register');
        console.log(element.event.target.value);
        this.setState({
            formData: updateFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        //gather and validate ze data
        const dataForSubmit = trimData(this.state.formData, 'register');
        const formValidStatus = checkData(this.state.formData, 'register');

        //to submit or not to submit..
        if(formValidStatus){
            this.setState({ formError: false})
            this.props.dispatch(registerUser(dataForSubmit)).then( response => {
                if(response.payload.success){
                    this.setState({ formError: false, formSuccess: true })
                    setTimeout(() => { this.props.history.push('/register_login')}, 3000);
                }
            })
        }else {
            this.setState({ formError:true })
            console.log('shiet');
        }

    }

    render(){
        return(
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => {this.onSubmit(event)}}>
                                <h2>Register here</h2>
                                <h3>personal info</h3>
                                <div className="form_block_two">
                                    <div className="block">
                                    <FormField 
                                        id={'name'}
                                        formdata={this.state.formData.name}
                                        change={(element)=>this.updateForm(element)}
                                    />
                                    </div>
                                </div>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField 
                                            id={'email'}
                                            formdata={this.state.formData.email}
                                            change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <h3>account information</h3>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField 
                                            id={'password'}
                                            formdata={this.state.formData.password}
                                            change={(element)=>this.updateForm(element)}
                                        />
                                        </div>
                                    <div className="block">
                                        <FormField 
                                            id={'confirmPassword'}
                                            formdata={this.state.formData.confirmPassword}
                                            change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                { this.state.formError ?
                                    <div className="error_label">
                                        {`${this.state.formErrorMessage}`}
                                    </div> 
                                    : null 
                                }    
                                <button onClick={(event)=>{this.submitForm(event) }}>continue</button>           
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Register);