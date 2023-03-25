import { CheckCircleTwoTone } from '@ant-design/icons'
import emailjs from '@emailjs/browser'
import { notification } from 'antd'
import React, { useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import BgAuth from '../../components/ui/BgAuth'
import ButtonAuth from '../../components/ui/ButtonAuth'
import FooterAuth from '../../components/ui/FooterAuth'
import HeaderAuth from '../../components/ui/HeaderAuth'
import userAuthStore from '../../store/userAuthStore'
import { supabase } from '../../utils/supabaseClient'

const ForgotPassword = () => {
  const form: any = useRef()
  const navigate = useNavigate()

  const authLogin = userAuthStore((state: any) => state.authLogin)

  const [isMail, setIsMail] = React.useState<boolean>(false)
  const [email, setEmail] = React?.useState<string>('')
  const [flag, setFlag] = React?.useState<string>('')
  const [userId, setUserId] = React?.useState<string>('')
  const [errorEmail, setErrorEmail] = React?.useState<boolean>(false)

  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: 'Félicitation',
      description: 'Vous allez recevoir un email.',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
    })
  }

  const getUserId = async () => {
    const { data: users, error: error }: any = await supabase
      .from('users')
      .select('*')
      .eq('email', email)

    if (users) {
      setFlag(users)
      console.log(users)
      console.log('object')
    }
    if (error) {
      console.log('no result')
    }
  }

  const sendEmail = async (e: any) => {
    e.preventDefault()

    setIsMail(true)

    const { data: users, error }: any = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (users) {
      setFlag(users)
      console.log(users)
      console.log('object')

      emailjs
        .sendForm('invoiceitl_service', 'template_pnr0mid', form?.current, 'GivYhKQYsq1vBus6G')
        .then(
          (result: any) => {
            authLogin(false, 'true', null, null, null, null)
            setIsMail(false)

            openNotification()
          },
          (error) => {
            console.log(error.text)
            alert(error.text)
            setIsMail(false)
          }
        )
    }
    if (error) {
      console.log('no result')
      setErrorEmail(true)
      setIsMail(false)
    }
  }

  return (
    <div className='auth-page-wrapper pt-lg-5'>
      {contextHolder}
      <BgAuth />
      <div className='auth-page-content mt-lg-2  mt-3'>
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
                      style={{ width: '60px', height: '60px' }}
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
                    <form ref={form} onSubmit={sendEmail}>
                      <input
                        type='hidden'
                        name='flag'
                        id='flag'
                        className='form-control'
                        value={flag}
                        readOnly
                      />
                      <div className='mb-4'>
                        <label className='form-label'>Email</label>
                        <input
                          type='email'
                          name='user_email'
                          className='form-control'
                          id='email'
                          placeholder='Entrez votre email'
                          value={email}
                          onChange={(e) => {
                            setErrorEmail(false)
                            setEmail(e.currentTarget.value)
                          }}
                        />
                        {errorEmail && (
                          <div className='text-center mt-2'>
                            <i className='ri-file-warning-line fs-5 align-middle text-info'></i>{' '}
                            <span className='text-danger bg-soft-warning border border-danger py-1 px-2 rounded-pill'>
                              {' '}
                              <small>
                                {' '}
                                Vous n'êtes pas enregistré, contact votre administrateur
                              </small>
                            </span>
                          </div>
                        )}
                      </div>
                      {isMail ? (
                        <div className='text-center mt-4'>
                          <button className='btn btn-success w-100' type='submit'>
                            <Spinner style={{ width: '14px', height: '14px' }} />{' '}
                            <span className='ms-3 m-auto'> Envoi en cours ...</span>
                          </button>
                        </div>
                      ) : (
                        <>
                          <ButtonAuth
                            text={'Envoyer'}
                            icon={'ri-send-plane-fill'}
                            disabled={false}
                          />
                        </>
                      )}
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
