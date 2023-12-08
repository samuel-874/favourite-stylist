import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { OSTop } from "../stylist to order/OrderStylist.styles"
import { CDButton, CDHeading, CDInputs, CDTop, Hr, StyledClientDetails } from "./ClientDetails.styles"
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { setInfo } from "../../../redux/slices/InfoSlice";
import { startLoading, stopLoading } from "../../../redux/slices/LoadingSlice";

export const ClientDetails = () => {


  const navigate = useNavigate();
  const orderInfo = useAppSelector( state => state.orderInfo );
  const userInfo = useAppSelector( state => state.userInfo);
  const dispatch = useAppDispatch();
  const { REACT_APP_BURL:base_url, REACT_APP_FURL:file_url } = process.env;
  const token = localStorage.getItem("jwt");
  const [ service,setService] = useState({id:0,name:"",description:"",price:0,duration:""})
    const [ formData, updateFormData ] = useState({
        firstname: userInfo?.firstname,lastname: userInfo?.lastname,mobile:"",email: userInfo?.email
    });
    const [ formErrors, updateFormErrors ] = useState({
        firstnameError:"",lastnameError:"",mobileError:"",emailError:""
    });



    const setFormData = (e:React.ChangeEvent<HTMLInputElement>) => {
        updateFormData( oldData => {
            return{
                ...oldData,
                [e.target.name]:e.target.value,
            }
        })
    } 

    useEffect(()=>{ 

      window.scroll({
        top:0,
        behavior:"smooth"
      })
      

      if(orderInfo.stylist?.id > 0){

        setService(orderInfo.service);

      }else{

        navigate("/bookings")
      }

      

    },[])

    const anyError = () => {

      const errors = {firstnameError:"",lastnameError:"",mobileError:"",emailError:""};
      const { firstname, lastname, email,mobile} = formData;

      if(firstname?.trim()?.length < 1){
          errors.firstnameError = "Firstname is required"
      }
      
      if(lastname?.trim()?.length < 1){
          errors.lastnameError = "Lastname is required"
      }
      if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          errors.emailError = "Email is required"
      }
      if(mobile?.trim()?.length < 11 || mobile?.trim()?.length > 13 ){
          errors.mobileError = "Mobile is required"
      }

      updateFormErrors({...errors})
      return Object.values(errors).some( error => error !== "");
    }


    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
      const { scheduledDate,stylist,userRole } = orderInfo;       
      const { firstname, lastname, email,mobile} = formData;
      if(anyError() === false){
        
           const data ={ serviceId:service.id,stylistId:stylist?.id,
                    scheduledDate:scheduledDate,firstname:firstname,
                    lastname:lastname,email:email,mobile:mobile,role:userRole};
                    
          dispatch(startLoading())
     
          axios({
            method:"POST",
            url:`${base_url}/auth/users/order`,
            headers:{Authorization:`Bearer ${token}`},
            data:data,
          }).then( response => {
              const data = response.data?.data
            navigate(`/bookings/checkout/${data?.id}`)
          }).catch( error => {

            dispatch(stopLoading())
            dispatch(setInfo({
              isError:true,
              showInfo:true,
              heading:`Error`,
              message:"An error occured while trying to make you order",
              buttonText:"Try Again",
              url:"/bookings"
          }))
              console.log(error);
              
          })
     
                  }
     
   
 
           
   

    }

    

    return (
        <div>

     <OSTop>
        <h1>{service?.name}</h1>
        <h3>{`${service?.duration} @ $${service?.price}`}</h3>
        <p>{service?.description}</p>
     </OSTop>
     <StyledClientDetails>
        <CDTop>
          <h3>Appointment Information</h3>
          <p>Edit Appointment Information</p>
        </CDTop>
        <CDInputs>
          <span><p>Stylist</p><input type="text" readOnly value={orderInfo.stylist?.name} /></span>
          <span><p>Location</p><input type="text" readOnly value={orderInfo?.stylist?.location} /></span>
          <span><p>Appointment Date</p><input type="text" readOnly value={moment(orderInfo.scheduledDate).format("D MMMM ")} /></span>
          <span><p>Appointment Time</p><input type="text" readOnly value={moment(orderInfo.scheduledDate).format("hh:ss a")} /></span>
        </CDInputs>
        
        <Hr />

        <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
            <CDHeading>Clients’ Information</CDHeading>
          <CDInputs>
            <span>
              <p>First Name</p>
              <input name="firstname" value={formData.firstname} onChange={setFormData} type="text" />
             { formErrors.firstnameError && <data>{formErrors.firstnameError}</data>}
            </span>
            <span>
              <p>Last Name</p>
              <input  name="lastname" value={formData.lastname} onChange={setFormData}  type="text" />
              { formErrors.lastnameError && <data>{formErrors.lastnameError}</data>}
            </span>
            <span>
              <p>Phone Number</p>
              <input name="mobile" value={formData.mobile} onChange={setFormData}  type="text" />
              { formErrors.mobileError && <data>{formErrors.mobileError}</data>}
            </span>
            <span>
              <p>Email Address</p>
              <input name="email" value={formData.email} onChange={setFormData}  type="text" />
              { formErrors.emailError && <data>{formErrors.emailError}</data>}
            </span>
          </CDInputs>
           <CDButton type="submit">Proceed</CDButton>
        </form>
     </StyledClientDetails>
        </div>
    )
}