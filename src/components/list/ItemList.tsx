import React, { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface ItemListProps {
    bill: any
    setDocId: Dispatch<SetStateAction<string>>
    title: string
    _getDocById: any
    setSelectedData: Dispatch<SetStateAction<string>>
}

const ItemList: React.FC<ItemListProps> = ({bill, setDocId, _getDocById, setSelectedData, title}) => {


  const navigate = useNavigate()
  const linkItem = title === 'DEVIS' ? 'devis' : 'facture'

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
      <td className='id' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        #{bill.invoiceNum}
      </td>
      <td className='customer_name' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
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
              alt='avatar'
              className='avatar-xs rounded-circle me-2'
            />
          )}
          {bill.customer_info?.name}
        </div>
      </td>
      <td className='email' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        {bill.customer_info.email}
      </td>

      <td className='date' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        {bill?.createdAt}
      </td>
      <td className='invoice_amount text-end' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        {new Intl.NumberFormat().format(bill.amount_ttc)}
      </td>
      <td className='status' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        <span className='badge badge-soft-success text-uppercase'>{bill.status}</span>
      </td>
      <td>
        <div className='dropdown'>
          <button
            className='btn btn-soft-secondary btn-sm dropdown'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
            aria-label="dropper"
          >
            <i className='ri-more-fill align-middle'></i>
          </button>
          <ul className='dropdown-menu dropdown-menu-end'>
            <li>
              <button className='dropdown-item' data-id='25000352'aria-label="drop item">
                <Link to={`/${bill.id}/${linkItem}`}>
                  <i className='ri-eye-fill align-bottom me-2 text-muted'></i>
                  Détail
                </Link>
              </button>
            </li>
            <li>
              <button className='dropdown-item' data-id='25000351' aria-label="drop item">
                <Link to={`/${bill.id}/update-${linkItem}`}>
                  <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>
                  Modifier
                </Link>
              </button>
            </li>
            <li className='dropdown-divider' ></li>
            {title === 'DEVIS' && bill?.status !== 'Validé' && (
              <li onClick={() => {
                // _getDocById(bill.id, setSelectedData)
                setDocId(bill.id)}}>
                <a
                aria-label="dropper"
                className='dropdown-item remove-item-btn'
                data-bs-toggle='modal'
                href='#validate'
              >
                    <i className='ri-check-line align-bottom me-2 text-success fs-5'></i>
                    Valider
                </a>
              </li>
            )}
            {(bill?.status !== 'Annulée' && bill?.status !== 'Annulé') && (

              <li onClick={() => setDocId(bill.id)} >
              <Link
              aria-label="drop"
              className='dropdown-item remove-item-btn'
              data-bs-toggle='modal'
              to='#deleteOrder'
              >
                <i className='ri-close-line align-bottom me-2 text-danger fs-5 m-auto'></i>
                Annuler
              </Link>
            </li>
                )}
          </ul>
        </div>
      </td>
    </tr>
  )
}

export default ItemList
