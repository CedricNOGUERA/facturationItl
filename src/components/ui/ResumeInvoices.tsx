import React from 'react'
import CountUp from 'react-countup'
import { useOutletContext } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'

const ResumeInvoices = () => {
  const [globalData, setGlobalData] = React.useState<any>([])
  const [invoicesData] = useOutletContext<any>()

  React.useEffect(() => {
    getInvoices()
  }, [invoicesData])

  const paidInvoicesNumber = globalData?.filter((bill: any) => bill.status === 'Payée')

  const paidInvoices = globalData
    ?.filter((bill: any) => bill.status === 'Payée')
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const unpaidInvoicesNumber = globalData?.filter((bill: any) => bill.status === 'Impayée')

  const unpaidInvoices = globalData
    ?.filter((bill: any) => bill.status === 'Impayée')
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const cancelInvoicesNumber = globalData?.filter((bill: any) => bill.status === 'Annulée')

  const cancelInvoices = globalData
    ?.filter((bill: any) => bill.status === 'Annulée')
    .reduce((acc: any, current: any) => acc + current.amount_ttc, 0)

  const getInvoices = async () => {
    let { data: invoices, error } = await supabase.from('invoices2').select('*, detailBill(*)')

    if (invoices) {
      setGlobalData(invoices)
    }
    if (error) {
      console.log(error)
    }
  }

  const invoiceTab = [
    {
      title: 'Payées',
      ca: paidInvoices,
      length: paidInvoicesNumber.length,
      image: 'ri-checkbox-line',
    },
    {
      title: 'Impayées',
      ca: unpaidInvoices,
      length: unpaidInvoicesNumber.length,
      image: 'ri-time-line',
    },
    {
      title: 'Annulées',
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
                <p className='text-uppercase fw-semibold text-muted mb-0'>Total facture</p>
              </div>
              <div className='flex-shrink-0'>
                <h5 className='text-success fs-14 mb-0'>
                  <i className='ri-arrow-right-up-line fs-13 align-middle'></i> +89.24 %
                </h5>
              </div>
            </div>
            <div className='d-flex align-items-end justify-content-between mt-4'>
              <div>
                <h4 className='fs-22 fw-semibold ff-secondary mb-4'>
                  <span className='counter-value' data-target='559.25'>
                    {globalData &&
                      // new Intl.NumberFormat().format(
                      //   globalData.reduce(
                      //     (acc: any, current: any) => acc + current.amount_ttc,
                      //     0
                      //   )
                      // )
                      <CountUp delay={1} separator=" " end={ globalData.reduce(
                        (acc: any, current: any) => acc + current.amount_ttc,
                        0
                      )} />
                      }
                  </span>
                </h4>
                <span className='badge bg-warning me-1'>{globalData.length}</span>{' '}
                <span className='text-muted'>Factures envoyées</span>
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

      {invoiceTab?.map((bill: any) => (
        <div key={Math.random()} className='col-xl-3 col-md-6'>
          <div className='card card-animate'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='flex-grow-1'>
                  <p className='text-uppercase fw-semibold text-muted mb-0'>{bill?.title}</p>
                </div>
                <div className='flex-shrink-0'>
                  <h5 className='text-danger fs-14 mb-0'>
                    <i className='ri-arrow-right-down-line fs-13 align-middle'></i> +8.09 %
                  </h5>
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

export default ResumeInvoices
