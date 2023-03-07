import React from 'react'

const BottomTable = ({htAmount, totalTva_13, totalTva_16}: any) => {
  return (
    <>
      <div className='border-top border-top-dashed mt-2'>
        <table
          className='table table-borderless table-nowrap align-middle mb-0 ms-auto'
          style={{ width: '250px' }}
        >
          <tbody>
            <tr>
              <td>Total HT</td>
              <td className='text-end'>${htAmount}</td>
            </tr>

            {totalTva_13 !== 0 && (
              <tr>
                <td>Tva 13%</td>
                <td className='text-end'>${totalTva_13}</td>
              </tr>
            )}
            {totalTva_16 !== 0 && (
              <tr>
                <td>Tva 16%</td>
                <td className='text-end'>${totalTva_16}</td>
              </tr>
            )}

            <tr>
              <td>CPS (1%)</td>
              <td className='text-end'>{htAmount * 0.01}</td>
            </tr>

            <tr className='border-top border-top-dashed fs-15'>
              <th scope='row'>Total TTC</th>
              <th className='text-end'>${htAmount + htAmount * 0.13 + htAmount * 0.01}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-3'>
        <h6 className='text-muted text-uppercase fw-semibold mb-3 fs-13'>Compte itahiti Lab:</h6>
        <p className='text-muted mb-1'>
          BANQUE:{' '}
          <span className='fw-medium' id='payment-method'>
           🍀SUCKREDO
          </span>
        </p>
        <p className='text-muted mb-1'>
          IBAN:{' '}
          <span className='fw-medium' id='payment-method'>
            FR654-6478-7894-8521 25
          </span>
        </p>
        
      </div>
      <div className='mt-4'>
        <div className='alert alert-info'>
          <p className='mb-0'>
            <span className='fw-semibold'>NOTES :</span>
            <span id='note'>
              Tous les comptes doivent être payés dans les 45 jours suivant la réception de
              facture. A régler par chèque ou carte bancaire ou paiement direct en ligne. Si le
              compte n'est pas payé dans les 45 jours, une majoration du total de la facture
              vous sera imputé .
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default BottomTable