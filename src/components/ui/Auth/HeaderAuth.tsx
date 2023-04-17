import React from 'react'

const HeaderAuth: React.FC = () => {
  return (
    <div className='row'>
      <div className='col-lg-5 m-auto'>
        <div className='text-center mt-sm-5 mb-4 text-white-50'>
          <div className='logo-chat'>
            <div className='text-logo'>
              <img
                alt='Facture icon'
                src='https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/256/external-bill-ecommerce-kiranshastry-lineal-color-kiranshastry.png'
                style={{ width: '64px', height: '64px' }}
              />{' '}
              Invoice Manager
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderAuth
