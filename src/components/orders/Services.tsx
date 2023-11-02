import {  Distance, GoogleCalender, Mobile, OutLookCalender, Zoom } from "../../react-icons/Icons"
import { ShortBed } from "../details/stylist/Stylist.styles"
import { Buttons,  SCText, ServiceRec, StyledOrders, StyledServices } from "./Orders.styles";
import {  useEffect, useState } from "react";
import axios from "axios";
import { OrderRole, Service } from "../../types/appTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {  updateOrderInfo } from "../../redux/slices/BookingSlice";
import { useNavigate } from "react-router-dom";
import { startLoading } from "../../redux/slices/LoadingSlice";
import { ServiceSkeleton } from "../../general/AppSkeletonLoaders";

export const Services = ({updateShow,role,setRole}:{updateShow:Function,role:OrderRole,setRole:Function}) =>{

    const { REACT_APP_BURL:base_url,REACT_APP_FURL:file_url} = process.env;
    const token = localStorage.getItem("jwt");
    const [ offeredServices, setOfferedServices ] = useState<Service[]>();
    const navigate = useNavigate();
    const [ selectedService, setSelectedService ] = useState(0);
    const dispatch = useAppDispatch();
    const info = useAppSelector( state => state.orderInfo);

    
    
    useEffect(()=>{

        axios({
            url:`${base_url}/auth/users/services`,
            headers:{Authorization:`Bearer ${token}`}
        }).then( response => {
            setOfferedServices(response?.data?.data);
            
        }).catch( error => {


        })
  

    },[])

    const handleSave = () => {
        if(selectedService > 0){
            dispatch(startLoading())
            offeredServices?.forEach( currentService => {
                if(currentService?.id === selectedService){
                    dispatch(updateOrderInfo({
                         ...info,
                         userRole:role,
                         service:currentService,
                    }))
                }
            })
            navigate("select-stylist")
        }
    }

    

    return (
        <div>
            <ShortBed onClick={()=>{
                updateShow()
                setRole(OrderRole.INTERMEDIARY)
                }} />
            <StyledServices className="no-scrollbar">

           { offeredServices !== undefined ? 
            <>{ 
                Array.isArray(offeredServices) ? 
                <div>
                    {
                offeredServices.filter( service => service?.price < 90).map( service => 
                    <div key={service.id}>
                 <ServiceRec isselected={selectedService === service.id ? "yes" : "no"} onClick={()=>setSelectedService(service.id)}>
                    <img src={`${file_url}?name=${service?.image}`} />
                    <div>
                      <span><p>{service?.name}</p><h4>{`$${service?.price}`}</h4></span>
                      <data>{service?.duration}</data>
                      <h4>{service?.description}</h4>
                    </div>
    
                </ServiceRec>
                    <hr />
                </div>
                    )}
                 <SCText>book a service to help you with your Clients hair</SCText>
    
                 {   offeredServices.filter( service => service?.price >= 90).map( (service,i) => 
                    <div key={i}>
                        <ServiceRec  isselected={selectedService === service.id ? "yes" : "no"} onClick={()=>setSelectedService(service.id)}>
                           <img src={`${file_url}?name=${service?.image}`} />
                           <div>
                             <span><p>{service?.name}</p><h4>{`$${service?.price}`}</h4></span>
                             <data>{service?.duration}</data>
                             <h4>{service?.description}</h4>
                           </div>
                       </ServiceRec>
                           <hr />
                       </div>)
                }</div>
                : <p>No service available</p>
                }
    
               
                <Buttons style={{padding:"10px 40px"}}>
                  <span style={{width:"150px"}} onClick={()=>{
                    updateShow()
                    setRole(OrderRole.CUSTOMER)
                    }}>Back</span>
                    <div style={{width:"150px",opacity: selectedService > 0 ? "1" : "0.5",cursor:selectedService > 0 ? "pointer" : "not-allowed"}} onClick={handleSave} >Proceed</div>
                </Buttons>
           </>
           : <ServiceSkeleton />}

        </StyledServices>
        </div>
    )
}