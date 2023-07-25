import { useState, useEffect } from "react";
import { auth } from "../firebaseconnect";
import { Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";


function Protect({ children }){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
 

    useEffect(()=>{
        async function VerifyLogin(){
            const unsub = onAuthStateChanged(auth,(user)=>{
                
                if(user){
                    //se tem usuário logado
                    const infoUser = {
                    uid: user.uid,
                    email: user.email 
                    }              
                    localStorage.setItem("@userInfo", JSON.stringify(infoUser))

                    setLoading(false);
                    setSigned(true);
                }
                else{
                    //não tem usuário logado
                    setLoading(false);
                    setSigned(false);
                }         
            })
        }
        VerifyLogin();
    },[])
    
    if(loading){
        return(
            <div></div>
        )
        }
    if(signed === false){
        return <Navigate to="/"/>
    }
    
    return children
}

export default Protect;
