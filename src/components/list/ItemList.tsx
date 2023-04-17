import React, { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { _getDateLocal } from '../../utils/function'

interface ItemListProps {
    bill: any
    setDocId: Dispatch<SetStateAction<string>>
    title: string
    _getDocById: any
    setSelectedData: Dispatch<SetStateAction<string>>
    handleOnChange: any
    checkedState: any
    index: any
}

const ItemList: React.FC<ItemListProps> = ({bill, setDocId, _getDocById, setSelectedData, title, handleOnChange, checkedState, index}) => {



  const navigate = useNavigate()
  const linkItem = title === 'DEVIS' ? 'devis' : 'facture'

  return (
    <tr className="item-list">
      <th scope='row'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='chk_child'
            value={bill.id}
             checked={checkedState[index]}
            onChange={() => handleOnChange(index)}
          />
        </div>
      </th>
      <td className='id' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        #{bill.invoiceNum}
      </td>
      <td className='customer_name' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        <div className='d-flex align-items-center'>
            <div className='flex-shrink-0 avatar-xs me-2'>
              <div className='avatar-title bg-soft-success text-success text-uppercase rounded-circle fs-13'>
                {bill?.customer_info?.name?.slice(0, 2)}
              </div>
            </div>
          
          {bill.customer_info?.name}
        </div>
      </td>
      <td className='email' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        {bill.customer_info.email}
      </td>

      <td className='date' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        {_getDateLocal(bill?.created_at)}
      </td>
      <td className='invoice_amount text-end' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        {new Intl.NumberFormat().format(bill.amount_ttc)}
      </td>
      <td className='status' onClick={() => navigate(`/${bill.id}/${linkItem}`)}>
        <span className={(bill?.status === "En cours" || bill?.status === "Impayée") ? 'badge-soft-warning badge  text-uppercase' : (bill?.status === "Validé"  || bill?.status === "Payée") ?  'badge-soft-success badge  text-uppercase'  : 'badge-soft-danger badge  text-uppercase'}>{bill.status}</span>
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
                <Link to={`/${bill.id}/${linkItem}`}>
            <li>
              <button className='dropdown-item' data-id='25000352'aria-label="drop item">
                  <i className='ri-eye-fill align-bottom me-2 text-muted'></i>
                  Détail
              </button>
            </li>
                </Link>
                <Link to={`/${bill.id}/update-${linkItem}`}>
            <li>
              <button className='dropdown-item' data-id='25000351' aria-label="drop item">
                  <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>
                  Modifier
              </button>
            </li>
                </Link>
            <li className='dropdown-divider' ></li>
            {title === 'DEVIS' && bill?.status !== 'Validé' && (
              <li onClick={() => {
                _getDocById(bill.id, setSelectedData)
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
