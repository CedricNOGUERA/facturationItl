import React from 'react'
import { Link } from 'react-router-dom'
import BgAuth from '../../components/ui/BgAuth'
import ButtonAuth from '../../components/ui/ButtonAuth'
import FooterAuth from '../../components/ui/FooterAuth'
import HeaderAuth from '../../components/ui/HeaderAuth'

const ForgotPassword = () => {
  return (
    <div className='auth-page-wrapper pt-5'>
      <BgAuth />

      <div className='auth-page-content mt-lg-5'>
        <div className='container'>
          <HeaderAuth />
          <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 col-xl-5'>
              <div className='card mt-4'>
                <div className='card-body p-4'>
                  <div className='text-center mt-2'>
                    <h5 className='text-primary'>Mot de passe oublié?</h5>
                    <p className='text-muted'>Réinitialisé le</p>
                    <lord-icon
                      src='https://cdn.lordicon.com/rhvddzym.json'
                      trigger='loop'
                      colors='primary:#0ab39c'
                      style={{ width: '120px', height: '120px' }}
                      className='avatar-xl'
                    ></lord-icon>
                  </div>
                  <div
                    className='alert alert-borderless alert-warning text-center mb-2 mx-2'
                    role='alert'
                  >
                    Entrez votre email et suivez les instructions qui vous seront envoyées
                  </div>
                  <div className='p-2'>
                    <form>
                      <div className='mb-4'>
                        <label className='form-label'>Email</label>
                        <input
                          type='email'
                          className='form-control'
                          id='email'
                          placeholder='Entrer votre email'
                        />
                      </div>
                      <ButtonAuth text={'Envoyer'} />
                    </form>
                  </div>
                </div>
              </div>
              <div className='mt-4 text-center'>
                <p className='mb-0'>
                  Attendez, je me souviens de mon mot de passe...{' '}
                  <Link
                    to='/connexion'
                    className='fw-bold text-primary text-decoration-underline'
                  >
                    {' '}
                    Cliquez ici{' '}
                  </Link>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterAuth />
    </div>
  )
}

export default ForgotPassword
