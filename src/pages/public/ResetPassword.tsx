import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import BgAuth from '../../components/ui/Auth/BgAuth'
import ButtonAuth from '../../components/ui/Auth/ButtonAuth'
import FooterAuth from '../../components/ui/Auth/FooterAuth'
import HeaderAuth from '../../components/ui/Auth/HeaderAuth'
import userAuthStore from '../../store/userAuthStore'
import { supabase } from '../../utils/supabaseClient'

const ResetPassword = () => {
  const params = useParams()

  const [pass, setPass] = React.useState<string>('')
  const [passConf, setPassConf] = React.useState<string>('')
  const [eye, setEye] = React.useState<boolean>(false)
  const [eye2, setEye2] = React.useState<boolean>(false)


  const user_id = userAuthStore((state: any) => state.id)

  const resetPass = async() => {
    
const { data, error } = await supabase
.from('users')
.update({ other_column: 'otherValue' })
.eq('some_column', 'someValue')

  }
console.log(user_id)

  return (
    <div className='auth-page-wrapper pt-lg-5'>
      {params.flag === 'true'}
      {/* {contextHolder} */}
      <BgAuth />
      <div className='auth-page-content mt-lg-2 mt-3'>
        <div className='container'>
          <HeaderAuth />
          <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 col-xl-5'>
              <div className='card mt-4'>
                <div className='card-body p-4'>
                  <div className='text-center mt-2'>
                    <h5 className='text-primary'>Réinitialisez votre mot de passe?</h5>
                    <lord-icon
                      src='https://cdn.lordicon.com/vlupvdhl.json'
                      trigger='hover'
                      colors='primary:#0ab39c'
                      style={{ width: '120px', height: '80PX' }}
                      className='avatar-xl'
                    ></lord-icon>
                  </div>

                  <div className='p-2'>
                    <form
                    // ref={form} onSubmit={resetPass}
                    >
                      <div className='mb-4'>
                        <label className='form-label'>Nouveau mot de passe</label>
                        <div className='position-relative auth-pass-inputgroup mb-3'>
                          <input
                            required
                            name='pass'
                            type={!eye ? 'password' : 'text'}
                            className='form-control pe-5 password-input'
                            placeholder='Entrez votre mot de passe'
                            id='pass'
                            value={pass}
                            onChange={(e) => {
                              setPass(e.currentTarget.value)
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
                      <div className='mb-4'>
                        <label className='form-label'>Confirmation</label>
                        <div className='position-relative auth-pass-inputgroup mb-3'>
                          <input
                            required
                            type={!eye2 ? 'password' : 'text'}
                            name='user_email'
                            className='form-control'
                            id='passConf'
                            placeholder='Confirmez votre mot de passe'
                            value={passConf}
                            onChange={(e) => setPassConf(e.currentTarget.value)}
                          />

                          <button
                            className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon'
                            type='button'
                            id='password-addon'
                            onClick={() => setEye2(!eye2)}
                          >
                            {passConf?.length > 3 && pass === passConf ? (
                              <i className='ri-shield-check-line align-middle text-info'></i>
                            ) : !eye2 ? (
                              <i className='ri-eye-fill align-middle'></i>
                            ) : (
                              <i className='ri-eye-off-fill align-middle'></i>
                            )}
                          </button>
                        </div>
                        {passConf?.length > 3 && pass !== passConf && (
                          <>
                            <div className='text-danger text-center mt-2'>
                              <i className='ri-file-warning-line align-bottom'></i> Saisissez
                              le même mot de passe{' '}
                            </div>
                          </>
                        )}
                        <ButtonAuth
                          text={'Réinitialiser'}
                          icon={'ri-restart-line'}
                          disabled={passConf?.length > 3 && pass !== passConf ? true : false}
                        />
                      </div>
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

export default ResetPassword
