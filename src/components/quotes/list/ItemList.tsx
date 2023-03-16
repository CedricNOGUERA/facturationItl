import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface ItemListProps {
    bill: any
    setDeleteInvoiceId: any
}

const ItemListQuote: React.FC<ItemListProps> = ({ bill, setDeleteInvoiceId }) => {
  const navigate = useNavigate()

  return (
    <tr>
      <th scope='row'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='chk_child'
            value={bill.id}
          />
        </div>
      </th>
      <td className='id' onClick={() => navigate(`/${bill.id}/quote`)}>
        #{bill.invoiceNum}
      </td>
      <td className='customer_name' onClick={() => navigate(`/${bill.id}/quote`)}>
        <div className='d-flex align-items-center'>
          {bill?.customer_info?.avatar === '' ? (
            <div className='flex-shrink-0 avatar-xs me-2'>
              <div className='avatar-title bg-soft-success text-success text-uppercase rounded-circle fs-13'>
                {bill?.customer_info?.name?.slice(0, 2)}
              </div>
            </div>
          ) : (
            <img
              src={`assets/images/users/${bill?.customer_info?.avatar}.jpg`}
              alt=''
              className='avatar-xs rounded-circle me-2'
            />
          )}
          {bill.customer_info?.name}
        </div>
      </td>
      <td className='email' onClick={() => navigate(`/${bill.id}/quote`)}>
        {bill.customer_info.email}
      </td>

      <td className='date' onClick={() => navigate(`/${bill.id}/quote`)}>
       {bill?.createdAt}
      </td>
      <td className='invoice_amount text-end' onClick={() => navigate(`/${bill.id}/quote`)}>
        {new Intl.NumberFormat().format(bill.amount_ttc)}

      </td>
      <td className='status' onClick={() => navigate(`/${bill.id}/quote`)}>
        <span className='badge badge-soft-success text-uppercase'>{bill.status}</span>
      </td>
      <td>
        <div className='dropdown'>
          <button
            className='btn btn-soft-secondary btn-sm dropdown'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <i className='ri-more-fill align-middle'></i>
          </button>
          <ul className='dropdown-menu dropdown-menu-end'>
            <li>
              <button
                className='dropdown-item'
                data-id='25000352'
              >
                <Link to={`/${bill.id}/quote`}>
                  <i className='ri-eye-fill align-bottom me-2 text-muted'></i>
                  Detail
                </Link>
              </button>
            </li>
            <li>
              <button
                className='dropdown-item'
                data-id='25000351'
              >
                <Link to={`/${bill.id}/update-devis`}>
                  <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>
                Modifier
                  
                </Link>
                
              </button>
            </li>
           
            <li className='dropdown-divider'></li>
            <li>
              <a
                className='dropdown-item remove-item-btn'
                data-bs-toggle='modal'
                href='#deleteOrder'
              >
                <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>
                Annuler
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  )
}

export default ItemListQuote
