import {  useEffect, useState } from "react"
import { CFCheckBox, CFFileInput, CFInputs, CFTextArea, CFTop, CFTopInputSection, FileCount, StyledClientForm } from "./ClientForm.styles";
import { FileIcon } from "../../../react-icons/Icons";
import { CSButtons } from "../calender/Calender.styles";
import Files from 'react-files'
import axios from "axios";
import { ClientFormData } from "../../../types/appTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { startLoading, stopLoading } from "../../../redux/slices/LoadingSlice";
import { setInfo } from "../../../redux/slices/InfoSlice";

export const ClientForm = () => {

    const [ formData, setFormData ] = useState<ClientFormData>({
        country:"",state:"",zipCode:"",appointmentAim:"",
        currentHairRoutine:"",productsInUse:"",howYouSleep:"",
        problemWithHair:"",whatHelpNeeded:"",note:"",canRecordVideo:"",
        canUseVideoSnippets:""
    });
    let meetingLink ="";
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams();
    const [ hairPics, setHairPics ] = useState<String[]>([]);
    const [ formErrors, setFormErrors ] = useState({ 
      countryError:"",stateError:"",zipCodeError:"",appointmentAimError:"",
      currentHairRoutineError:"",productsInUseError:"",howYouSleepError:"",
      problemWithHairError:"",whatHelpNeededError:"",noteError:"",canRecordVideoError:"",
      canUseVideoSnippetsError:""
    }); 
    // const [ theresFormErrors,toggleFormErrors ] = useState(true);
    const { REACT_APP_FURL:file_url, REACT_APP_BURL:base_url } = process.env;


    const noErrors = (setValue?:"yes"|"no") => {

        const error = { 
            countryError:"",stateError:"",zipCodeError:"",appointmentAimError:"",
            currentHairRoutineError:"",productsInUseError:"",howYouSleepError:"",
            problemWithHairError:"",whatHelpNeededError:"",noteError:"",canRecordVideoError:"",
            canUseVideoSnippetsError:""
          }
          
        const {
            country,state,zipCode,appointmentAim,
            currentHairRoutine,productsInUse,howYouSleep,
            problemWithHair,whatHelpNeeded,note,canRecordVideo,
            canUseVideoSnippets
        } = formData;

        if(country?.length < 1){
            error.countryError = "Country is required for identification."
        }
        if(state?.length < 1){
            error.stateError = "State of residence is required."
        }
        if(zipCode?.length < 1){
            error.zipCodeError = "Zip code is required."
        }
        if(appointmentAim?.length < 1){
            error.appointmentAimError = "We need to know your aim for this appointment."
        }
        if(currentHairRoutine?.length < 1){
            error.currentHairRoutineError = "Your current routine will help your stylist prepare better."
        }
       
        if(howYouSleep?.length < 1){
            error.howYouSleepError = "We need to know how you sleep with your hair ."
        }
        if(productsInUse?.length < 1){
            error.productsInUseError = "Products you're in use of is required ."
        }
        if(problemWithHair?.length < 1){
            error.problemWithHairError = "We need to know if you have a issue as regards your hair."
        }
        if(whatHelpNeeded?.length < 1){
            error.whatHelpNeededError = "We need to know what you need help with regrading your hair."
        }
        if(note?.length < 1){
            error.noteError = "Note is required."
        }
        if(canRecordVideo === ""){
            error.canRecordVideoError = "Your opinion regrading this is required."
        }
        
        if(canUseVideoSnippets == ""){
            error.canUseVideoSnippetsError = "Your opinion regrading this is required."
        }

        if(setValue === "yes"){
            setFormErrors(error);
        }        

        return Object.values(error).every( field_error => field_error === "") ;
    }


    const handleSubmit = (e:React.FormEvent) => {
            e.preventDefault();
        const id = params.id;
        if(noErrors("yes")){

            const canRecordVideo = formData.canRecordVideo === "no"
            const canUseVideoSnippets = formData.canUseVideoSnippets === "no"
            const data = {...formData,orderId:id,hairPics,canRecordVideo,canUseVideoSnippets};
            
            dispatch(startLoading())
            axios({
                method:"POST",
                url:`${base_url}/auth/users/add-details`,
                headers:{Authorization:`Bearer ${token}`},
                data:data,
              }).then( response => {
                  const data = response.data?.data
                console.log(data);

               meetingLink = data?.meetingLink;
                    alertSuccess();
                
              }).catch( error => {
    
                dispatch(stopLoading())
                dispatch(setInfo({
                  isError:true,
                  showInfo:true,
                  heading:`An Error Occured`,
                  message: error?.response?.data?.message || "An error occured while trying to make you order",
                  buttonText:"Try Again",
                  url:"close_page"
              }))
                  console.log(error);
                  
              })
            
        }
    }

    const handleComplete = () => {
        const data = {
            orderId:params.id,
            country:null,state:null,zipCode:null,appointmentAim:null,
            currentHairRoutine:null,productsInUse:null,howYouSleep:null,
            problemWithHair:null,whatHelpNeeded:null,note:null,canRecordVideo:null,
            canUseVideoSnippets:null
        }
        dispatch(startLoading())
        axios({
            method:"POST",
            url:`${base_url}/auth/users/add-details`,
            headers:{Authorization:`Bearer ${token}`},
            data:data,
          }).then( response => {
              const data = response.data?.data
            console.log(data);       
            meetingLink = data?.meetingLink
            alertSuccess();
        }).catch( error => {
    
            dispatch(stopLoading())
            dispatch(setInfo({
              isError:true,
              showInfo:true,
              heading:`An Error Occured`,
              message: error?.response?.data?.message || "An error occured while trying to make you order",
              buttonText:"Try Again",
              url:"close_page"
          }))
              console.log(error);
              
          })
    }

    const setForm = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {        
        setFormData( allData => {
            return {
                ...allData,
                [e.target.name]:e.target.value
            }
        }) 
    }

    const submitFile = (file:any) => {
        
        if(hairPics.length <= 3){
            const fileData = new FormData()
            fileData.append("file",file[0])
            axios({
                method:"POST",
                url:`${file_url}/save`,
                data:fileData
            }).then( response => {
                console.log(response);
            
                setHairPics( hairPics => [...hairPics,response?.data])
                
            }).catch(error =>{
                // alert("Error")
            })
        }        
    }
  
    const handleCanRecordCheck = (opt:"yes"|"no") =>{

        if(opt === "yes"){
            if(formData.canRecordVideo === "no" || formData.canRecordVideo === ""){
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canRecordVideo:"yes"
                    }
                })
            }else{
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canRecordVideo:"no"
                    }
                })
            }
        }else{
            if(formData.canRecordVideo === "yes" || formData.canRecordVideo === ""){
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canRecordVideo:"no"
                    }
                })
            }else{
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canRecordVideo:"yes"
                    }
                })
            }
        }

    }
    
    const handleUseSnippetCheck = (opt:"yes"|"no") =>{

        if(opt === "yes"){
            if(formData.canUseVideoSnippets === "yes" || formData.canUseVideoSnippets === "" ){
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canUseVideoSnippets:"no"
                    }
                })
            }else{
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canUseVideoSnippets:"yes"
                    }
                })
            }
        }else if(opt === "no"){
            if(formData.canUseVideoSnippets === "no" || formData.canUseVideoSnippets === "" ){
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canUseVideoSnippets:"yes"
                    }
                })
            }else{
                setFormData( oldData =>{
                    return{
                        ...oldData,
                        canUseVideoSnippets:"no"
                    }
                })
            }
            
        }

    }

    // us02web.zoom.us/j/85479832755?pwd=Y3RLVHRjS2NmbDJod01ON0w2UFRuUT09

    /*     
            showInfo,
            heading,
            message,
            isError,
            buttonText,
            url,
            middleSec,meetLink,buttonText2,instruction
             */

    const alertSuccess = () =>{

        dispatch(setInfo({
            isError:false,
            showInfo:true,
            heading:`Successfull!`,
            message:"You have successfully booked this appointment",
            buttonText:"Done",
            buttonText2:"Add To Calendar",
            middleSec:true,
            meetLink:meetingLink,
            instruction:"You can access this info from your booking detail",
            url:"/bookings"
        }))
    }


    return (
        <StyledClientForm>
            
            <CFTop>
                <div>
                <h2>Let’s prepare you for your appointment</h2>
                <p>This will help us know your hair better</p>
                </div>
                <button>Use My Hair Profile</button>
            </CFTop>
        <form >
            <CFInputs>
            <CFTopInputSection>
                <div>
                    <label htmlFor="country">What country do you reside?</label>
                    <input type="text" name="country" placeholder="Type here" required value={formData.country} onChange={setForm}  />
                    { formErrors.countryError && <h4>{formErrors.countryError}</h4>}
                </div>
                <div>
                    <label htmlFor="state">What is your State/Province?</label>
                    <input type="text" name="state" placeholder="Type here"  required value={formData.state} onChange={setForm} />
                    { formErrors.stateError && <h4>{formErrors.stateError}</h4>}
                </div>
                <div>
                    <label htmlFor="zipCode">Zip/Postal Code</label>
                    <input type="text" name="zipCode" placeholder="Type here"  required value={formData.zipCode} onChange={setForm} />
                    { formErrors.zipCodeError && <h4>{formErrors.zipCodeError}</h4>}
                </div>
            </CFTopInputSection>
     
            <div>
                <CFTextArea>
                    <label htmlFor="appointmentAim">What would you like to achieve in this appointment?</label>
                    <textarea name="appointmentAim" value={formData.appointmentAim} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.appointmentAimError && <h4>{formErrors.appointmentAimError}</h4>}
                </CFTextArea>
                <CFTextArea>
                    <label htmlFor="currentHairRoutine">Describe your current routine. How do you currently style your hair? (Wash and Go? Twist Out? How do you apply your products?) *</label>
                    <textarea name="currentHairRoutine" value={formData.currentHairRoutine} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.currentHairRoutineError && <h4>{formErrors.currentHairRoutineError}</h4>}
                </CFTextArea>
                <CFTextArea>
                    <label htmlFor="productsInUse">What products do you use to style your wavy or curly hair? *</label>
                    <textarea name="productsInUse" value={formData.productsInUse} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.productsInUseError && <h4>{formErrors.productsInUseError}</h4>}
                </CFTextArea>
                <CFTextArea>
                    <label htmlFor="howYouSleep">How do you wear your hair when you sleep? *</label>
                    <textarea name="howYouSleep" value={formData.howYouSleep} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.howYouSleepError && <h4>{formErrors.howYouSleepError}</h4>}
                </CFTextArea>
                <CFTextArea>
                    <label htmlFor="problemWithHair">Do you have problems with your hair? (Dryness, Breakage, Heat Damage, Color Damage...) *</label>
                    <textarea name="problemWithHair" value={formData.problemWithHair} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.problemWithHairError && <h4>{formErrors.problemWithHairError}</h4>}
                </CFTextArea>
                <CFTextArea>
                    <label htmlFor="whatHelpNeeded">What do you most need help with regarding your hair? *</label>
                    <textarea name="whatHelpNeeded" value={formData.whatHelpNeeded} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.whatHelpNeededError && <h4>{formErrors.whatHelpNeededError}</h4>}
                </CFTextArea>
                <CFTextArea>
                    <label htmlFor="note" >Extra notes</label>
                    <textarea name="note" value={formData.note} placeholder="Type here"  required onChange={setForm} ></textarea>
                    { formErrors.noteError && <h4>{formErrors.noteError}</h4>}
                </CFTextArea>

            </div>
            <CFFileInput>
                <p >Please upload a photo of your best natural hair day. (Front and back if possible)</p>
                <div>

                 <Files
                    onChange={submitFile}
                    // onError={handleError}
                    accepts={['image/png', '.pdf', 'audio/*']}
                    multiple
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable>
                 <FileIcon />    click to upload
                 </Files>
                 { hairPics.length > 0 && <FileCount >{hairPics.length}</FileCount>}
                </div>
                
            </CFFileInput>
            <div>
                <CFCheckBox>
                    <p>Would you mind if this video call was recorded? </p>
                    <div >
                    <span>
                    <input type="checkbox" name="canRecordVideo" checked={formData.canRecordVideo === "yes"}  onChange={()=>handleCanRecordCheck("yes")}  />
                        <label htmlFor="yes">Yes</label>
                    </span>
                     <span>
                    <input type="checkbox" name="canRecordVideo" checked={formData.canRecordVideo === "no"}   onChange={()=>handleCanRecordCheck("no")}   />
                        <label htmlFor="yes">No</label>
                    </span>
                    </div>
                    { formErrors.canRecordVideoError && <h4>{formErrors.canRecordVideoError}</h4>}
                </CFCheckBox>
                <CFCheckBox>
                  <p>Do you mind if we used snippets of your call for promotional purposes? *</p>
                  <div >
                    <span>
                        <input type="checkbox" name="canUseYes" checked={formData.canUseVideoSnippets === "yes"}   onChange={()=>handleUseSnippetCheck("yes")}    />
                        <label htmlFor="canUseYes">Yes</label>
                    </span>
                     <span>
                    <input type="checkbox" name="canUseNo" checked={formData.canUseVideoSnippets === "no"}   onChange={()=>handleUseSnippetCheck("yes")} />
                        <label htmlFor="canUseNo">No</label>
                    </span>
                  </div>
                  { formErrors.canUseVideoSnippetsError && <h4>{formErrors.canUseVideoSnippetsError}</h4>}
                </CFCheckBox>

            </div>
            </CFInputs>
            <div style={{margin:" 30px 0",width:"300px"}}>
                <CSButtons isdissabled={noErrors() ? "no" : "yes"}>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <span onClick={handleComplete}>Complete Later</span>
                </CSButtons>
            </div>
        </form>

        </StyledClientForm>
    )
}