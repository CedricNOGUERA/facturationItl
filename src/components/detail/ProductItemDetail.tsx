import React from 'react'

interface productItemDetailProps {
  prod: any
  indx: number
}

const ProductItemDetail: React.FC<productItemDetailProps> = ({ prod, indx }) => {
  return (
    <tr key={prod.id}>
      <th scope='row'>{indx + 1}</th>
      <td className='text-start'>
        <span className='fw-medium'>{prod.designation}</span>
        <p className='text-muted mb-0 detail-area'>{prod.detailDesignation}</p>
      </td>
      <td>{prod.tva * 100} %</td>
      <td>{new Intl.NumberFormat().format(prod.price)}</td>
      <td>{prod.qty}</td>
      <td>{new Intl.NumberFormat().format(prod.price * prod.tva)}</td>
      <td className='text-end'>{new Intl.NumberFormat().format(prod.price * prod.qty)}</td>
    </tr>
  )
}

export default ProductItemDetail
