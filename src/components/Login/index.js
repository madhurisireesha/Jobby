import { Component } from "react";
import Cookies from "js-cookie";
import './index.css'
class Login extends Component{
    state={
        error:'',
        username:'',
        password:'',
        showErrorMsg:false
    }
    onChangeUserName=(event)=>{
        this.setState({
            username:event.target.value
        })
    }
    onChangePassword=(event)=>{
        
        this.setState({
            password:event.target.value
        })
    }
    submitForm=async(event)=>{
        event.preventDefault()
        const{username,password}=this.state
        const userdetails={username,password}
        const url="https://apis.ccbp.in/login"
        const options={
            method:'POST',
            body:JSON.stringify(userdetails)
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok===true)
        {
            this.onSubmitSuccess(data.jwt_token)
        }
        else{
            this.onSubmitFailure(data.error_msg)
        }

    }
    onSubmitSuccess=(msg)=>{
        const{history}=this.props
        Cookies.set('token',msg,{expires:10})
        history.replace('/home')
    }
    onSubmitFailure=(msg)=>{
        this.setState({
            error:msg,
            showErrorMsg:true
        })
    }
    render(){
        const{showErrorMsg,error}=this.state
        return(
            <div className="logincontainer">
                <form className="formcontainer" onSubmit={this.submitForm}>
                    <div>
                        <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="weblogo" className="weblogo"/>
                        
                    </div>
                    <div>
                        <label htmlFor="username" style={{color:"white"}}>Username</label><br/>
                        <input type="text" id="username" onChange={this.onChangeUserName}/>
                    </div>
                    <div>
                        <label htmlFor="password" style={{color:"white"}}>Password</label><br/>
                        <input type="password" id="password" onChange={this.onChangePassword}/>
                    </div><br/>
                    <button type="submit" className="login">Login</button>
                    {showErrorMsg&&<p  style={{color:"red"}}>*{error}</p>}
                </form>
            </div>
        )
    }
}
export default Login