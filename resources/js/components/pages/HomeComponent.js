import React, { useEffect, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { login, } from '../../redux/actions/authActions'
import { getUsers, } from '../../redux/actions/usersActions'

export default function HomeComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    users: state.users,
  }))

  useEffect(() => {
    dispatch(login({email: 'jane@doe.com', password: 'secret',}))
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [state.auth,])

  const handlePageChange = ({ selected, }) => {
    const newPage = selected + 1
    if (selected > state.users.data.last_page) {
      return
    }
    dispatch(getUsers(newPage))
  }

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  const renderList = () => {
    if (!state.users.data) {
      return null
    }
    return (
      <>
        <ul className="list-group">
          {state.users.data.data.map((user, index) => (
            <li key={index} className='list-group-item'>
              <strong>name</strong> ({user.first_name} {user.last_name}), 
              <strong>email</strong> ({user.email}),
              <strong>created_at</strong> ({parseDate(user.created_at)}),
              <strong>updated_at</strong> ({parseDate(user.updated_at)})
            </li>
          ))}
        </ul>
        <strong>page</strong> ({state.users.data.current_page}),
        <strong>page_count</strong> ({state.users.data.last_page}),
        <strong>displayed_items</strong> ({state.users.data.data.length}),
        <strong>items</strong> ({state.users.data.total})
      </>
    )
  }

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (!state.users.loading && typeof state.users.data === 'object' && null !== state.users.data) {
    console.log('users', state.users.data)
  }
  if (state.auth.loading || state.users.loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className='container'>
        <br />
        <br />
        {renderList()}
        <br />
        <br />
        <button className='btn btn-primary'>
          Test button
        </button>
        {state.users.data ?
          <>
            <br />
            <ReactPaginate
              onPageChange={handlePageChange}
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={state.users.data.last_page}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName="pagination"
              activeClassName="active"
              forcePage={state.users.data.current_page - 1}
            />
          </> : null}
      </div>
    </>       
  )
}
