import React from 'react'

const BankAccountData = () => {
  return (
    // <table className='table table-striped banx-info'>
    //   <tbody>
    //     <tr>
    //       <td>Compte iTahiti Lab</td>
    //       <td className='text-en'></td>
    //     </tr>
    //     <tr>
    //       <td> BANQUE:</td>
    //       <td className='text-ed'>SOCREDO</td>
    //     </tr>
    //     <tr>
    //       <td className='border-0'>IBAN:</td>
    //       <td className='text-en border-0'>FR654-6478-7894-8521 25</td>
    //     </tr>
    //   </tbody>
    // </table>
    <div className='bank-info'>
    <p>Montants hors fret, dédouanement et D&T si applicables (facturation séparée)

    <br/>
    Le présent devis est valable pour une durée de 30 jours à compter de sa date d'émission.
    <br/>
    Le paiement sera effectué par virement bancaire sur le compte Banque de Polynésie: 12149 06730 30006646977 10
    <br/>
    Echéance au : 30 jours fin de mois</p>
    </div>
  )
}

export default BankAccountData
