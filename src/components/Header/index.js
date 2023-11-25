import { Link, Redirect } from "react-router-dom"
import { Component } from "react"
import Cookies from "js-cookie"
import { withRouter } from "react-router-dom"
import './index.css'
class Header extends Component{
    
    clickLogout=()=>{
      
        const{history}=this.props
       Cookies.remove('token')
       history.replace('/')
      
    }

    render(){
        return(
            <div className="headercontainer">
            <div className="headone">
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="weblogo" className="weblogo"/>
            </div>
            <div className="headtwo">
                <div className="li" ><Link to="/home" style={{color:"white",borderBottomStyle:'none'}}>Home</Link></div>
                
                <div className="li" ><Link to="/jobs" style={{color:"white"}}>Jobs</Link></div>
            </div>
            <button onClick={this.clickLogout} className="logbut">Logout</button>
        </div>
        )
    }
}
export default withRouter(Header)