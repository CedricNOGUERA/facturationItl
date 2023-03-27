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

  const validateQuoteTotal = globalData?.filter((bill: any) => bill.status === 'Validé')

  const validateQuoteAmount = validateQuoteTotal
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const pendingQuoteTotal = globalData?.filter((bill: any) => bill.status === 'En cours')

  const pendingQuoteAmount = pendingQuoteTotal
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const cancelQuoteTotal = globalData?.filter((bill: any) => bill.status === 'Annulé')

  const cancelQuoteAmount = cancelQuoteTotal
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
      defTitles : 'Signés par client',
      defTitle: 'Signé par client',
      ca: validateQuoteAmount,
      length: validateQuoteTotal.length,
      image: 'ri-checkbox-line',
    },
    {
      title: 'En cours',
      defTiles: 'En attente de signature',
      defTitle: 'En attente de signature',
      ca: pendingQuoteAmount,
      length: pendingQuoteTotal.length,
      image: 'ri-time-line',
    },
    {
      title: 'Annulés',
      defTitles: 'Annulés',
      defTitle: 'Annulé',
      ca: cancelQuoteAmount,
      length: cancelQuoteTotal.length,
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
                <span className='text-muted'>Devis envoyés</span>
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
                  <span className='text-muted'>{bill?.length > 1 ? bill?.defTitles : bill?.defTitle}</span>
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
