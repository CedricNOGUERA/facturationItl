import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className='app-menu navbar-menu'>
      <div className='navbar-brand-box'>
        <a href='index.html' className='logo logo-dark'>
          <span className='logo-sm'>
            <img src='assets/images/logo-sm.png' alt='' height='22' />
          </span>
          <span className='logo-lg'>
            <img src='assets/images/logo-dark.png' alt='' height='45' />
          </span>
        </a>

        <button
          type='button'
          className='btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover'
          id='vertical-hover'
        >
          <i className='ri-record-circle-line'></i>
        </button>
      </div>
      <div id='scrollbar'>
        <div className='container-fluid'>
          <div id='two-column-menu'></div>
          <ul className='navbar-nav' id='navbar-nav'>
            <li className='nav-item'>
              <a
                className='nav-link menu-link'
                href='#sidebarApps'
                data-bs-toggle='collapse'
                role='button'
                aria-expanded='false'
                aria-controls='sidebarApps'
              >
                <i className='ri-apps-2-line'></i> <span data-key='t-apps'>Menu</span>
              </a>
              <div className='collapse menu-dropdown' id='sidebarApps'>
                <ul className='nav nav-sm flex-column'>
                  <li className='nav-item'>
                    <Link to='/list-devis' className='nav-link' role='button'>
                      {' '}
                      Liste des devis
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link' role='button'>
                      {' '}
                      Liste des factures
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='sidebar-background'></div>
    </div>
  )
};

export default SideBar;
