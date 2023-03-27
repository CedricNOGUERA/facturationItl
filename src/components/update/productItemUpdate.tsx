import React from 'react'

const ProductItemUpdate = ({ productItemProps, prod, indx }: any) => {
  const { productList, handleDeleteProduct, handleChangeProduct, substQty, addQty } =
    productItemProps
    function numStr(a: any, b: any) {
      a = '' + a;
      b = b || ' ';
      var c = '',
          d = 0;
      while (a.match(/^0[0-9]/)) {
        a = a.substr(1);
      }
      for (var i = a.length-1; i >= 0; i--) {
        c = (d !== 0 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
        d++;
      }
      return c;
    }

  return (
    <tr id={prod?.id} key={prod?.id} className='product'>
      <th scope='row' className='product-id'>
        {indx + 1}
      </th>
      <td className='text-start'>
        <input
          type='text'
          className='form-control bg-light border-0 mb-2'
          placeholder='Nom du produit ou du service'
          value={prod?.designation}
          onChange={(e) => handleChangeProduct(e, indx, 'designation')}
          required
        />
         
        <textarea
          className='form-control bg-light border-0'
          value={prod?.detailDesignation}
          onChange={
            (e) => handleChangeProduct(e, indx, 'detailDesignation')
          }

        />
      </td>
      <td>
        <select
          className='form-control bg-light border-0'
          data-choices
          data-choices-search-false
          onChange={(e) => handleChangeProduct(e, indx, 'tva')}
        >
          <option value={prod?.tva}>{prod?.tva*100}%</option>
          <option value={0.13}>13%</option>
          <option value={0.16}>16%</option>
        </select>
      </td>
      <td>
        <input
          type='number'
          className='form-control product-price bg-light border-0'
          placeholder='0'
          value={prod?.price}
          onChange={(e) => handleChangeProduct(e, indx, 'price')}
          required
        />
      </td>
      <td>
        <span className='input-step'>
          <button
            type='button'
            className='minus'
            onClick={() => substQty(prod?.qty, indx, 'qty')}
          >
            –
          </button>
          <input
            type='number'
            className='product-quantity'
            value={prod?.qty}
            onChange={(e) => handleChangeProduct(e, indx, 'qty')}
            required
          />
          <button type='button' className='plus' onClick={() => addQty(prod?.qty, indx, 'qty')}>
            +
          </button>
        </span>
      </td>
      <td>
        <span className='text-end'>
          <input
            type='text'
            className='form-control bg-light border-0 product-line-price text-end'
            value={numStr(prod?.price * prod?.qty * prod?.tva, '')}
            // value={new Intl.NumberFormat().format(prod?.price * prod?.qty * prod?.tva)}
            readOnly
          />
        </span>
      </td>
      <td className='text-end'>
        <span>
          <input
            type='text'
            className='form-control bg-light border-0 product-line-price text-end'
            placeholder='0'
            value={new Intl.NumberFormat().format(prod?.price * prod?.qty)}
            readOnly
          />
        </span>
      </td>
      <td className='product-removal'>
        {productList.length > 0 && (
          <button
            onClick={() => {
              productList.length > 1 && handleDeleteProduct(prod?.id)
            }}
            className='btn btn-success diseable'
          >
            Supprimer
          </button>
        )}
      </td>
    </tr>
  )
}

export default ProductItemUpdate
