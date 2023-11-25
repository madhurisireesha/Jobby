import Header from "../Header"
import { withRouter } from "react-router-dom"
import './index.css'
const Home=(props)=>{
    const findJobs=()=>{
        const{history}=props
        history.push('/jobs')
    }
    return(
        <div className="homecontainer">
            <Header/>
            <div className="homeone">
                <div className="hometwo">
                    <h1 style={{color:"white",fontStyle: 'italic'}} >Find the jobs that fits your life.</h1>
                    <h3 >Millions of people are searching for jobs,salary of jobs,company reviews,Find the jobs that lets your ability and potential.</h3>
                    <button onClick={findJobs} className="findjobs">Find Jobs</button>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Home) 