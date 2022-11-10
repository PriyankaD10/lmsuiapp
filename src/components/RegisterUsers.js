import React from "react";
import { isEmpty, trim } from 'lodash';
import { withRouter } from "../withRouter";
import UserService from '../services/UserService';

class RegisterUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            user: {
                username: '',
                email: '',
                password: ''
            },
            userInfo: {},
            errorMsgs: {
                userNameMsg: '',
                emailMsg: '',
                passwordMsg: ''
            },
            errorList: []
        }
    }
    setFieldValue = (e) => {
            let user = this.state.user;
            let errorList = this.state.errorList;
            let fieldName = e.target.id;
            let fieldValue = trim(e.target.value);
            user[fieldName] = fieldValue;
            this.setState({ user: user })
    }

    isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    validate = () => {
        let isValid = true
        let user = this.state.user;
        let errorMsgs = this.state.errorMsgs;
        Object.keys(errorMsgs).some((key) =>{
           if(!isEmpty(errorMsgs[key])){
            isValid=false;
                return true;
           }else{
               return false;
           }
        })
        if (isValid) {
            this.submitForm(user);
        }
        else {
            alert("Please enter correct values to register");
        }
    }

    /* submitForm = async (userInfo) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo)
        };
        await fetch('http://localhost:9013/users/register', requestOptions)
            .then((response) => response.json())
            .then((data) => {

                console.log(">>>data>>>>" + data)
                if (data != null) {
                    alert("You are successfully registered!");
                    this.setState({ errorList: [] })
                } else {
                    alert("Registration is unsuccessful, please try again");
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    } */

    submitForm = (userInfo) => {
        try{
        UserService.registerUser(userInfo).then((res) => {
            let data = res.data;
            if (data != null) {
                alert("You are successfully registered!");
            }else {
                alert("Registration is unsuccessful, please try again");
            }
        })
        }
        catch(err){
            console.log(err.message);
        }
    }

    errorList = () => {
        let errors = this.state.errorList;
        const listItems = errors.map((d, i) => <li className="error" key={i}>{d}</li>);
        return (
            <div>
                {listItems}
            </div>
        )
    }

    resetFieldValue = () => {
        let user = this.state.user;
        //let course = this.state.course;
        user.username = '';
        user.email = '';
        user.password = '';
        

        let errorMsgs = this.state.errorMsgs;
        errorMsgs.userNameMsg = '';
        errorMsgs.emailMsg = '';
        errorMsgs.passwordMsg = '';

         this.setState({
           user: user,
           errorMsgs:errorMsgs
         });  
    }

    navigateBack = () => {
        this.props.navigate("/");
    }
    renderForm = () => {
        let showErrorMessages = false;
        let errorList = this.state.errorList;
        if (errorList.length > 0) {
            showErrorMessages = true;
        }
        return (
            <div className="container" style={{ textAlign: "justify", background: "white" }}>
                <div className="title">Register new users</div>
                <div style={{ textAlign: "justify" }}>
                    <div className="row" style={{ paddingLeft: "3%", paddingBottom: "3%", textAlign: "justify" }}>
                        <label>Username </label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" value={this.state.user.username} onChange={(e) => this.setFieldValue(e)} onBlur={this.validateFieldValue} />
                        {this.state.errorMsgs.userNameMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.userNameMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingLeft: "3%", paddingBottom: "3%", textAlign: "justify" }}>
                        <label>Email </label>
                        <input type="text" id="email" name="email" placeholder="Enter your email" value={this.state.user.email} onChange={(e) => this.setFieldValue(e)} onBlur={this.validateFieldValue}/>
                        {this.state.errorMsgs.emailMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.emailMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingLeft: "3%", paddingBottom: "3%", textAlign: "justify" }}>
                        <label>Password </label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={this.state.user.password} onChange={(e) => this.setFieldValue(e)} onBlur={this.validateFieldValue}/>
                        {this.state.errorMsgs.passwordMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.passwordMsg}</span> : null}
                    </div>
                    <div className="row" style={{ margin: "2%" }}>
                        <button className="primaryBtn" style={{ display: "inline-block" }}
                            onClick={(e) => this.validate()} >Register</button>
                        <button className="primaryBtn" style={{ display: "inline", marginLeft: "2%" }} onClick={(e) => this.resetFieldValue()} type="reset" >Reset</button>
                        <button className="primaryBtn" style={{ display: "inline", marginLeft: "2%" }} onClick={(e) => this.navigateBack()} type="button" >Back</button>
                    </div>
                </div>
                {showErrorMessages && this.errorList()}
            </div>);
    }

    validateFieldValue = (e) =>{
        let isValid = true;
        let fieldValue = trim(e.target.value);
        let errorMsgs = this.state.errorMsgs;
        if (e.target.name === "username") {
            if (isEmpty(fieldValue)) {
                errorMsgs.userNameMsg = 'Please enter username.';
                isValid = false;
            }
            else {
                UserService.isUsernameExists(fieldValue).then((res) => {
                    let data = res.data;
                    if (res.data === true) {
                        errorMsgs.userNameMsg = 'Username already exists';
                        isValid = false;
                    }
                })
            }
            if (isValid) {
                errorMsgs.userNameMsg = '';
            }
        }
        if (e.target.name === "email") {
            if (isEmpty(fieldValue)) {
                errorMsgs.emailMsg = 'Please enter email.';
                isValid = false;
            } else if (!this.isValidEmail(fieldValue)) {
                errorMsgs.emailMsg = 'Email is not valid, must contain @ and .com.'
                isValid = false;
            }
            if (isValid) {
                errorMsgs.emailMsg = '';
            }
        }
        if (e.target.name === "password") {
            let passwordRegEx = /^[0-9a-zA-Z]+$/;
            if (isEmpty(fieldValue)) {
                errorMsgs.passwordMsg = 'Please enter password.';
                isValid = false;
            } else if (!fieldValue.match(passwordRegEx)) {
                errorMsgs.passwordMsg = 'Password should be alphanumeric';
                isValid = false;
            }
            if (isValid) {
                errorMsgs.passwordMsg = '';
            }
        }
        this.setState({errorMsgs:errorMsgs})
    }
    render() {
        return (
            <div style={{ width: "100%" }}>
                {this.renderForm()}
            </div>
        );
    }
}
export default withRouter(RegisterUsers);