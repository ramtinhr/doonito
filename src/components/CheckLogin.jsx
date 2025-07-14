// import React from 'react';
import React, {useState,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import isAuthenticated from '../utils/auth'
import {Link} from "react-router-dom";
const CheckLogin = () => {
    
    const [showPopUp ,setOpenTooltip] = useState(false);
    useEffect(()=>{
        if (!isAuthenticated()) {
          setOpenTooltip(true)
          //history.push("/signin");
        } else {
          setOpenTooltip(false)
        }
    },[null]);    
    return(
    <Popup open={showPopUp} position="center center" modal
           nested>
        {close => (
            <div className="text-center">
                <div className="modal-body">
                    <p>کاربر مهمان عزیز </p>
                    <p>شما هیچ اشتراکی ندارید</p>
                    <p>برای دریافت اشتراک اقدام کنید</p>
                </div>
               <Link to='/signUp' style={{border:'none',outline:'none'}}><p className="messageBtn"> خرید اشتراک</p></Link> 
               
            </div>
        )}
    </Popup>
    // </div>
    
    )
            };
export default CheckLogin 