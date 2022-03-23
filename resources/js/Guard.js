import React from 'react'
import { Route, Navigate, } from 'react-router-dom'

export const Guard = ({
  component:Component, 
  token:Token, 
  routeRedirect,
  ...rest
}) => (
  <Route {...rest} render={props => (
      localStorage.getItem(Token) ?
      <Component {...props}/> : 
      <Navigate
        replace 
        to={{ 
          pathname:routeRedirect, 
          state: {
            from:props.location,
          },
        }} 
      />
  )}/>
)
