import React from 'react'

const ProductItemUpdate = ({ productItemProps, prod, indx, test, setTest }: any) => {
  const { productList, handleDeleteProduct, handleChangeProduct, substQty, addQty } =
    productItemProps

  return (
    <tr id={prod?.id} key={prod.id} className='product'>
      <th scope='row' className='product-id'>
        {indx + 1}
      </th>
      <td className='text-start'>
        <div className='mb-2'>
          <input
            type='text'
            className='form-control bg-light border-0'
            id={`productName-${prod?.id}`}
            placeholder='nom du produit ou du service'
            value={prod.designation}
            onChange={(e) => handleChangeProduct(e, indx, 'designation')}
            required
          />
          <div className='invalid-feedback'>Saisissez le nom du produit</div>
        </div>
        <textarea
          className='form-control bg-light border-0'
          id={`productDetails-${prod?.id}`}
          rows={2}
          placeholder='Details'
          value={prod.detailDesignation}
          onChange={(e) => handleChangeProduct(e, indx, 'detailDesignation')}
        ></textarea>
      </td>
      <td>
        <select
          className='form-control bg-light border-0'
          data-choices
          data-choices-search-false
          id='choices-payment-status'
          value={prod.tva}
          onChange={(e) => handleChangeProduct(e, indx, 'tva')}
        >
          <option value=''>Tva</option>
          <option value={0.13}>13%</option>
          <option value={0.16}>16%</option>
        </select>
      </td>
      <div className='invalid-feedback'>Sélectionnez une Tva</div>
      <td>
        <input
          type='number'
          className='form-control product-price bg-light border-0'
          id={`productRate-${prod?.id}`}
          placeholder='0.00'
          value={prod.price}
          onChange={(e) => handleChangeProduct(e, indx, 'price')}
          required
        />
        <div className='invalid-feedback'>Saisissez un prix</div>
      </td>
      <td>
        <div className='input-step'>
          <button
            type='button'
            className='minus'
            onClick={() => substQty(prod.qty, indx, 'qty')}
          >
            –
          </button>
          <input
            type='number'
            className='product-quantity'
            id={`product-qty-${prod?.id}`}
            value={prod.qty}
            onChange={(e) => handleChangeProduct(e, indx, 'qty')}
            required
          />
          <button type='button' className='plus' onClick={() => addQty(prod.qty, indx, 'qty')}>
            +
          </button>
        </div>
      </td>
      <td>
        <div className='text-end'>
          <input
            type='number'
            className='form-control bg-light border-0 product-line-price text-end'
            id={`product-qty-${prod?.id}`}
            value={prod.price * prod.qty * prod.tva}
            readOnly
          />
        </div>
      </td>
      <td className='text-end'>
        <div>
          <input
            type='text'
            className='form-control bg-light border-0 product-line-price text-end'
            id='productPrice-1'
            placeholder='0'
            value={prod.price * prod.qty}
            readOnly
          />
        </div>
      </td>
      <td className='product-removal'>
        {productList.length > 0 && (
          <div
            onClick={() => {
              productList.length > 1 && handleDeleteProduct(prod.id)
            }}
            className='btn btn-success diseable'
          >
            Supprimer
          </div>
        )}
      </td>
    </tr>
  )
}

export default ProductItemUpdate
