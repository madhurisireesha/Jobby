import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import Jobdescription from "../../Jobdescription";
class JobItemDetails extends Component{
    state={
        isLoading:true,
        list1:[],
        list2:[],
    }
    componentDidMount=()=>{
        this.getJObsDescription()
    }
    getJObsDescription=async ()=>{
        this.setState({isLoading:false})
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
        if(response.ok===true)
        {
        const data=await response.json()
        const updateddata={
            jobDetails:{
                companyLogo:data.job_details.company_logo_url,
                companywebsite:data.job_details.company_website_url,
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
       const{companyLogo}=jobDetails
       //const{companyLogo}=getDetails
       
        return(
            <div className="detailscontainer">
                <div className="one">
                   {/* <img src={companyLogo} alt="company" className="com"/>  */}
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