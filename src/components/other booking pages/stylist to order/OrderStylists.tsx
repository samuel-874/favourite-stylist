import axios from "axios"
import { CalenderSvg, LocationIcon } from "../../../react-icons/Icons"
import { Service, StylistCredentials } from "../../../types/appTypes"
import { StyledTop } from "../../bookings/Bookins.styles"
import { BarSection, CardSection, Greating, SearchBar } from "../../home/Home.styles"
import { StylistCard } from "../../stylist card/StylistCard"
import { OSBottom, OSButton, OSInput, OSInputs, OSParagraph, OSStylistSection, OSTop, OrderStylistStyled, ServiceCard } from "./OrderStylist.styles"
import { useState, useEffect } from "react";
import { Calender } from "../calender/Calender"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks"
import { useNavigate } from "react-router-dom"
import { updateOrderInfo } from "../../../redux/slices/BookingSlice"

export const OrderStylists = () => {

  const [ requestedStylist, updateRequestStylist ] = useState<StylistCredentials[]>();
  const [ paginationData, setPaginationData ] = useState({
    pageNumber:0,pageSize:0,totalItems:0,totalPages:0
  });
  const [ selectedStylist , updateSelected ] = useState({
    id:0,name:"",location:"",mobile:""
  })
  const orderInfo = useAppSelector( state => state.orderInfo);
  const dispatch = useAppDispatch();
  const [ showCalender, toggleCalender ] = useState(false);
  const base_url = process.env.REACT_APP_BURL;
  const token = localStorage.getItem("jwt");
  const [ otherServices,setOtherServices ] = useState<Service[]>()
  const navigate = useNavigate();


  useEffect(()=>{
    const location = "lagos";

    if(orderInfo?.service?.id >0){
      
         axios({
          url:`${base_url}/auth/users/find`,
          params:{location:location,size:6},
          headers:{Authorization:`Bearer ${token}`}
        }).then( response => {
            const data = response?.data            
            setPaginationData({pageNumber:data?.pageNumber + 1,pageSize:data?.pageSize,totalItems:data?.totalItems,totalPages:data?.totalPages})
            updateRequestStylist(data?.data)
            
        }).then(()=>{
          axios({
            url:`${base_url}/auth/users/services`,
            headers:{Authorization:`Bearer ${token}`}
        }).then( response => {
          const data:Service[] = response?.data?.data
          const services = data.filter( service => {
            return service?.id !== orderInfo.service.id
          })
            setOtherServices(services);
        }).catch( error => {
          setOtherServices([]);
        })
        }).catch( error => {
          // updateRequestStylist([])
        })

        // if(orderInfo?.stylist?.id > 0){
        //   toggleCalender(true)
        // }

    }else{
      navigate("/bookings")
      
    }
    },[])

    const handleProceed = () => {
      
      dispatch(updateOrderInfo({
        ...orderInfo,
        stylist:selectedStylist
      }))
      if(selectedStylist.id > 0){
        toggleCalender(true)
      }
    }


    return (
        <div>
           <OSTop>
              <h1>{orderInfo?.service?.name}</h1>
              <h3>{`${orderInfo?.service?.duration} @ $${orderInfo?.service?.price}`}</h3>
              <p>Work with a master stylist to learn how to do your hair from the comfort of your home</p>
           </OSTop>
           <OrderStylistStyled>
            <OSInputs>
            <div>
              <p>Timezone</p>
              <OSInput >
                 <input 
                   type="text" 
                   name="stylist_search" 
                   placeholder="Select Timezone"
                 />
                 <button type="submit">
                   <LocationIcon />
                 </button>           
              </OSInput>
            </div>
            <div>
                <p>Appointment Date</p>
              <OSInput >
                 <input 
                   type="text" 
                   name="stylist_search" 
                   placeholder="Select Date"
                 />
                <CalenderSvg />
                          
              </OSInput>
              
            </div>
            </OSInputs>
            <OSStylistSection>
              <h2>Available Stylist</h2>
              <CardSection style={{padding:"20px 0"}}  >
                { requestedStylist ?

              (  requestedStylist.length > 0 ?
                 requestedStylist.map( stylist => 
                <div key={stylist?.id}  onClick={()=>updateSelected({
                  id:stylist?.id||0,name:`${stylist?.firstname} ${stylist?.lastname}`,location:stylist?.location,mobile:stylist?.mobile
                })}>
                      <StylistCard 
                  isSelected={selectedStylist?.id === stylist?.id}
                  
                    props={stylist} 
                    // layout={filter?.itemsFilter.display}
                  /></div>
              )
              : "No stylists"
              )
              : "Loading..."
                  } 
            </CardSection>
            </OSStylistSection>
            <OSButton style={{opacity: selectedStylist.id > 0 ? 1 : 0.5,cursor:selectedStylist.id > 0 ? "pointer" : "not-allowed"}} onClick={handleProceed} >Proceed</OSButton>
            <OSParagraph>Other Services</OSParagraph>
              <OSBottom>
                  { otherServices 
                  ? Array.isArray(otherServices) && otherServices?.length > 0?
                  otherServices.map( service =>
                  <ServiceCard key={service?.id}>
                  <h3>{service.name}</h3>
                  <h4>{`${service?.duration} @ $${service?.price}`}</h4>
                  <p>{service?.description}</p>
                </ServiceCard>)
                :<p>could not load services</p> 
                :<p>loading...</p>}
              </OSBottom>
           </OrderStylistStyled>
          { showCalender && <Calender updateShow={toggleCalender} />}
        </div>
    )
}