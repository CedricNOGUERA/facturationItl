import React from 'react'

interface bottomTableProps {
  htAmount: number
  totalTva_13: number
  totalTva_16: number
}

const BottomTable: React.FC<bottomTableProps> = ({ htAmount, totalTva_13, totalTva_16 }) => {
  return (
    <>
      <div className='row border-top border-top-dashed mt-2 pt-5'>
        <div className='col-6 pt-5'>
          <table className='table table-striped' style={{ width: '350px' }}>
            <tbody>
              <tr>
                <td>Compte iTahiti Lab</td>
                <td className='text-en'></td>
              </tr>
              <tr>
                <td> BANQUE:</td>
                <td className='text-ed'> 🍀SOCREDO</td>
              </tr>
              <tr>
                <td className='border-0'>IBAN:</td>
                <td className='text-en border-0'>FR654-6478-7894-8521 25</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-6'>
          <table
            className='table table-borderless table-nowrap align-middle mb-0 ms-auto'
            style={{ width: '250px' }}
          >
            <tbody>
              <tr>
                <td>Total HT</td>
                <td className='text-end'>{new Intl.NumberFormat().format(htAmount)}</td>
              </tr>

              {totalTva_13 !== 0 && (
                <tr>
                  <td>Tva 13%</td>
                  <td className='text-end'>{new Intl.NumberFormat().format(totalTva_13)}</td>
                </tr>
              )}
              {totalTva_16 !== 0 && (
                <tr>
                  <td>Tva 16%</td>
                  <td className='text-end'>{new Intl.NumberFormat().format(totalTva_16)}</td>
                </tr>
              )}

              <tr>
                <td>CPS (1%)</td>
                <td className='text-end'>{new Intl.NumberFormat().format(htAmount * 0.01)}</td>
              </tr>

              <tr className='border-top border-top-dashed fs-15'>
                <th scope='row'>Total TTC</th>
                <th className='text-end'>{new Intl.NumberFormat().format(htAmount + totalTva_13 + totalTva_16 + htAmount * 0.01)}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-4'>
        <div className='alert alert-info'>
          <p className='mb-0'>
            <span className='fw-semibold'>NOTES :</span>
            <span id='note'>
            Tous les comptes doivent être payés dans les 45 jours suivant la réception de facture. A régler par chèque ou carte bancaire ou paiement direct en ligne. Si le compte n'est pas payé dans les 45 jours, une majoration du total de la facture vous sera imputé.
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default BottomTable
