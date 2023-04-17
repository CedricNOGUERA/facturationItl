import React from 'react'
import { _addQty, _handleChangeProduct, _substQty } from '../../utils/function'
import Input from '../ui/Input'

const ProductItem = ({ productItemProps, prod, indx }: any) => {
  const { productList, setProductList, handleDeleteProduct } = productItemProps

  return (
    <tr id={prod?.id} key={prod.id} className='product'>
      <th scope='row' className='product-id'>
        {indx + 1}
      </th>
      <td className='text-start'>
        <div className='mb-2'>
        <input
          type='text'
          className='form-control bg-light border-0 mb-2'
          placeholder='Nom du produit ou du service'
          value={prod?.name}
          onChange={(e) => _handleChangeProduct(e, indx, 'name',productList, setProductList)}
          required
        />
          <div className='invalid-feedback'>Saisissez le nom du produit</div>
        </div>

        <textarea
          className='form-control bg-light border-0'
          rows={2}
          placeholder='Details'
          value={prod.detail}
          onChange={(e) => _handleChangeProduct(e, indx, 'detail', productList, setProductList)}
        ></textarea>
      </td>
      <td>
        <select
          className='form-control bg-light border-0'
          data-choices
          data-choices-search-false
          value={prod.tva}
          onChange={(e) => _handleChangeProduct(e, indx, 'tva', productList, setProductList)}
          required
        >
          <option value=''>Tva</option>
          <option value={0.13}>13%</option>
          <option value={0.16}>16%</option>
        </select>

        <div className='invalid-feedback'>Saisissez un prix</div>
      </td>
      <td>
       
         <input
          type='number'
          className='form-control bg-light border-0 mb-2'
          placeholder='0'
          value={prod?.price}
          onChange={(e) => _handleChangeProduct(e, indx, 'price', productList, setProductList)}
          required
        />
        <div className='invalid-feedback'>Saisissez un prix</div>
      </td>
      <td>
        <div className='input-step'>
          <button
            type='button'
            aria-label="Substract"
            className='minus'
            onClick={() => _substQty(prod.qty, indx, 'qty', productList, setProductList)}
          >
            –
          </button>
          <input
            type='number'
            className='product-quantity'
            value={prod.qty}
            onChange={(e) => _handleChangeProduct(e, indx, 'qty', productList, setProductList)}
            required
          />
          <button type='button' aria-label="Plus" className='plus' onClick={() => _addQty(prod.qty, indx, 'qty', productList, setProductList)}>
            +
          </button>
        </div>
      </td>
      <td>
        <div className='text-end'>
          <Input
            type='text'
            placeholder='0'
            data={new Intl.NumberFormat().format(prod?.price * prod?.qty * prod?.tva)}
            readOnly={true}
          />
        </div>
      </td>
      <td className='text-end'>
        <div>
          <Input type='text' placeholder='0' data={new Intl.NumberFormat().format(prod?.price * prod?.qty)} readOnly={true} />
        </div>
      </td>
      <td className='product-removal'>
        {productList.length > 0 && (
          <button
          aria-label={`${prod?.id}`}
            onClick={() => {
              productList.length > 1 && handleDeleteProduct(prod.id)
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

export default ProductItem
