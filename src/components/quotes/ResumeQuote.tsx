import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'
import CountUp from 'react-countup'

const ResumeQuote = () => {
  const [globalData, setGlobalData] = React.useState<any>([])
  const [quotesData] = useOutletContext<any>()

  React.useEffect(() => {
    getInvoices()
  }, [quotesData])

  const paidInvoicesNumber = globalData?.filter((bill: any) => bill.status === 'Validé')

  const paidInvoices = globalData
    ?.filter((bill: any) => bill.status === 'Validé')
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const unpaidInvoicesNumber = globalData?.filter((bill: any) => bill.status === 'En cours')

  const unpaidInvoices = globalData
    ?.filter((bill: any) => bill.status === 'En cours')
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const cancelInvoicesNumber = globalData?.filter((bill: any) => bill.status === 'Annulé')

  const cancelInvoices = globalData
    ?.filter((bill: any) => bill.status === 'Annulé')
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const getInvoices = async () => {
    let { data: quotes, error } = await supabase.from('quotes').select('*')

    if (quotes) {
      setGlobalData(quotes)
    }
    if (error) {
      console.log(error)
    }
  }

  const quoteTab = [
    {
      title: 'Validés',
      ca: paidInvoices,
      length: paidInvoicesNumber.length,
      image: 'ri-checkbox-line',
    },
    {
      title: 'En cours',
      ca: unpaidInvoices,
      length: unpaidInvoicesNumber.length,
      image: 'ri-time-line',
    },
    {
      title: 'Annulés',
      ca: cancelInvoices,
      length: cancelInvoicesNumber.length,
      image: 'ri-close-circle-line',
    },
  ]

  return (
    <div className='row'>
      <div className='col-xl-3 col-md-6'>
        <div className='card card-animate'>
          <div className='card-body'>
            <div className='d-flex align-items-center'>
              <div className='flex-grow-1'>
                <p className='text-uppercase fw-semibold text-muted mb-0'>Total devis</p>
              </div>
            </div>
            <div className='d-flex align-items-end justify-content-between mt-4'>
              <div>
                <h4 className='fs-22 fw-semibold ff-secondary mb-4'>
                  <span className='counter-value county' data-target='559.25'>
                    {globalData && (
                      <CountUp
                        delay={1}
                        separator=' '
                        end={globalData.reduce(
                          (acc: any, current: any) => acc + current.amount_ttc,
                          0
                        )}
                      />
                    )}
                  </span>
                </h4>
                <span className='badge bg-warning me-1'>{globalData.length}</span>{' '}
                <span className='text-muted'>Devis envoyées</span>
              </div>
              <div className='avatar-sm flex-shrink-0'>
                <span className='avatar-title bg-light rounded fs-3'>
                  <i className='ri-file-text-line fs-3 align-middle text-success icon-dual-success'></i>{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {quoteTab?.map((bill: any) => (
        <div key={Math.random()} className='col-xl-3 col-md-6'>
          <div className='card card-animate'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='flex-grow-1'>
                  <p className='text-uppercase fw-semibold text-muted mb-0'>{bill?.title}</p>
                </div>
              
              </div>
              <div className='d-flex align-items-end justify-content-between mt-4'>
                <div>
                  <h4 className='fs-22 fw-semibold ff-secondary mb-4'>
                    <span className='counter-value' data-target='409.66'>
                      {bill?.ca ? new Intl.NumberFormat().format(bill?.ca) : '0'}
                    </span>
                  </h4>
                  <span className='badge bg-warning me-1'>{bill?.length}</span>{' '}
                  <span className='text-muted'>{bill?.title}</span>
                </div>
                <div className='avatar-sm flex-shrink-0'>
                  <span className='avatar-title bg-light rounded fs-3'>
                    <i
                      className={`${bill.image} fs-3 align-middle text-success icon-dual-success`}
                    ></i>{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResumeQuote
