import React from 'react'
import {FaGithub, FaTicketAlt} from 'react-icons/fa'
import { API } from '../apis/backend'
// import { simplefetch } from '../apis/simplefetch'

const Login = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col-12 my-4 py-4 text-center">
          <FaTicketAlt className="display-1 mt-4 text-danger"/>
          <h1 className="h1 mb-4"><span className="border-bottom px-5 pb-3 text-warning">Movie Log</span></h1>
        </div>
        <div className="col-12 p-4 m-4"></div>
        <a href={`${API}/login`} className=" btn btn-light col-md-4 offset-md-4 py-2 pb-3 rounded">
          <span className="h1 p-0 m-0"><FaGithub /></span><span className="h5 ml-4">Login with Github</span>
        </a>
      </div>
    </section>
  )
}

export default Login
