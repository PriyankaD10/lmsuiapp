import React, { Component }  from 'react';
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
export const withRouter = (Component) => {
    const Wrapper = props => {
        //debugger
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const selector = useSelector((state=> state.user.value));
        return <Component navigate = {navigate} selector = {selector} dispatch={dispatch} {...props}/>
    }
    return Wrapper;
  }