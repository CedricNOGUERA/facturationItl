const TableHeader = () => {
  return (
    <thead className='align-middle'>
      <tr className='table-active'>
        <th scope='col' style={{ width: '50px' }}>
          #
        </th>
        <th scope='col'>Désignations</th>
        <th scope='col' style={{ width: '80px' }}>
          <div className='d-flex currency-select input-light align-items-center '>Tva</div>
        </th>
        <th scope='col' style={{ width: '120px' }}>
          <div className='d-flex currency-select input-light align-items-center'>Prix</div>
        </th>
        <th scope='col' style={{ width: '105px' }}>
          Quantité
        </th>
        <th scope='col' style={{ width: '105px' }}>
          Montant Tva
        </th>
        <th scope='col' className='text-end' style={{ width: '150px' }}>
          Montant HT
        </th>
        <th scope='col' className='text-end' style={{ width: '105px' }}></th>
      </tr>
    </thead>
  )
}

export default TableHeader
