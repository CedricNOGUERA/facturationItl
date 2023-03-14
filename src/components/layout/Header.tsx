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
    <header id='page-topbar'>
       <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fw-bold fs-3'>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='container-fluid'>
          <div id='two-column-menu'></div>
          <ul className='navbar-nav' id='navbar-nav'>
            <li className='nav-item'>
              {/* <a
                className='nav-link menu-link'
                href='#sidebarApps'
                data-bs-toggle='collapse'
                role='button'
                aria-expanded='false'
                aria-controls='sidebarApps'
              >
                <i className='ri-apps-2-line'></i> <span data-key='t-apps'>Apps</span>
              </a> */}
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
              <a href='index.html' className='logo logo-dark'>
                <span className='logo-sm'>
                  <img src='assets/images/logo-sm.png' alt='' height='22' />
                </span>
                <span className='logo-lg'>
                  <img src='assets/images/logo-dark.png' alt='' height='45' />
                </span>
              </a>
            </div>
            <button
              type='button'
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
            <form className='app-search d-none d-md-block'>
              <div className='position-relative'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search...'
                  autoComplete='off'
                  id='search-options'
                  // value=""
                  readOnly
                />
                <span className='mdi mdi-magnify search-widget-icon'></span>
                <span
                  className='mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none'
                  id='search-close-options'
                ></span>
              </div>
              <div className='dropdown-menu dropdown-menu-lg' id='search-dropdown'>
                <div data-simplebar style={{ maxHeight: '320px' }}>
                  <div className='dropdown-header'>
                    <h6 className='text-overflow text-muted mb-0 text-uppercase'>
                      Recent Searches
                    </h6>
                  </div>

                  <div className='dropdown-item bg-transparent text-wrap'>
                    <a href='index.html' className='btn btn-soft-secondary btn-sm btn-rounded'>
                      how to setup <i className='mdi mdi-magnify ms-1'></i>
                    </a>
                    <a href='index.html' className='btn btn-soft-secondary btn-sm btn-rounded'>
                      buttons <i className='mdi mdi-magnify ms-1'></i>
                    </a>
                  </div>

                  <div className='dropdown-header mt-2'>
                    <h6 className='text-overflow text-muted mb-1 text-uppercase'>Pages</h6>
                  </div>

                  <a href='/' className='dropdown-item notify-item'>
                    <i className='ri-bubble-chart-line align-middle fs-18 text-muted me-2'></i>
                    <span>Analytics Dashboard</span>
                  </a>

                  <a href='/' className='dropdown-item notify-item'>
                    <i className='ri-lifebuoy-line align-middle fs-18 text-muted me-2'></i>
                    <span>Help Center</span>
                  </a>

                  <a href='/' className='dropdown-item notify-item'>
                    <i className='ri-user-settings-line align-middle fs-18 text-muted me-2'></i>
                    <span>My account settings</span>
                  </a>

                  <div className='dropdown-header mt-2'>
                    <h6 className='text-overflow text-muted mb-2 text-uppercase'>Members</h6>
                  </div>

                  <div className='notification-list'>
                    <a href='/' className='dropdown-item notify-item py-2'>
                      <div className='d-flex'>
                        <img
                          src='assets/images/users/avatar-2.jpg'
                          className='me-3 rounded-circle avatar-xs'
                          alt='user-pic'
                        />
                        <div className='flex-1'>
                          <h6 className='m-0'>Angela Bernier</h6>
                          <span className='fs-11 mb-0 text-muted'>Manager</span>
                        </div>
                      </div>
                    </a>

                    <a href='/' className='dropdown-item notify-item py-2'>
                      <div className='d-flex'>
                        <img
                          src='assets/images/users/avatar-3.jpg'
                          className='me-3 rounded-circle avatar-xs'
                          alt='user-pic'
                        />
                        <div className='flex-1'>
                          <h6 className='m-0'>David Grasso</h6>
                          <span className='fs-11 mb-0 text-muted'>Web Designer</span>
                        </div>
                      </div>
                    </a>

                    <a href='/' className='dropdown-item notify-item py-2'>
                      <div className='d-flex'>
                        <img
                          src='assets/images/users/avatar-5.jpg'
                          className='me-3 rounded-circle avatar-xs'
                          alt='user-pic'
                        />
                        <div className='flex-1'>
                          <h6 className='m-0'>Mike Bunch</h6>
                          <span className='fs-11 mb-0 text-muted'>React Developer</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className='text-center pt-3 pb-1'>
                  <a href='pages-search-results.html' className='btn btn-primary btn-sm'>
                    View All Results <i className='ri-arrow-right-line ms-1'></i>
                  </a>
                </div>
              </div>
            </form>
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
                      {/* Founder */}
                    </span>
                  </span>
                </span>
              </button>
              <div className='dropdown-menu dropdown-menu-end'>
                <h6 className='dropdown-header'>Welcome {dataStore.firstname} !</h6>
                <a className='dropdown-item' href='pages-profile.html'>
                  <i className='mdi mdi-account-circle text-muted fs-16 align-middle me-1'></i>{' '}
                  <span className='align-middle'>Profile</span>
                </a>
                <div className='dropdown-divider'></div>
                <a className='dropdown-item' href='pages-profile-settings.html'>
                  <span className='badge bg-soft-success text-success mt-1 float-end'>
                    New
                  </span>
                  <i className='mdi mdi-cog-outline text-muted fs-16 align-middle me-1'></i>{' '}
                  <span className='align-middle'>Settings</span>
                </a>
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
