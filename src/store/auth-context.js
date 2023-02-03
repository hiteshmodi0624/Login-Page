import React, { useState,useEffect } from "react";


const AuthContext= React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}
})
const AuthContextProvider=(props)=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn',"1")
        setIsLoggedIn(true);
    };
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    };
    useEffect(()=>{
        const LoginInfo=localStorage.getItem('isLoggedIn')
        if(LoginInfo==='1'){
          setIsLoggedIn(true);
        }
    },[])

    return (
    <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler
    }}>
        {props.children}    
    </AuthContext.Provider>)
}
export {AuthContextProvider};
export default AuthContext