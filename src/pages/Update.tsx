import React from 'react'
import { useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';

const Update = () => {

  const { register, handleSubmit } = useForm();
  const [data, setData] = React.useState("");
  const [qty, setQty] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [invoicesData, setInvoicesData] = useOutletContext<any>();



  const [productList, setProductList] = React.useState([
    {
    id: 1,
    name: "",
    price: null,
    qty: null,
    amount : null
  }
]);


  const params = useParams()

  const filteredInvoice = invoicesData?.filter((bill: any) => params.id === bill.id) 
  console.log(filteredInvoice)


  const htAmount = filteredInvoice[0]?.detailInvoice?.reduce((acc: any, current: any) => 
        acc + (current.price * current.qty)
     , 0)

console.log(htAmount)
const handleAddProduct = () => {

  const newTab = [...productList, 
    {
      id: productList.length+1,
      name: "",
      price: null,
      qty: null,
      amount : null
    }]

    setProductList(newTab)
}

const handleDeleteProduct = (id: any) => {

  const newList = productList?.filter((prod: any) => prod.id !== id)

  setProductList(newList)

}


console.log(data)
 

  return (
    <div className="row justify-content-center">
      <div className="col-xxl-9">
        <div className="card">
          <form
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
            className="needs-validation"
            noValidate
            id="invoice_form"
          >
            <div className="card-body border-bottom border-bottom-dashed p-4">
              <div className="row">
                <div className="col-lg-4">
                  <div className="profile-user mx-auto  mb-3">
                    <input
                      id="profile-img-file-input"
                      type="file"
                      className="profile-img-file-input"
                    />
                    <label
                      htmlFor="profile-img-file-input"
                      className="d-block"
                      tabIndex={0}
                    >
                      <span
                        className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                        style={{ height: "60px", width: "256px" }}
                      >
                        <img
                          src="../assets/images/logo-dark.png"
                          className="card-logo card-logo-dark user-profile-image img-fluid"
                          alt="logo dark"
                        />
                        <img
                          src="../assets/images/logo-light.png"
                          className="card-logo card-logo-light user-profile-image img-fluid"
                          alt="logo light"
                        />
                      </span>
                    </label>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="companyAddress">Adresse</label>
                    </div>
                    <div className="mb-2 text-muted">
                      Immeuble Mananui, Auae, Faa'a
                    </div>
                    <div className="mb-2 text-muted">
                      BP 1904 - 98713 Papeete - Tahiti
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 ms-auto">
                  <div className="mb-2">
                    N°Tahiti :
                    <div className="mb-2 text-muted">
                      RCS N°21 412 B - N°TAHITI E48924
                    </div>
                  </div>
                  <div className="mb-2">
                    Email
                    <div className="mb-2 text-muted">itahitilab@lwane.com</div>
                  </div>
                  
                  <div>
                    Téléphone
                    <div className="mb-2 text-muted">87 77 58 67</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-lg-3 col-sm-6">
                  <label htmlFor="invoicenoInput">N° Facture</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 text-muted"
                    id="invoicenoInput"
                    placeholder="Invoice No"
                    value={filteredInvoice[0].id}
                    readOnly
                  />
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div>
                    <label htmlFor="date-field">Date</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      id="date-field"
                      data-provider="flatpickr"
                      data-time="true"
                      placeholder={filteredInvoice[0].created_at}
                      
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <label htmlFor="choices-payment-status">
                    Status du paiement
                  </label>
                  <div className="input-light">
                    <select
                      className="form-control bg-light border-0"
                      data-choices
                      data-choices-search-false
                      id="choices-payment-status"
                      required
                    >
                      <option value="">{filteredInvoice[0].status}</option>
                      <option value="Paid">Payé</option>
                      <option value="Unpaid">Impayé</option>
                      <option value="Refund">Remboursement</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div>
                    <label htmlFor="totalamountInput">Total</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      id="totalamountInput"
                      placeholder={filteredInvoice[0].amount}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-4 border-top border-top-dashed">
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div>
                    <label
                      htmlFor="billingName"
                      className="text-muted text-uppercase fw-semibold"
                    >
                      A l'attention de :
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      id="billingName"
                      placeholder={filteredInvoice[0].customer.name}
                      required
                    />
                    <div className="invalid-feedback">Saisissez un nom</div>
                  </div>
                  <div className="mb-2">
                    <textarea
                    {...register('address')}
                      className="form-control bg-light border-0"
                      id="billingAddress"
                      rows={3}
                      placeholder={filteredInvoice[0].customer.address}
                     readOnly
                      required
                    ></textarea>
                    <div className="invalid-feedback">
                      Saisissez une adresse
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                    {...register('phone')}
                      type="text"
                      className="form-control bg-light border-0"
                      data-plugin="cleave-phone"
                      id="billingPhoneno"
                      placeholder={filteredInvoice[0].customer.phone}
                      required
                    />
                    <div className="invalid-feedback">
                      Saisissez un n° de téléphone
                    </div>
                  </div>
                  {/* <div className="mb-3">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      id="billingTaxno"
                      placeholder="Numéro d'identification fiscale"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a tax number
                    </div>
                  </div> */}
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="same"
                      name="same"
                      // onChange="billingFunction()"
                    />
                    <label className="form-check-label" htmlFor="same">
                      Votre adresse de facturation et d'expédition sera-t-elle
                      la même ?
                    </label>
                  </div>
                </div>

                <div className="col-sm-6 ms-auto">
                  <div className="row">
                    <div className="col-lg-8">
                      <div>
                        <label
                          htmlFor="shippingName"
                          className="text-muted text-uppercase fw-semibold"
                        >
                          Adresse de livraison
                        </label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="shippingName"
                          placeholder="Nom"
                          required
                        />
                        <div className="invalid-feedback">Saisissez un nom</div>
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="form-control bg-light border-0"
                          id="shippingAddress"
                          rows={3}
                          placeholder="Adresse"
                          readOnly
                          required
                        ></textarea>
                        <div className="invalid-feedback">
                          Saisissez une adresse
                        </div>
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          data-plugin="cleave-phone"
                          id="shippingPhoneno"
                          placeholder="Téléphone"
                          required
                        />
                        <div className="invalid-feedback">
                          Saisissez un n° de téléphone
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="shippingTaxno"
                          placeholder="Numéro d'idenfification fiscale"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a tax number
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="invoice-table table table-borderless table-nowrap mb-0">
                  <thead className="align-middle">
                    <tr className="table-active">
                      <th scope="col" style={{ width: "50px" }}>
                        #
                      </th>
                      <th scope="col">Désignations</th>
                      <th scope="col" style={{ width: "120px" }}>
                        <div className="d-flex currency-select input-light align-items-center">
                          Prix
                          <select
                            className="form-selectborder-0 bg-light"
                            data-choices
                            data-choices-search-false
                            id="choices-payment-currency"
                            // onChange={otherPayment}
                          >
                            <option value="$">($)</option>
                            <option value="£">(£)</option>
                            <option value="₹">(₹)</option>
                            <option value="€">(€)</option>
                          </select>
                        </div>
                      </th>
                      <th scope="col" style={{ width: "120px" }}>
                        Quantité
                      </th>
                      <th
                        scope="col"
                        className="text-end"
                        style={{ width: "150px" }}
                      >
                        Montant HT
                      </th>
                      <th
                        scope="col"
                        className="text-end"
                        style={{ width: "105px" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody id="newlink">
                    {filteredInvoice[0].detailInvoice?.map((prod: any, indx: any) => (
                      <tr id={prod?.id} key={prod.id} className="product">
                        <th scope="row" className="product-id">
                          {indx + 1}
                        </th>
                        <td className="text-start">
                          <div className="mb-2">
                            <input
                              {...register(`name${prod?.id}`)}
                              type="text"
                              className="form-control bg-light border-0"
                              id={`productName-${prod?.id}`}
                              placeholder={prod?.designation}
                              required
                            />
                            <div className="invalid-feedback">
                              Saisissez le nom du produit
                            </div>
                          </div>
                          <textarea
                           {...register(`productDetails${prod?.id}`)}
                            className="form-control bg-light border-0"
                            id={`productDetails-${prod?.id}`}
                            rows={2}
                            placeholder={prod?.detailDesignation}
                          ></textarea>
                        </td>
                        <td>
                          <input
                            {...register(`price${prod?.id}`)}
                            type="number"
                            className="form-control product-price bg-light border-0"
                            id={`productRate-${prod?.id}`}
                            // step="0.01"
                            placeholder={prod?.price}
                            // value={price}
                      
                            required
                          />
                          <div className="invalid-feedback">
                            Saisissez un prix
                          </div>
                        </td>
                        <td>
                          <div className="input-step">
                            <button type="button" className="minus">
                              –
                            </button>
                            <input
                              {...register(`quantity${prod?.id}`)}
                              type="number"
                              className="product-quantity"
                              // id="product-qty-1"
                              id={`product-qty-${prod?.id}`}
                              value={prod.qty}
                              onChange={(e: any) => setQty(e.currentTarget.value)}
                            />
                            <button type="button" className="plus">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end">
                          <div>
                            <input
                              {...register(`prodAmount${prod?.id}`)}
                              type="text"
                              className="form-control bg-light border-0 product-line-price"
                              id="productPrice-1"
                              placeholder="0"
                              value={prod.price* prod.qty}
                              readOnly
                            />
                          </div>
                        </td>
                        <td className="product-removal">
                          {productList.length > 0 && (
                            <div
                            
                              onClick={() =>{
                                
                                productList.length > 1 && ( handleDeleteProduct(prod.id))}}
                              className="btn btn-success diseable"
                            >
                              Delete
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody>
                    <tr id="newForm" style={{ display: "none" }}>
                      <td className="d-none" colSpan={5}>
                        <p>Add New Form</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        <span
                          onClick={handleAddProduct}
                          id="add-item"
                          className="btn btn-soft-secondary fw-medium"
                        >
                          <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                          Ajouter un prodruit
                        </span>
                      </td>
                    </tr>
                    <tr className="border-top border-top-dashed mt-2">
                      <td colSpan={3}></td>
                      <td colSpan={2} className="p-0">
                        <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Total HT</th>
                              <td style={{ width: "150px" }}>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="cart-subtotal"
                                  defaultValue={htAmount}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">TVA (13%)</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="cart-tax"
                                  defaultValue={htAmount*0.13}
                                />
                              </td>
                              </tr>
                            <tr>
                              <th scope="row">CPS (1%)</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="cart-tax"
                                  defaultValue={htAmount*0.01}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                Réduction{" "}
                                <small className="text-muted">(ITL)</small>
                              </th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="cart-discount"
                                  defaultValue={htAmount*0.00}
                                  readOnly
                                />
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Frais de liv.</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="cart-shipping"
                                  placeholder="$0.00"
                                  readOnly
                                />
                              </td>
                            </tr>
                            <tr className="border-top border-top-dashed">
                              <th scope="row">Total</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="cart-total"
                                  placeholder={`${htAmount+ (htAmount*0.13) + (htAmount*0.01)}`}
                                  readOnly
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="row mt-3">
                <div className="col-lg-4">
                  <div className="mb-2">
                    <label
                      htmlFor="choices-payment-type"
                      className="form-label text-muted text-uppercase fw-semibold"
                    >
                      Payment Details
                    </label>
                    <div className="input-light">
                      <select
                        className="form-control bg-light border-0"
                        data-choices
                        data-choices-search-false
                        data-choices-removeItem
                        id="choices-payment-type"
                      >
                        <option value="">Payment Method</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Visa">Visa</option>
                        <option value="Paypal">Paypal</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                      className="form-control bg-light border-0"
                      type="text"
                      id="cardholderName"
                      placeholder="Card Holder Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="form-control bg-light border-0"
                      type="text"
                      id="cardNumber"
                      placeholder="xxxx xxxx xxxx xxxx"
                    />
                  </div>
                  <div>
                    <input
                      className="form-control  bg-light border-0"
                      type="text"
                      id="amountTotalPay"
                      placeholder="$0.00"
                      readOnly
                    />
                  </div>
                </div>
              </div> */}

              <div className="mt-4">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label text-muted text-uppercase fw-semibold"
                >
                  NOTES
                </label>
                <textarea
                  className="form-control alert alert-info"
                  id="exampleFormControlTextarea1"
                  placeholder="Notes"
                  rows={2}
                  required
                >
                  All accounts are to be paid within 7 days from receipt of
                  invoice. To be paid by cheque or credit card or direct payment
                  online. If account is not paid within 7 days the credits
                  details supplied as confirmation of work undertaken will be
                  charged the agreed quoted fee noted above.
                </textarea>
              </div>
              <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                <button type="submit" className="btn btn-success">
                  <i className="ri-printer-line align-bottom me-1"></i> Save
                </button>
                <a href="/" className="btn btn-primary">
                  <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                  Download Invoice
                </a>
                <a href="/" className="btn btn-danger">
                  <i className="ri-send-plane-fill align-bottom me-1"></i> Send
                  Invoice
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update