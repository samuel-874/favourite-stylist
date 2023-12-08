import { ShortBed } from "../../details/stylist/Stylist.styles"
import { Img } from "../../form/signin/Signin.styles"
import logo from "../../../assets/app_logo.png";
import { Bottom, CSBoard, CSButtons, CSLeft, CSRight, DateNum, Dates, LineThrough, NavArrow, StyledCalender, Time, Times } from "./Calender.styles"
import { Badge, SLocationIcon, TelSVG } from "../../../react-icons/Icons";
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { formatMobile } from "../../../general/service";
import moment from "moment";
import { updateOrderInfo } from "../../../redux/slices/BookingSlice";
import { useNavigate } from "react-router-dom";
import { setInfo } from "../../../redux/slices/InfoSlice";
import { startLoading } from "../../../redux/slices/LoadingSlice";

export const Calender = ({updateShow}:{updateShow:Function}) => {

    const date = new Date();
    const info = useAppSelector( state => state.orderInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ days,setDays ] = useState<(string|number)[]>([]);
    const [ currentMonth, setCurrentMonth ] = useState(date.getMonth());
    const [ selectedMonth, setSelectedMonth ] = useState(date.getMonth());
    const [ selectedDate, updateSelectedDate ] = useState(0);
    const [selectedTime,setSelectedTime] = useState<number>(0);
    const [ errors, setErrors ] = useState({show:false,message:"error: Select a date to continue"})
    
    const months = ["January","Febuary","March","April","May","June","July","August","September","Octomber","November","December"];
    const daysOfWeek = ["sun","mon","tue","wed","thur","fri","sat"];
    const daysOfWeekCap = ["sunday","monday","tueday","wednessday","thursday","friday","saturday"];
    const availableTimes = [{label:"8:00",value:8},{label:"10:00",value:10},{label:"12:00",value:12},{label:"1:00",value:1}];



    const setCalender =  () => {
        let year = date.getFullYear();
        // let thisMonth = date.getMonth();
        let arr:(string|number)[] = []

       let dayone = new Date(year, currentMonth, 1).getDay();
       
            for(let i =0 ; i < dayone;i++){
               arr.push("");
            }
              
            let lastdate = new Date(year, currentMonth + 1, 0).getDate();
            
            for(let i = 1; i <= lastdate; i++){
                arr.push(i);
            }
            
            setDays(arr);
    }

    const handleDateUpdate = (day:string|number) => {

        if(typeof day === "number"){

            if(currentMonth === date.getMonth()){
                   if(day > date.getDate()){
                        setSelectedMonth(currentMonth);
                        updateSelectedDate(day);
                    }
            }else if(currentMonth > date.getMonth()){
                    setSelectedMonth(currentMonth);
                    updateSelectedDate(day);
            }
        }

        if(selectedTime > 0){
            setErrors({show:false,message:""})
        }else{
            setErrors({show:false,message:"error: Select time from the options to continue"})
        }
    }

    const handleSetTime = (time:number) =>{
        if(time){
            setSelectedTime(time)
        }
        if(selectedDate > 0){
            setErrors({show:false,message:""})
        }else{
            setErrors({show:false,message:"error: Select a date to continue."})

        }
    }

    const nav = (direction:"-1"|"+1") =>{
        if(direction === "+1"){
            if(currentMonth + 1 <= date.getMonth() +1){
                setCurrentMonth( currentMonth => currentMonth + 1)
            }
        }else if(direction === "-1"){
            if(currentMonth - 1 >= date.getMonth()){
                setCurrentMonth( currentMonth => currentMonth - 1)
            }
        }
    }

    const handleSubmit = () =>{

        const scheduledDateTime = new Date(date.getFullYear(),selectedMonth,selectedDate,selectedTime).getTime();
        if(errors.message?.trim()?.length < 1 ){
            if(info.service.id > 0 && info.stylist.id > 0){
                dispatch(startLoading())
                dispatch(updateOrderInfo({
                    ...info,
                    scheduledDate:scheduledDateTime
                }))
                navigate("/bookings/client-details")
            }else{
                dispatch(setInfo({
                    isError:true,
                    showInfo:true,
                    heading:`Error`,
                    message:"An error occured while trying to make you order",
                    buttonText:"Try Again",
                    url:"/bookings"
                }))
            }
        }
    }


    useEffect(()=> {        
      setCalender();
        
    },[currentMonth])
    
    return (
        <div>
            <ShortBed onClick={()=>updateShow(false)} />
            <StyledCalender>
              <CSLeft>
                 <data>
                   <h3>{`${info?.stylist?.name}`}</h3>
                    <div>
                     <Img height={"24px"} width={"18px"} alt="..." src={logo} />
                      <Badge />
                    </div>
                 </data>
                 <h1>Hair Appointment</h1>
                 <span>
                    <SLocationIcon />
                    <p>{`${info?.stylist?.location}`}</p>
                 </span>
                 <span>
                    <TelSVG />
                      <p>{`${formatMobile(info?.stylist?.mobile)}`}</p>
                    </span>
              </CSLeft>
                <LineThrough />
                <CSRight >
                    <data> <h1>Select an available time slot</h1> <span><NavArrow isdissabled={currentMonth + 1 <= date.getMonth() +1 ? "yes" :"no"} onClick={()=>nav("-1")}>{`<`}</NavArrow> <NavArrow isdissabled={currentMonth - 1 >= date.getMonth() ? "yes" : "no" } onClick={()=>nav("+1")}>{`>`}</NavArrow></span></data>
                   
                    <CSBoard>
                        <div >
                          <h2 className=" hidden lg:block">{`${months[currentMonth]} ${date.getFullYear()}`}</h2>
                          <Dates style={{marginTop:"30px"}}>
                            {daysOfWeek.map( (day,i) => <div key={i}>{day}</div>)}
                            {days.map( (day,i) => <DateNum key={i}  isselected={ selectedDate === day && selectedMonth === currentMonth ? "yes": "no" } onClick={()=>handleDateUpdate(day)} iscurrent={ day === date.getDate() && currentMonth === date.getMonth() ? "yes" : "no"} >{day}</DateNum>)}
                          </Dates>
                        </div>
                        <div>
                          <h2 >{`${ daysOfWeekCap[new Date(date.getFullYear(),selectedMonth,selectedDate).getDay()]}, ${months[selectedMonth]} ${selectedDate > 0 ? selectedDate : ''}`}</h2>
                          <Times  style={{marginTop:"30px"}}>
                            {availableTimes.map( (time,i) => <Time key={i} isselected={selectedTime === time.value ? "yes":"no"} onClick={()=>handleSetTime(time.value)}>{time.label}</Time> )}
        
                          </Times>
                        </div>
                    </CSBoard>
                    <Bottom>
                        <div >
                        <select name="" id="">
                            <option value="">Pacific Standard Time (8:00)</option>
                            <option value="">Aleutian Time Zone (8:00)</option>
                            <option value="">Alaska Time Zone (8:00)</option>
                            <option value="">Pacific Time Zone (8:00)</option>
                            <option value="">Mountain Time Zone (8:00)</option>
                            <option value="">Central Time Zone (8:00)</option>
                            <option value="">Eastern Time Zone (8:00)</option>
                        </select>
                        <CSButtons isdissabled={selectedDate > 0 && selectedMonth >0 && selectedTime > 0 ? "no" :"yes"}>
                           {(errors.show && errors.message?.trim()?.length > 1) && <data>{errors.message}</data>}
                            <span onClick={()=>updateShow(false)}>Back</span> <div onClick={handleSubmit} onMouseLeave={()=>setErrors( error => {return{...error,show:false}})} onMouseEnter={()=>setErrors( error => {return{...error,show:true}})}>Proceed</div>
                        </CSButtons>
                        </div>
                    </Bottom>
                </CSRight>
            </StyledCalender>
        </div>
    ) 
}