import { GiftBoard } from "../../general/GeneralComponents"
import { Filter } from "../../react-icons/Icons"
import { CardSection, Greating } from "../home/Home.styles"
import { Books, Sect2, StyledBookings, StyledTop } from "./Bookins.styles"
import { OrdersCard } from "../orders/OrdersCard"
import { Orders } from "../orders/Orders";
import { useEffect, useState, createContext } from "react"
import axios from "axios"
import { OrderContextType, OrderDetail, OrderRole } from "../../types/appTypes"
import { Pagination } from "../pagination/Pagination"
import { useSearchParams } from "react-router-dom"
import { Services } from "../orders/Services"


export const OrderContext = createContext<OrderContextType|undefined>(undefined);
export const Bookings = () => {

    const base_url = process.env.REACT_APP_BURL;
    const token = localStorage.getItem("jwt");
    const [ orderDetails, updateOrderDetails ] = useState<OrderDetail[]>();
    const [ showService, toggleShowServices ] = useState(false); 
    const [ searchParam , setSearchParams ] = useSearchParams();
    const [ userRole,updateUserRole ] = useState(OrderRole.CUSTOMER);
    const [ showGiftDetails, toggleShowFull ] = useState(false);
    const [ paginationData, setPaginationData ] = useState({
        pageNumber:0,pageSize:0,totalItems:0,totalPages:0
      })
    const [ stagedOrder, setStagedOrder ] = useState({
        show:false, orderId:0
      })


    const updatePage = (number:number) =>{
        searchParam.set("page",number.toString())
        setSearchParams(searchParam)
     }
  


    useEffect(()=>{

      window.scroll({
        top:0,
        behavior:"smooth"
      })

      const hash = window.location.hash

      if(hash === "#service"){
        toggleShowServices(true)
      }

        const currentPage = searchParam.get("page") || 0;
        axios({
            url:`${base_url}/auth/users/orders`,
            params:{page:currentPage,size:6,sort:"orderStatus"},
            headers:{Authorization: `Bearer ${token}`}
        }).then( response =>{
            const data = response?.data            
            setPaginationData({pageNumber:data?.pageNumber + 1,pageSize:data?.pageSize,totalItems:data?.totalItems,totalPages:data?.totalPages})
            updateOrderDetails(data?.data)
        }).catch( error => {

        })
    },[searchParam])

    return (
        <StyledBookings>
            <StyledTop>
              <Greating style={{padding:"0"}}>
                {orderDetails && orderDetails?.length > 0 ?
                <>
                   Manage your bookings
                <p>Your bookings</p>
                </> 
                : <>
                <p>Manage Your bookings</p>
                </> 
                }
            
                <h4>Work with a master stylist to learn how to do your hair from the comfort of your home</h4>
            </Greating>
            <button onClick={()=>toggleShowServices(true)}>Add Booking</button>
            </StyledTop>
            <Sect2>
               <p>You have a total of <strong>{`${paginationData?.totalItems}`}</strong>  bookings </p>
               <Filter width={44} height={28} />
            </Sect2>
            <OrderContext.Provider value={{stagedOrder,setStagedOrder}}>
                <Books>
                { orderDetails ?( Array.isArray(orderDetails) ? orderDetails.map( (order,i) => <div key={i}><OrdersCard details={order} /></div> )  : <p>No orders yet</p> ): <p>Loading...</p>}
                </Books>
              <div onClick={()=>{

                    if(showGiftDetails){
                        updateUserRole(OrderRole.INTERMEDIARY);
                        toggleShowServices(true)
                      }
                    }}>
                  <GiftBoard showFull={showGiftDetails} toggleShowFull={toggleShowFull} />
                </div> 
              { stagedOrder.show &&  <Orders />}
              { showService && <Services role={userRole} setRole={updateUserRole} updateShow={()=>toggleShowServices(false)} />}
            </OrderContext.Provider>
          <Pagination data={paginationData} updatePage={updatePage} />
        </StyledBookings>
    )
}