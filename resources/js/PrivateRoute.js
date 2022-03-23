import React from 'react'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Home from './components/pages/HomeComponent'

export default function PrivateRoute(props) {
  return (
    <div>
      {/*<Header/>*/}
       <Routes>
          <Route exact path={`${props.match.path}/`} element={<Home />}/>
          <Route exact path={props.match.path} render={props=> (
            <Navigate to={{ pathname: `${props.match.path}/` }} replace />
          )} />
       </Routes>
    </div>
  )
}
