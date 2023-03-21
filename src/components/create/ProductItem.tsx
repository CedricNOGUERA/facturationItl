import React from 'react'
import Input from '../ui/Input'
import InputItem from '../ui/InputItem'

const ProductItem = ({ productItemProps, prod, indx }: any) => {
  const { productList, handleDeleteProduct, handleChangeProduct, substQty, addQty } =
    productItemProps

  return (
    <tr id={prod?.id} key={prod.id} className='product'>
      <th scope='row' className='product-id'>
        {indx + 1}
      </th>
      <td className='text-start'>
        <div className='mb-2'>
          <InputItem
            type='text'
            placeholder='Nom du produit ou du service'
            data={prod.name}
            setData={handleChangeProduct}
            indx={indx}
            inputName='name'
            required={true}
          />
          <div className='invalid-feedback'>Saisissez le nom du produit</div>
        </div>

        <textarea
          className='form-control bg-light border-0'
          rows={2}
          placeholder='Details'
          value={prod.detail}
          onChange={(e) => handleChangeProduct(e, indx, 'detail')}
        ></textarea>
      </td>
      <td>
        <select
          className='form-control bg-light border-0'
          data-choices
          data-choices-search-false
          value={prod.tva}
          onChange={(e) => handleChangeProduct(e, indx, 'tva')}
          required
        >
          <option value=''>Tva</option>
          <option value={0.13}>13%</option>
          <option value={0.16}>16%</option>
        </select>

        <div className='invalid-feedback'>Saisissez un prix</div>
      </td>
      <td>
        <InputItem
          type='text'
          placeholder='0.00'
          data={prod.price}
          setData={handleChangeProduct}
          indx={indx}
          inputName='price'
          required={true}
        />
        <div className='invalid-feedback'>Saisissez un prix</div>
      </td>
      <td>
        <div className='input-step'>
          <button
            type='button'
            aria-label="Substract"
            className='minus'
            onClick={() => substQty(prod.qty, indx, 'qty')}
          >
            –
          </button>
          <input
            type='number'
            className='product-quantity'
            value={prod.qty}
            onChange={(e) => handleChangeProduct(e, indx, 'qty')}
            required
          />
          <button type='button' aria-label="Plus" className='plus' onClick={() => addQty(prod.qty, indx, 'qty')}>
            +
          </button>
        </div>
      </td>
      <td>
        <div className='text-end'>
          <Input
            type='text'
            placeholder='0'
            data={prod.price * prod.qty * prod.tva}
            readOnly={true}
          />
        </div>
      </td>
      <td className='text-end'>
        <div>
          <Input type='text' placeholder='0' data={prod.price * prod.qty} readOnly={true} />
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
