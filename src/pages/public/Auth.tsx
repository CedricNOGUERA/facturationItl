import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import BgAuth from '../../components/ui/BgAuth'
import ButtonAuth from '../../components/ui/ButtonAuth'
import FooterAuth from '../../components/ui/FooterAuth'
import HeaderAuth from '../../components/ui/HeaderAuth'
import userAuthStore from '../../store/userAuthStore'
import { _getUserData } from '../../utils/function'
const Auth = () => {
  const isLogged = userAuthStore((states: any) => states.isLogged)
  const authLogin = userAuthStore((state: any) => state.authLogin)

  const [isError, setIsError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [userData, setUserData] = React.useState<any>([])

  const [formName, setformName] = React.useState<string>('')
  const [formPass, setformPass] = React.useState<string>('')

  const [eye, setEye] = React.useState<boolean>(false)


  React.useEffect(() => {
    _getUserData(setUserData)
  }, [])

  const authentification = (e: any) => {
    e.preventDefault()
    const userAuth = userData?.filter(
      (filt: any) => filt.username === formName && filt.pass === formPass
    )

    if (
      userAuth.length > 0 &&
      userAuth[0] &&
      userAuth[0].username === formName &&
      userAuth[0].pass === formPass
    ) {
      setformName('')
      setformPass('')
      setIsError(false)
      authLogin(
        true,
        userAuth[0].id,
        userAuth[0].first_name,
        userAuth[0].last_name,
        userAuth[0].avatar,
        userAuth[0].company_id
      )
    } else {
      setIsError(true)
    }
  }

  return (
    <div className='auth-page-wrapper pt-5'>
      {isLogged && <Navigate to='/' />}
      <BgAuth />
      <div className='auth-page-content mt-lg-5'>
        <div className='container'>
          <HeaderAuth />
          <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 col-xl-5'>
              <div className='card mt-4'>
                <div className='card-body p-4'>
                  <div className='text-center mt-2'>
                    <h5 className='text-primary'>Bienvenu !</h5>
                    <p className='text-muted'>
                      Identifiez-vous pour continue vers{' '}
                      <span className='invoice-auth'>Invoice manager</span>.
                    </p>
                  </div>
                  <div className='p-2 mt-4'>
                    <form action='index.html' id='form' onSubmit={authentification}>
                      <div className='mb-3'>
                        <input
                          required
                          type='text'
                          className='form-control'
                          id='username'
                          placeholder='Entrez votre identifiant'
                          value={formName}
                          onChange={(e) => {
                            setformName(e.currentTarget.value)
                          }}
                        />
                      </div>
                      <div className='mb-3'>
                        <div className='float-end'>
                          <Link to='/forgot-password' className='text-muted'>
                            Mot de passe oublié ?
                          </Link>
                        </div>
                        <label className='form-label' htmlFor='password-input'>
                          Mot de passe
                        </label>
                        <div className='position-relative auth-pass-inputgroup mb-3'>
                          <input
                            required
                            type={!eye ? 'password' : 'text'}
                            className='form-control pe-5 password-input'
                            placeholder='Entrez votre mot de passe'
                            id='password-input'
                            value={formPass}
                            onChange={(e) => {
                              setformPass(e.currentTarget.value)
                            }}
                          />
                          <button
                            className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon'
                            type='button'
                            id='password-addon'
                            onClick={() => setEye(!eye)}
                          >
                            {!eye ? (
                              <i className='ri-eye-fill align-middle'></i>
                            ) : (
                              <i className='ri-eye-off-fill align-middle'></i>
                            )}
                          </button>
                        </div>
                      </div>
                      {isError && (
                        <>
                          <p style={{ color: 'red' }}>
                            <img
                              src='https://img.icons8.com/stickers/25/delete-shield.png'
                              alt='icon'
                              loading='lazy'
                            />{' '}
                            <b>Erreur sur vos informations</b>
                          </p>
                        </>
                      )}

                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='rememberMe'
                          id='auth-remember-check'
                        />
                        <label className='form-check-label' htmlFor='auth-remember-check'>
                          Se souvenir de moi.
                        </label>
                      </div>

                      <ButtonAuth text={"S'identifier"} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterAuth />
    </div>
  )
}

export default Auth
