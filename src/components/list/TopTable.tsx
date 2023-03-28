
const TopTable = ({ topTableProps }: any) => {
  const { setAsc, setSort, getInvoices, asc, allCheckedState, setAllCheckedState, handleOnChangeAll } = topTableProps

  return (
    <thead className='text-muted'>
      <tr>
        <th scope='col' style={{ width: '50px' }}>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              id='checkAll'
              value='option'
              checked={allCheckedState}
              onChange={() => {
                handleOnChangeAll()
                setAllCheckedState(!allCheckedState)
              }}
            />
          </div>
        </th>
        <th
          className='sort text-uppercase'
          data-sort='invoice_id'
          onClick={() => {
            setAsc(!asc)
            setSort('invoiceNum')
            getInvoices()
          }}
        >
          N° Facture
        </th>
        <th
          className='sort text-uppercase'
          data-sort='customer_name'
          onClick={() => {
            setAsc(!asc)
            setSort('name_customer')
            getInvoices()
          }}
        >
          Client
        </th>
        <th
          className='sort text-uppercase'
          data-sort='email'
          onClick={() => {
            setAsc(!asc)
            setSort('email_customer')
            getInvoices()
          }}
        >
          Email
        </th>

        <th
          className='sort text-uppercase'
          data-sort='date'
          onClick={() => {
            setAsc(!asc)
            setSort('created_at')
            getInvoices()
          }}
        >
          Date
        </th>
        <th
          className='sort text-uppercase'
          data-sort='invoice_amount'
          onClick={() => {
            setAsc(!asc)
            setSort('amount_ttc')
            getInvoices()
          }}
        >
          Montant
        </th>
        <th
          className='sort text-uppercase'
          data-sort='status'
          onClick={() => {
            setAsc(!asc)
            setSort('status')
            getInvoices()
          }}
        >
          Status
        </th>
        <th className='sort text-uppercase' data-sort='action'>
          Action
        </th>
      </tr>
    </thead>
  )
}

export default TopTable
