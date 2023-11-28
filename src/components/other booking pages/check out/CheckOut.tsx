import axios from "axios";
import { CreditCard, DeleteSVG, Paypal } from "../../../react-icons/Icons"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { setInfo } from "../../../redux/slices/InfoSlice";
import {  PaymentOrderDetail } from "../../../types/appTypes";
import { COButton, COLeft, CORText, CORTop, CORight, CheckOutForm, StyledCheckOut } from "./CheckOut.style"
import { useEffect,useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFlutterwave,closePaymentModal } from "flutterwave-react-v3";
import flutterwaveIcon from "../../../assets/Flutterwave-logo.jpg"
import { Img } from "../../form/signin/Signin.styles";
import { startLoading } from "../../../redux/slices/LoadingSlice";

export const CheckOut = () => {

    const dispatch = useAppDispatch();

    
    const { REACT_APP_BURL:base_url,REACT_APP_FURL:file_url,REACT_APP_FLUTTERWAVE_PUBLIC_KEY:flutterwave_key} = process.env;
    const token = localStorage.getItem("jwt");
    const [ order, setOrder ] = useState<PaymentOrderDetail>();
    const [searchParameter, setSearchParam ] = useSearchParams();
    const userInfo = useAppSelector( state => state.userInfo)
    const params = useParams();

     
   
    
      const config = {
        public_key: flutterwave_key||"",
        tx_ref: params.id||"",
        amount: (order?.price||0.00) * 1000,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: order?.clientsEmail||"",
           phone_number: order?.clientsMobile||"",
          name: order?.clientsName||"",
        },redirect_url:`${window.location.href}?app_state=returned`,
        customizations: {
          title: "Stylist booking",
          description: 'Payment for hair Stylist',
          logo: 'http://localhost:3008/static/media/app_logo.66b750c9f4362ac3a3fc.png',
        },
        
      };
    
      const handleFlutterPayment = useFlutterwave(config);

      const handlePayment = () => {
        if(order?.price && order?.price > 0 && order.isPaid === false ){    
              dispatch(startLoading())
    
              
            handleFlutterPayment({
              callback: (response) => {
                console.log("making payment")
    
                console.log(response)
                if(response.status === 'success'){

                  console.log("was successfuly");
                  
        
                     
                  
                 }
                 closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {
                console.log("closing modal")
              },
            });
    
    
          }else{
    
            // setFormError(true)
          }
    

    } 

    const confirmPayment = (isDeposit:boolean,) => {

      const id = params.id;
      if(isDeposit === true){

        if(order?.isPaid === false){
                   axios({
              method:"POST",
              url:`${base_url}/auth/users/confirm-payment`,
              data:{orderId:id,willDeposit:true},
              headers:{Authorization: `Bearer ${token}`}
          }).then( response =>{

              setSearchParam(new URLSearchParams())

              dispatch(setInfo({
                          icon:`check`,
                          showInfo:true,
                          heading:'Request was Successful!',
                          message:'You can proceed',
                          isError:false,
                          buttonText:'Continue ',
                          url:`/bookings/preparation-form/${id}`
                         }))

          }).catch( error => {
           setSearchParam(new URLSearchParams())
          dispatch(setInfo({
            icon:`check`,
            showInfo:true,
            heading:'Transaction Failed!',
            message:'Your transaction was not successful',
            isError:true,
            buttonText:'Try again ',
            url:`close_page`
           }))

          })
        }


      }else{
     
      const status = searchParameter.get("status");
      const trans_id = searchParameter.get("transaction_id");
      

        axios({
          method:"POST",
          url:`${base_url}/auth/users/confirm-payment`,
          data:{orderId:id,transactionReference:trans_id},
          headers:{Authorization: `Bearer ${token}`}
      }).then( response => {
          setSearchParam(new URLSearchParams())
             dispatch(setInfo({
                      icon:`check`,
                      showInfo:true,
                      heading:'Transaction Successful!',
                      message:`Your payment for was successful.`,
                      isError:false,
                      buttonText:'Continue ',
                      url:`/bookings/preparation-form/${id}`
                     }))
      }).catch( error => {
          setSearchParam(new URLSearchParams())
          dispatch(setInfo({
            icon:`check`,
            showInfo:true,
            heading:'Transaction Failed!',
            message:'Your transaction was not successful',
            isError:true,
            buttonText:'Try again ',
            url:`close_page`
           }))
      })
      }
    }
    



    useEffect(()=>{

        window.scroll({
            top:0,
            behavior:"smooth"
          })
          

        const id = params.id;

        axios({
            url:`${base_url}/auth/users/order-details`,
            params:{id:id},
            headers:{Authorization: `Bearer ${token}`}
        }).then( response =>{
            const data = response?.data            
            setOrder(data?.data)  
            console.log(data);

        }).catch( error => {

        })

        const search = new URLSearchParams()
        const status = searchParameter.get("status");
        const trans_id = searchParameter.get("transaction_id");
        const state = searchParameter.get("app_state");


        if(status === "successful" && trans_id !== null && state === "returned" ){
          dispatch(startLoading())
          confirmPayment(false)


        }

    
        



        // http://localhost:3008/bookings/checkout/n1uLL3?app_state=returned&status=successful&tx_ref=n1uLL3&transaction_id=4677186




    },[])



    return (
        <StyledCheckOut>
            <COLeft>
                <h1>Payment</h1>
                <h3>Select a payment method</h3>
                <CheckOutForm isdisabled={order?.isPaid === true ? "yes" : "no"}>
                    <label>
                        <input type="radio" disabled={order?.isPaid === true} name="payment" />
                        <CreditCard />
                        <p>Credit/ Debit Card</p>
                    </label>
                    
                    <label>
                        <input type="radio" disabled={order?.isPaid === true} defaultChecked name="payment"  />
                        <Img src={flutterwaveIcon} width={30} style={{margin:"0 10px"}}  />
                        <p>Flutterwave</p>
                    </label>
                    <button onClick={handlePayment} >Make Payment</button>
                        <h4>OR</h4>
                    <COButton onClick={()=>confirmPayment(true)}>{`Pay $${order?.price||0.00} Deposit`}</COButton>
                </CheckOutForm>
            </COLeft>
            <CORight>
                <CORTop>
                    <img src={`${file_url}?name=${order?.stylistPic}`} />
                    <div>
                        <data><p>{order?.stylist}</p> <DeleteSVG /> </data>
                        <span>{order?.service}</span>
                    </div>
                </CORTop>
                <hr />
                <CORText>
                    <span><h4>Duration</h4><p>{order?.duration}</p></span>
                    <span><h4>Price</h4><p>{`$${order?.price||0.00}`}</p></span>
                </CORText>
                <hr />
                <CORText>
                  <span style={{margin:"10px 0"}}><h4>Summary</h4><p>{`$${order?.summary||0.00}`}</p></span>
                </CORText>
            </CORight>
        </StyledCheckOut>
    )
}