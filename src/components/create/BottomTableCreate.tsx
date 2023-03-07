import React from 'react'

const BottomTableCreate = ({bottomTableProps}: any) => {
 
    const {handleAddProduct, amountHT, totalTva_13, totalTva_16 } = bottomTableProps
    
 
    return (
    <tbody>
    <tr id='newForm' style={{ display: 'none' }}>
      <td className='d-none' colSpan={5}>
        <p>Add New Form</p>
      </td>
    </tr>
    <tr>
      <td colSpan={5}>
        <span
          onClick={handleAddProduct}
          id='add-item'
          className='btn btn-soft-secondary fw-medium'
        >
          <i className='ri-add-fill me-1 align-bottom'></i> Ajouter un prodruit
        </span>
      </td>
    </tr>
    <tr className='border-top border-top-dashed mt-2'>
      <td colSpan={5}></td>
      <td colSpan={2} className='p-0'>
        <table className='table table-borderless table-sm table-nowrap align-middle mb-0'>
          <tbody>
            <tr>
              <th scope='row'>Sous-Total</th>
              <td style={{ width: '150px' }}>
                <input
                  type='text'
                  className='form-control bg-light border-0 text-end'
                  id='cart-subtotal'
                  placeholder='$0.00'
                  value={amountHT.toFixed(2)}
                  readOnly
                />
              </td>
            </tr>
            {totalTva_13 !== 0 && (
              <tr>
                <th scope='row'>TVA (13%)</th>
                <td className='text-end'>
                  <input
                    type='text'
                    className='form-control bg-light border-0 text-end'
                    id='cart-tax'
                    placeholder="0.00"
                    value={totalTva_13}
                    readOnly
                  />
                </td>
              </tr>
            )}
            {totalTva_16 !== 0 && (
              <tr>
                <th scope='row'>TVA (16%)</th>
                <td className='text-end'>
                  <input
                    type='text'
                    className='form-control bg-light border-0 text-end'
                    id='cart-tax'
                    placeholder="0.00"
                    value={totalTva_16}
                    readOnly
                  />
                </td>
              </tr>
            )}
            <tr>
              <th scope='row'>CPS (1%)</th>
              <td>
                <input
                  type='text'
                  className='form-control bg-light border-0 text-end'
                  id='cart-tax'
                  placeholder='$0.00'
                  value={(amountHT * 0.01).toFixed(2)}
                  readOnly
                />
              </td>
            </tr>

            <tr className='border-top border-top-dashed'>
              <th scope='row'>Total</th>
              <td>
                <input
                  type='text'
                  className='form-control bg-light border-0 text-end'
                  id='cart-total'
                  placeholder='$0.00'
                  value={(amountHT + totalTva_13 + totalTva_16  + amountHT * 0.01).toFixed(2)}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
  )
}

export default BottomTableCreate