import {  Distance, GoogleCalender, Mobile, OutLookCalender, Zoom } from "../../react-icons/Icons"
import { ShortBed } from "../details/stylist/Stylist.styles"
import { BCStatus, Buttons, MeetingLink, OCSec1, OCSect2, OCSect4, OCSect5, OCTop, StyledOrders } from "./Orders.styles";
import profile from "../../assets/test-profile.svg";
import apple from "../../assets/apple.svg";
import { OrderContext } from "../bookings/Bookings";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { OrderDetail } from "../../types/appTypes";
import { addNotes, formatMobile } from "../../general/service";
import { OrderSkeleton } from "../../general/AppSkeletonLoaders";


export const Orders = () =>{

    const { REACT_APP_BURL:base_url,REACT_APP_FURL:file_url} = process.env;
    const token = localStorage.getItem("jwt");
    const [ order, setOrder ] = useState<OrderDetail>();
    const orderContext= useContext(OrderContext);
    const [ note, updateNote ] = useState("");

    
    
    useEffect(()=>{
        const orderId = orderContext?.stagedOrder?.orderId || 0;

        axios({
            url:`${base_url}/auth/users/order`,
            params:{id:orderId},
            headers:{Authorization: `Bearer ${token}`}
        }).then( response =>{
            const data = response?.data            
            setOrder(data?.data)
                        
        }).catch( error => {

        })

    },[])
    const status = order?.status === "CANCELLED" ? "Cancelled" : ( order?.status ===  "PROCESSING" ? "In progress" :( order?.status ===  "COMPLETED" ? "Completed" :( order?.isPaid === false ? "Un paid" : "Upcoming") ));
    const color = order?.status === "CANCELLED" ? "#DF0000" :  ( order?.status ===  "PROCESSING" ? "#518EF8" :( order?.status ===  "COMPLETED" ? "#28B446" :(order?.isPaid === false ? "orange" : "#FBBB00" )));

    

    return (
        <div>
            <ShortBed onClick={()=>orderContext?.setStagedOrder({show:false,orderId:0})} />
            <StyledOrders className="no-scrollbar">
                {
                    order !== undefined ?
               <> <OCTop>
                  <p>{order?.service}</p>
                  <a>Booking prep</a>
               </OCTop>
               <OCSec1>
                    <img src={`${file_url}?name=${order?.stylistPic}`} />
                    <div>
                        <p>{order?.stylist}</p>
                        <span><Distance /><h4>{`${order?.location}`}</h4></span>
                        <span><Mobile /><h4>{ formatMobile(order?.mobile||"")}</h4></span>
                    </div>
               </OCSec1>
                <hr />
                <OCSect2>
                    <div><span>Date: </span><p>{`${moment(order?.date).format("MMM YYYY DD mm:ssa")}`}</p></div>
                    <div><span>Status: </span> <BCStatus color={color}> <span></span><h4>{status}</h4></BCStatus></div>
                    <div><span>Price: </span><h5>{`$${order?.price}`}</h5></div>
                </OCSect2>
                <hr />
            { order?.meetingLink &&
                <MeetingLink onClick={()=> order?.meetingLink && window.open(order?.meetingLink)}>
                    <Zoom />
                    <span>Zoom Link : </span>
                    <p >{order?.meetingLink}</p>
                </MeetingLink>}
               
                <OCSect4>
                   <p>Add to calendar:</p>
                   <div>
                      <span>
                         <GoogleCalender />
                         <p>Google</p>
                      </span>
                      <span>
                          <img src={apple} />
                          <p>Apple</p>
                      </span>
                      <span>
                        <OutLookCalender />
                        <p>Outlook</p>
                      </span>
                   </div>
                </OCSect4>
                 <OCSect5>
                    <p>Extra notes</p>
                    <textarea value={note} onChange={(e)=>updateNote(e.target.value)} placeholder="Type here" />
                </OCSect5> 
                <Buttons>
                    <div onClick={()=>{
                         addNotes(order?.id,note);
                         updateNote("")
                         }}>Save</div>
                    <span onClick={()=>{
                        updateNote("");
                        orderContext?.setStagedOrder({show:false,orderId:0})
                        }}>Cancel</span>
                </Buttons></> 
               : <OrderSkeleton />
                }
         
            </StyledOrders>
        </div>
    )
}