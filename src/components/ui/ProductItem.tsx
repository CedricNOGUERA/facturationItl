import React from 'react'

const ProductItem = ({productItemProps, prod, indx, test, setTest }: any) => {
    const [qty, setQty] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [designation, setDesignation] = React.useState<string>("");
  const [detailProd, setDetailProd] = React.useState<string>("");

  const { setAmountProd, productList, handleDeleteProduct, register } = productItemProps


// const test: any = []



// React.useEffect(() => {

//     test.push(designation)
//   }, [productList, designation]);







const handleBlur = (e: any) => setTest(e.target.value);

  console.log(test)
  console.log(designation)
  
const addQty = (qty: any) => {
    const newQty = qty + 1
    setQty(newQty)
  
  }
  
  const substQty = (qty: any) => {
    if(qty > 1){
  
      const newQty = qty - 1
      setQty(newQty)
    }
  
  }



  return (
    <tr id={prod?.id} key={prod.id} className="product">
    <th scope="row" className="product-id">
      {indx + 1}
    </th>
    <td className="text-start">
      <div className="mb-2">
        <input
          type="text"
          className="form-control bg-light border-0"
          id={`productName-${prod?.id}`}
          placeholder="nom du produit"
          value={designation}
          onChange={(e: any) =>{
            setDesignation(e.currentTarget.value)
          }}
          onBlur={handleBlur}
          required
        />
        <div className="invalid-feedback">
          Saisissez le nom du produit
        </div>
      </div>
      <textarea
        className="form-control bg-light border-0"
        id={`productDetails-${prod?.id}`}
        rows={2}
        placeholder="Details"
        value={detailProd}
        onChange={(e: any) =>
          setDetailProd(e.currentTarget.value)
        }
      ></textarea>
    </td>
    <td>
      <input
        type="number"
        className="form-control product-price bg-light border-0"
        id={`productRate-${prod?.id}`}
        // step="0.01"
        placeholder="0.00"
        value={price}
        onChange={(e: any) => {
          setPrice(e.currentTarget.value);
        }}
        required
      />
      <div className="invalid-feedback">
        Saisissez un prix
      </div>
    </td>
    <td>
      <div className="input-step">
        <button
          type="button"
          className="minus"
          onClick={() => substQty(qty)}
        >
          –
        </button>
        <input
          type="number"
          className="product-quantity"
          // id="product-qty-1"
          id={`product-qty-${prod?.id}`}
          value={qty}
          onChange={(e: any) =>
            setQty(e.currentTarget.value)
          }
        />
        <button
          type="button"
          className="plus"
          onClick={() => addQty(qty)}
        >
          +
        </button>
      </div>
    </td>
    <td className="text-end">
      <div>
        <input
          type="text"
          className="form-control bg-light border-0 product-line-price"
          id="productPrice-1"
          placeholder="0"
          value={price * qty}
          onChange={(e: any) =>
            setAmountProd(e.currentTarget.value)
          }
          
        />
      </div>
    </td>
    <td className="product-removal">
      {productList.length > 0 && (
        <div
          onClick={() => {
            productList.length > 1 &&
              handleDeleteProduct(prod.id);
          }}
          className="btn btn-success diseable"
        >
          Delete
        </div>
      )}
    </td>
  </tr>
  );
}

export default ProductItem