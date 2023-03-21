import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className='app-menu navbar-menu fade-in-navbar w3-container w3-center w3-animate-top'>
      <div className='navbar-brand-box'>
        <a aria-label="home" href='index.html' className='logo logo-dark'>
          
          <span className='logo-lg'>
            <img src='assets/images/logo-dark.png' alt='' height='45' />
          </span>
        </a>

        <button
          type='button'
          className='btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover'
          id='vertical-hover'
          aria-label="app"
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
              aria-label="app"
                className='nav-link menu-link'
                href='#sidebarApps'
                data-bs-toggle='collapse'
                role='button'
                aria-expanded='false'
                aria-controls='sidebarApps'
              >
                <i className='ri-apps-2-line'></i> <span data-key='t-apps'>Menuu</span>
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
