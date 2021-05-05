import { Fragment } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {connect} from 'react-redux'
import store from '../redux/store';
import {Link} from 'react-router-dom';
import styles from './Checkout.module.css'
const Checkout = (props) => {
    
    const enterFirstName = (e) => {
       
        store.dispatch({
            type: "CustomerFirstName",
            customerFirstName : e.target.value
        })
    }

    const enterLastName = (e) => {
       
        store.dispatch({
            type: "CustomerLastName",
            customerLastName : e.target.value
        })
    }
    
    const onOrderComplete = () => {
        
        if(props.lastNameError === "" && props.firstNameError === "" && props.EmailError === "" && props.phoneErrorMessage === ""){
          
            if(props.selectedCountry !== ""){
                store.dispatch({
                    type : "FormSubmission",
                    verified : "true",
                    formSubmissionError: "",
                    countryError : ""
                })
            
            }else{
            store.dispatch({
                type : "FormSubmission",
                verified : "false",
                formSubmissionError: "Please fill all the above fields",
                countryError : "Please select a Country"
            })
        }
        
    }else{
        store.dispatch({
            type : "FormSubmission",
            verified : "false",
            formSubmissionError: "Please fill all the above fields",
            
        })
    }
}
    const verifyFirstName = (e) => {
        if(e.target.value.length >1 ){
            if((e.target.value > 'a' && e.target.value < 'z') || (e.target.value > 'A'  && e.target.value < 'Z')){
                store.dispatch({
                    type: "FirstNameError",
                    firstNameError : "",
                
                })

            }else{
                store.dispatch({
                    type: "FirstNameError",
                    firstNameError : "Please Enter a Valid First Name",
                  
                })
            }
           
    }else{
        store.dispatch({
            type: "FirstNameError",
            firstNameError : "Please Enter a Valid First Name",
          
        })
    }
    }
    const verifyLastName = (e) => {
        if(e.target.value.length >1 ){
            if((e.target.value > 'a' && e.target.value < 'z') || (e.target.value > 'A'  && e.target.value < 'Z')){
                store.dispatch({
                    type: "LastNameError",
                    lastNameError : ""
                })

            }else{
                store.dispatch({
                    type: "LastNameError",
                    lastNameError : "Please Enter a Valid Last Name"
                })
            }
            
    }else{
        store.dispatch({
            type: "LastNameError",
            lastNameError : "Please Enter a Valid Last Name"
        })
    }
    }

    const verifyAddress = (e) => {
       if( e.target.value.length  > 3) {
           store.dispatch({
               type : "VerifyAddress",
               addressError: ""
           })
       }else{
        store.dispatch({
            type : "VerifyAddress",
            addressError: "Please enter a valid Address"
        })
       }
    }
    const verifyEmail = (e) => {
       
        if(e.target.value.length > 8){
            if(e.target.value.includes("@")){
                
                store.dispatch({
                    type: "EmailError",
                    EmailError: "",
                   
                })
            }else{
                
                store.dispatch({
                    type: "EmailError",
                    EmailError : "Please give a valid email address",
                 
                })
            }
             if(e.target.value.includes(".com")){
                
                store.dispatch({
                    type: "EmailError",
                    EmailError : "",
                   
                })
            }else{
                
                store.dispatch({
                    type: "EmailError",
                    EmailError : "Please give a valid email address",
                 
                })
            }
        }
        else{
            store.dispatch({
                type: "EmailError",
                EmailError : "Please give a valid email address",
               
            })
        }
    }

    const enterEmail = (e) => {
       
        store.dispatch({
            type: "CustomerEmail",
            customerEmail : e.target.value
        })
    }
    const selectCountry = (val) => {
        store.dispatch({
            type: "CountrySelected",
            selectedCountry : val
        })
      
    }
    
    const selectRegion = (val) => {
        store.dispatch({
            type: "RegionSelected",
            selectedRegion : val
        })
        
    
    }
    const enterPhoneNumber = (e) => {
        store.dispatch({
            type: "PhoneNumber",
            phoneNumber : e.target.value
        })
      
    }

    const verifyPhoneNumber = (e) => {
       
        if(e.target.value.slice(0,2) === "03" && e.target.value.length === 11){
         
            store.dispatch({
                type: "PhoneNumberError",
                phoneErrorMessage : ""
             
            })


        }else if(e.target.value.slice(0,3) === "+92" && e.target.value.length === 13){
        
            store.dispatch({
                type: "PhoneNumberError",
                phoneErrorMessage : ""
               
            })
        
        }else {
            store.dispatch({
                type: "PhoneNumberError",
                phoneErrorMessage : "Please give a valid mobile number"
               
            })
        }

    }
    const enterAddress = (e) => {
        store.dispatch({
            type: "Address",
            Address : e.target.value
        })
      
    }


return (
    <Fragment>
        <div style = {{display:"flex",width :"100%",height:"100%",justifyContent:"flex-end",flexWrap:"wrap"}}>
    <form style = {{display:"flex",flexDirection:"column",position:"absolute",top:"20%",left:window.innerWidth >900? "5%":"10%",width:window.innerWidth > 900? '45%': '80%'}}>
        <div style = {{width:"80%"}}>
        <div className = {styles.formGroup}>
           
            <input name="firstName" placeholder="First Name" required className  = {styles.formControl} value = {props.customerFirstName} type = "text" onChange = { enterFirstName} onBlur = {verifyFirstName}></input>
            <p style = {{ position:"relative", top:"80%", color:"red"}}>{props.firstNameError}</p>
        </div> 
        <div className = {styles.formGroup}>    
           
            <input className = {styles.formControl} placeholder="Last Name" required value = {props.customerLastName} type = "text" onChange = { enterLastName} onBlur = {verifyLastName}type = "text"></input>
            <p style = {{ position:"relative", top:"80%", color:"red"}}>{props.lastNameError}</p>
        </div>   
        <div className = {styles.formGroup}>    
            
            <input className = {styles.formControl} placeholder="Email Address" required value = {props.customerEmail} type = "text" onChange = { enterEmail} onBlur = {verifyEmail}type = "text"></input>
            <p style = {{ position:"relative", top:"80%", color:"red"}}>{props.EmailError}</p>
            </div>
        
        <div className = {styles.formGroup}>
          
            <input className = {styles.formControl} placeholder="Address" required value = {props.customerAddress} type = "text" onChange = { enterAddress} onBlur = {verifyAddress} type = "text"></input>
            <p style = {{ position:"relative", top:"80%", color:"red"}}>{props.addressError}</p>
        </div>
            
            
            <CountryDropdown value = {props.selectedCountry} onChange = { (val) => selectCountry(val)} style = {{height: "2em",
            width:"105%",            
            transition: "translateX 6s ease-in",
            marginBottom:"15px",
            fontSize: "1rem",
            border: "1px solid rgb(209, 209, 209)",
            borderRadius: "5px",
            paddingLeft : "20px"}}></CountryDropdown>
            <p style = {{ position:"relative", top:"80%", color:"red"}}>{props.countryError}</p>
            <RegionDropdown
            style = {{height: "2em",
            width:"105%",            
            transition: "translateX 6s ease-in",
            margin:"15px 0",
            fontSize: "1rem",
            border: "1px solid rgb(209, 209, 209)",
            borderRadius: "5px",
            paddingLeft : "20px"}}
            country={props.selectedCountry}
            value={props.selectedRegion}
            onChange={(val) => selectRegion(val)} />

        <div style = {{margin: "15px 0"}} className = {styles.formGroup}>   
            
            <input className = {styles.formControl} placeholder = "Mobile Number" required value = {props.phoneNumber} type = "text" onChange = { enterPhoneNumber} onBlur = {verifyPhoneNumber} type = "text"></input>  
            <p style = {{ position:"relative", top:"90%", color:"red"}}>{props.phoneErrorMessage}</p>
        </div>
           
            
        <div style = {{display:"flex",alignContent:"center"}}>
            
            <input checked type = "checkbox" style = {{height:"18px"}}></input>
            <label style = {{margin:"0 10px"}}>Cash on Delivery</label>
        </div>     

        <Link onClick = {onOrderComplete} to = {props.verified === "true" ? "/OrderCompleted" : "/Checkout"} style = {{position:"relative",top:"10px",color:"white",backgroundColor:"black",width:window.innerWidth > 500 ? "50%" : "60%",height:"2em",display:"flex",justifyContent:"space-around",alignItems:"flex-start",textDecoration:"none",fontFamily:"monospace",fontSize:"1.2rem",margin:"40px auto", marginBottom:"20px"}}><p style ={{margin:"auto 0"}}>Place Order</p></Link>   
        <p style = {{ margin:"0",textAlign : "center", color:"red"}}>{props.formSubmissionError}</p>
        </div>
    </form>
    {window.innerWidth > 900? 
    <aside style ={{backgroundColor: "#e1e1e1",width:"50%",minHeight:"100vh",height:"auto",position:"absolute",top:"12%",paddingBottom:"80px"}}>
        <div style ={{}}>

            <div className = "order" style = {{ color:"black",margin:"5% 0"}}>
                {props.productName.map((element,index) => {
                    let imageRef = props.productImage[index]
                    let productQuantityRef = props.productQuantity[index]
                    let productPriceRef = props.productPrice[index]
                   return(
                <div style ={{display:"flex", margin:"0 10%",height:"100px"}}>
                   <img src ={process.env.PUBLIC_URL + imageRef} style ={{width:"70px",height:"70px",margin:"0 40px"}}></img>

                   <p style = {{fontFamily:"monospace",marginLeft:" 0px",fontWeight:"bold"}}>{element}</p>
                    <p style = {{fontFamily:"monospace",marginLeft:" 60px"}}>{productQuantityRef} * 2</p>
                    <p style = {{fontFamily:"monospace",marginLeft :" 60px"}}>{productPriceRef}</p>     
                </div>)
                })}
                
            </div>
            <div style = {{margin:"0% 10%",width:"auto", height:"200px"}}>
                <hr></hr>
                <div style = {{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <h4>Subtotal: </h4>
                <h4>{props.subTotal}</h4>
                </div>
                <div style = {{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <h4>Shipping: </h4>
                <h4>0</h4>
                </div>
                <hr></hr>
                <div style = {{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <h4>Total</h4>
                <h4>{props.subTotal}</h4>
                </div>
                </div>

        </div>
    </aside>: null}
    </div>
    </Fragment>
)
}
const mapStateToProps = (state) => {
  console.log(state)
    return{
        selectedCountry : state.selectedCountry,
        selectedRegion : state.selectedRegion,
        customerFirstName : state.customerFirstName,
        customerLastName : state.customerLastName,
        customerEmail: state.customerEmail,
        EmailError : state.EmailError,
        phoneNumber : state.phoneNumber,
        phoneErrorMessage: state.phoneErrorMessage,
        firstNameError : state.firstNameError,
        lastNameError : state.lastNameError,
        Address : state.Address,
        productImage : state.productImage,
        productName : state.productName,
        productQuantity : state.productQuantity,
        productPrice : state.productPrice,
        subTotal: state.subTotal,
        formSubmissionError: state.formSubmissionError,
        verified : state.verified,
        addressError : state.addressError,
       
        countryError : state.countryError
    }
}

export default connect(mapStateToProps)(Checkout)

