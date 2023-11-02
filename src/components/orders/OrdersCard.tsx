import moment from "moment"
import { OrderDetail } from "../../types/appTypes"
import { BCBottom, BCSect1,  BCSect2,  BCStatus,  BCTop, StyledBookingsCard } from "./Orders.styles";
import { useEffect, useContext } from "react";
import { OrderContext } from "../bookings/Bookings";

export const OrdersCard = ({details}:{details:OrderDetail}) => {

    const orderContext = useContext(OrderContext);

    const manage = () => {
            if(orderContext){
                orderContext.setStagedOrder({orderId:details.id,show:true})
            }
    }

    const status = details?.status === "CANCELLED" ? "Cancelled" : ( details?.status ===  "PROCESSING" ? "In progress" :( details?.status ===  "COMPLETED" ? "Completed" :( details?.isPaid === false ? "Un paid" : "Upcoming") ));
    const color = details?.status === "CANCELLED" ? "#DF0000" :  ( details?.status ===  "PROCESSING" ? "#518EF8" :( details?.status ===  "COMPLETED" ? "#28B446" :(details?.isPaid === false ? "orange" : "#FBBB00" )));


    return (
        <StyledBookingsCard>
            <BCTop>
                <p>{details?.service} &bull;</p><span>{details?.stylist}</span>
            </BCTop>
            <BCSect1 >
               <BCStatus color={color}> <span></span><h4>{status}</h4></BCStatus> <p> {moment(details?.date).format("MMMM D YYYY  hh:ssa")}</p>
            </BCSect1>
            <BCSect2>
                <p>Price:</p><span> {`$${details?.price}`}</span>
            </BCSect2>
            <BCBottom>
                <button onClick={manage}>Manage</button>
                <span>{`Booked ${moment(details?.orderDate).format("MMMM D YYYY hh:ssa")}`}</span>
            </BCBottom>
        </StyledBookingsCard>
    )
}