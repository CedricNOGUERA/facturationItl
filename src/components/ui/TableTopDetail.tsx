import React from 'react'

const TableTopDetail = () => {
  return (
    <thead>
      <tr className='table-active'>
        <th scope='col' style={{ width: '50px' }}>
          #
        </th>
        <th scope='col'>Désignations</th>
        <th scope='col'>Tva</th>
        <th scope='col'>Montant unitaire (XPF)</th>
        <th scope='col'>Quantité</th>
        {/* <th scope='col'>Montant Tva</th> */}
        <th scope='col' className='text-end'>
          Montant HT (XPF)
        </th>
      </tr>
    </thead>
  )
}

export default TableTopDetail
