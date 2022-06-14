
import './Register.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { emailValidation, passwordValidation } from '../Validation';
import { Component } from 'react';
import { render } from '@testing-library/react';
import { Link, withRouter} from 'react-router-dom';

class Register extends Component {

    //const navigate = useNavigate();

    //const[getForm,setForm]=useState({
    constructor(props) {
        super(props);
        this.state = {
            getForm: {

                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            getValidation: {
                email: '',
                password:''

    }
        }
    }


    onChangeHandler = (event) => {
        this.setState({
            getForm: {
                ...this.state.getForm,
                [event.target.name]: event.target.value
            }
        })
    }


    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({
            getValidation: {
                email: !emailValidation(this.state.getForm.email) ? "please provide email" : '',
                password: !passwordValidation(this.state.getForm.password) ? "Please provide the password" : ''
            }
        });

        if (emailValidation(this.state.getForm.email) && passwordValidation(this.state.getForm.password)) {
            alert("success");

            let email = sessionStorage.getItem('email');
            let password = sessionStorage.getItem('password');
            if (email === this.state.getForm.email && password === this.state.getForm.password) {
                document.location.href="/login";
            }
            else {
                this.setState({
                    getValidation: {
                        email: 'no match found',
                        password: 'no match found'
                    }
                });
            }

        }
    }

        render(){
            return (<div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">

                        </div>
                        <div className="col-4">
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" onChange={this.onChangeHandler} className="form-control" id="firstName" name="firstName" placeholder="Enter first name" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" onChange={this.onChangeHandler} className="form-control" id="lastName" name="lastName" placeholder="Enter last name" />
                                </div>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" onChange={this.onChangeHandler} className="form-control" id="email" name="email" placeholder="Enter email" />
                                    {this.state.getValidation.email && <div className="alert alert-danger" role="alert">
                                        {this.state.getValidation.email}
                                    </div>}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" onChange={this.onChangeHandler} name="password" className="form-control" id="password" placeholder="Password" />

                                    {this.state.getValidation.password && <div className="alert alert-danger" role="alert">
                                        {this.state.getValidation.password}
                                    </div>}
                                </div>

                                <button onClick={this.onSubmitHandler} type="submit" className="btn btn-success">Submit</button>
                            </form>

                        </div>
                        <div className="col-4">

                        </div>
                    </div>

                </div>
            </div>)

        }
    }

export default Register;
// export default withRouter(Login);

