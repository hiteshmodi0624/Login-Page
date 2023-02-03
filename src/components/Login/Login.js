import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer=(prevState,action)=>{
  if(action.type==="USER_INPUT")
    return {value:action.val,isValid:action.val.includes('@')};
  else if(action.type==="INPUT_BLUR")
    return {value:prevState.value,isValid:prevState.value.includes('@')};
  else
    return {value:"",isValid:false}
}
const passwordReducer=(prevState,action)=>{
  if(action.type==="USER_INPUT")
    return {value:action.val,isValid:action.val.trim().length > 6};
  else if(action.type==="INPUT_BLUR")
    return {value:prevState.value,isValid:prevState.value.trim().length > 6};
  else
    return {value:"",isValid:false}
}
const Login = (props) => {
  const emailInputref=useRef();
  const passwordInputref=useRef();
  const ctx=useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:"",isValid:null})
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:"",isValid:null})
  const {isValid:emailIsValid}=emailState
  const {isValid:passwordIsValid}=passwordState
  useEffect(()=>{
      console.log("Checking Form Validity")
      setFormIsValid(emailIsValid&&passwordIsValid);
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:"USER_INPUT",val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_INPUT",val:event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
      ctx.onLogin(emailState.value, passwordState.value);
    else if(!emailIsValid)
      emailInputref.current.focus()
    else
      passwordInputref.current.focus()
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label="E-mail"
          isValid={emailIsValid}
          ref={emailInputref}
        />
        <Input
          id="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label="Password"
          isValid={passwordIsValid}
          ref={passwordInputref}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
