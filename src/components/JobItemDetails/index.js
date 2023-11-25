import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import Header from '../Header'
import Similarjobs from '../Similarjobs'
import './index.css'
class JobItemDetails extends Component{
    state={
        isLoading:true,
        list1:[],
      
    }
    componentDidMount=()=>{
        this.getJObsDescription()
    }

    getJObsDescription=async ()=>{
        //.setState({isLoading:false})
      
        const token=Cookies.get('token')
        const{match}=this.props
        const{params}=match
        const{id}=params
        //console.log(id)
        const url=`https://apis.ccbp.in/jobs/${id}`
        const options={
            headers:{
                Authorization:`Bearer ${token}`
            },
            method:'GET'
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok===true)
        {
            this.setState({isLoading:false})
        
        const updateddata={
            jobDetails:{
                companyLogo:data.job_details.company_logo_url,
                companyWebsite:data.job_details.company_website_url,
                employmentType:data.job_details.employment_type,
                description:data.job_details.job_description,
                title:data.job_details.title,
            
            skills:data.job_details.skills.map((each)=>({
                imageurl:each.image_url,
                name:each.name
            })),
            lifeAtCompany:{
                describe:data.job_details.life_at_company.description,
                imagi:data.job_details.life_at_company.image_url
            },
            location:data.job_details.location,
            pack:data.job_details.package_per_annum,
            rating:data.job_details.rating,
            similarJobs:data.similar_jobs.map((each)=>({
                companyLogo:each.company_logo_url,
                employmentType:each.employment_type,
                description:each.job_description,
                location:each.location,
                rating:each.rating,
                title:each.title
            })),
        },
      
        }

        this.setState({
            list1:updateddata
        })
        }
        else{
            console.log('fail')
        }
    }
    getDetails=()=>{
        const{list1}=this.state
                    
        const{jobDetails}=list1
        const{lifeAtCompany}=jobDetails
        const{skills}=jobDetails
        const{similarJobs}=jobDetails
         
        const{describe,imagi}=lifeAtCompany     
        const{companyLogo,title,companyWebsite,description,employmentType,rating,location}=jobDetails
       
       
        return(
            <div className="con">
                <Header/>
            <div className="maincontainer">
                <div className="container1">
                    <div className="innercontainer">
                        <div className="logocon">
                            <img src={companyLogo} alt="logo" className="logo"/>
                            <div className="log1">
                                <h1 style={{color:"white"}}>{title}</h1>
                                <div className="rat">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1vpRJxxU53MUVYFP3yUB9zV7JLmreSmQNQ&usqp=CAU" className="star" alt="star"/>
                                    <p style={{color:"white"}}>{rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className="locatione">
                        <div className="loc">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_lyMfnL4YqRAIDLeeyjNlPCD0NQ2zrdk9ug&usqp=CAU" className="loc" alt="location"/>
                            <p style={{color:"white"}}>{location}</p>
                        </div>
                        <div className="location">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO8RJIW7Ua5tuORmXRi_mhi6BV6kh-6M0ag&usqp=CAU" className="loc" alt="location"/>
                            <p style={{color:"white"}}>{employmentType}</p>
                        </div>
                        </div>
                        <hr/>
                        <div className="des">
                        <h1 style={{color:"white"}}>Description:</h1>
                        <a href={companyWebsite}>Visit</a>
                        </div>
                        <p style={{color:"grey"}}>{description}</p>
                        <h1 style={{color:"white"}}>Skills:</h1>
                        <div className="skillcontainer">
                            {skills.map((each)=>(
                                <div className="skill">
                                 <img src={each.imageurl} className="ima" alt="imagi"/>
                                 <h2 style={{color:"grey",marginLeft:"20px"}}>{each.name}</h2>
                                </div>
                            ))}
                        </div>
                        <h1 style={{color:"white"}}>Life at Company</h1>
                        <div className="life">
                            <p style={{color:"grey"}}>{describe}</p>
                            <img src={imagi} className="im" alt="life"/>
                        </div>
                    </div>
                </div>
                <h1 style={{color:"white",marginLeft:"200px"}}>Similar Jobs</h1>
                <div className="container2">
                          
                        {similarJobs.map((each)=>(
                            <Similarjobs each={each}/>
                        ))}
                </div>
            </div>
        </div>
        )        
    }
    render(){
        const{list1,isLoading}=this.state
        
       //console.log(list1)
        //console.log(list1.similarJobs)
        return(
            <>
            {isLoading?<Loader type="ThreeDots" color="#0b0bb0" height={50} width={50}/>:
               this.getDetails()
            }</>
        )
    }
}
export default JobItemDetails