import React from 'react'
import { useNavigate, } from 'react-router-dom'

export default function HomeComponent() {
  const navigate = useNavigate()
  
  return (
    <>
      <div className={styles.body}>
        <h1>Test</h1>
        <button className='btn btn-primary'>
          Test button
        </button>
      </div>
    </>       
  )
}

const styles = {
  body: {
    backgroundColor: 'yellow',
  },
}
