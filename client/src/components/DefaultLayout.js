import React from "react";
import { Dropdown } from "antd";
import {useNavigate} from 'react-router-dom'

import "../resources/default-layout.css";
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("xpense-tracker-user"));
  const navigate = useNavigate()
  const items =[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('xpense-tracker-user')
              navigate("/login");
            }}>Logout</li>
          ),
        }
      ]
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Xpense Tracker</h1>
        </div>
        <div>
          <Dropdown menu={{items,}} placement="bottomLeft">
            <button className='primary'>{user.name}</button>
          </Dropdown>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
