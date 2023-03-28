import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import userAuthStore from '../../store/userAuthStore'

const Header = () => {
  const dataStore = userAuthStore((state: any) => state)
  const authLogout = userAuthStore((state: any) => state.authLogout)


  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header id='page-topbar' className='fade-in-navbar w3-container w3-center w3-animate-top'>
       <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fw-bold fs-3'>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='container-fluid'>
          <div id='two-column-menu'></div>
          <ul className='navbar-nav' id='navbar-nav'>
            <li className='nav-item'>
              <div className=' menu-dropdown' id='sidebarApps'>
                <ul className='nav nav-sm flex-column'>
                  <li className='nav-item' onClick={handleClose}>
                    <Link to='/' className='nav-link text-secondary fs-5 fw-bold' role='button'>
                      {' '}
                      Liste des devis
                    </Link>
                  </li>
                  <li className='nav-item' onClick={handleClose}>
                    <Link to='/' className='nav-link text-secondary fs-5 fw-bold' role='button'>
                      {' '}
                      Liste des factures
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className='layout-width'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box horizontal-logo'>
              <span className='logo logo-dark'aria-label="home">
                <span className='logo-lg'>
                  <img src='/assets/images/logo-dark.png' alt='logo' width='194' height='45' />
                </span>
              </span>
            </div>
            <button
              type='button'
              aria-label="menu"
              className='btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger'
              id='topnav-hamburger-icon'
              onClick={handleShow}
            >
              <span className='hamburger-icon'>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            
          </div>
          <div className='d-flex align-items-center'>
            <div className='dropdown d-md-none topbar-head-dropdown header-item'>
              <button
                type='button'
                className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
                id='page-header-search-dropdown'
                data-bs-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                aria-label="search"
              >
                <i className='bx bx-search fs-22'></i>
              </button>
              <div
                className='dropdown-menu dropdown-menu-lg dropdown-menu-end p-0'
                aria-labelledby='page-header-search-dropdown'
              >
                <form className='p-3'>
                  <div className='form-group m-0'>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search ...'
                        aria-label="Recipient's username"
                        readOnly
                      />
                      <button className='btn btn-primary' type='submit'>
                        <i className='mdi mdi-magnify'></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='dropdown ms-sm-3 header-item topbar-user'>
              <button
                type='button'
                className='btn'
                id='page-header-user-dropdown'
                data-bs-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                aria-label="avatar"
              >
                <span className='d-flex align-items-center'>
                  <img
                    className='rounded-circle header-profile-user'
                    src={dataStore.avatar}
                    alt='Header Avatar'
                  />
                  <span className='text-start ms-xl-2'>
                    <span className='d-none d-xl-inline-block ms-1 fw-medium user-name-text'>
                      {dataStore.firstname}
                    </span>
                    <span className='d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text'>
                     
                    </span>
                  </span>
                </span>
              </button>
              <div className='dropdown-menu dropdown-menu-end'>
                <h6 className='dropdown-header'>Welcome {dataStore.firstname} !</h6>
                <span aria-label="profile" className='dropdown-item' 
                >
                  <i className='mdi mdi-account-circle text-muted fs-16 align-middle me-1'></i>{' '}
                  <span className='align-middle'>Profile</span>
                </span>
                <div className='dropdown-divider'></div>
                <span aria-label="new" className='dropdown-item' 
                >
                  <span className='badge bg-soft-success text-success mt-1 float-end'>
                    New
                  </span>
                  <i className='mdi mdi-cog-outline text-muted fs-16 align-middle me-1'></i>{' '}
                  <span className='align-middle'>Settings</span>
                </span>
                <span className='dropdown-item' onClick={authLogout} >
                  <i className='mdi mdi-logout text-muted fs-16 align-middle me-1'></i>{' '}
                  <span className='align-middle' data-key='t-logout'>
                    Logout
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
