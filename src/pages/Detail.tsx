import React from "react";
import { useOutletContext, useParams } from "react-router-dom";

const Detail = () => {

    const [invoicesData] = useOutletContext<any>();
    const params = useParams()

    const filteredInvoice = invoicesData?.filter((bill: any) => params.id === bill.id) 



    const htAmount = filteredInvoice[0]?.detailInvoice?.reduce((acc: any, current: any) => 
        acc + (current.price * current.qty)
     , 0)


    console.log(filteredInvoice)
    console.log(htAmount)


  return (
    <div className="row justify-content-center">
      <div className="col-xxl-9">
        <div className="card" id="demo">
          <div className="row">
            <div className="col-lg-12">
              <div className="card-header border-bottom-dashed p-4">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <img
                      src="assets/images/logo-dark.png"
                      className="card-logo card-logo-dark"
                      alt="logo dark"
                      height="50"
                    />
                    <img
                      src="assets/images/logo-light.png"
                      className="card-logo card-logo-light"
                      alt="logo light"
                      height="50"
                    />
                    <div className="mt-sm-5 mt-4">
                      <h6 className="text-muted text-uppercase fw-semibold">
                        Adresse
                      </h6>
                      <p className="text-muted mb-1" id="address-details">
                      Immeuble Mananui, Auae, Faa'a
                      </p>
                      <p className="text-muted mb-0" id="zip-code">
                      BP 1904 - 98713 Papeete - Tahiti
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-sm-0 mt-3">
                    <h6>
                      <span className="text-muted fw-normal">
                      N°Tahiti :{' '}
                      </span>
                      <span id="legal-register-no">RCS N°21 412 B - N°TAHITI E48924</span>
                    </h6>
                    <h6>
                      <span className="text-muted fw-normal">Email : {' '}</span>
                      <span id="email">itahitilab@lwane.com</span>
                    </h6>
                    <h6>
                      <span className="text-muted fw-normal">Contact :</span>{" "}
                     Claude
                    </h6>
                    <h6 className="mb-0">
                      <span className="text-muted fw-normal">Téléphone : </span>
                      <span id="contact-no"> 87 77 58 67</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-lg-4 col-6">
                    <p className="text-muted mb-2 text-uppercase fw-semibold fs-13">
                    N° Facture
                    </p>
                    <h5 className="fs-15 mb-0">
                      <span id="invoice-no">{filteredInvoice[0]?.invoiceNum}</span>
                    </h5>
                  </div>
                  <div className="col-lg-4 col-6">
                    <p className="text-muted mb-2 text-uppercase fw-semibold fs-13">
                      Date
                    </p>
                    <h5 className="fs-15 mb-0">
                      <span id="invoice-date">
                        {filteredInvoice[0]?.created_at.slice(0, 10)}
                      </span>{" "}
                      <small className="text-muted" id="invoice-time">
                        {filteredInvoice[0]?.created_at.slice(12, 20)}PM
                      </small>
                    </h5>
                  </div>
                  <div className="col-lg-4 col-6">
                    <p className="text-muted mb-2 text-uppercase fw-semibold fs-13">
                      Status du paiement
                    </p>
                    <span
                      className="badge badge-soft-success fs-12"
                      id="payment-status"
                    >
                      {filteredInvoice[0]?.status}
                    </span>
                  </div>
                  {/* <div className="col-lg-3 col-6">
                    <p className="text-muted mb-2 text-uppercase fw-semibold fs-13">
                      Total
                    </p>
                    <h5 className="fs-15 mb-0">
                      $
                      <span id="total-amount">
                        {" "}
                        {filteredInvoice[0]?.amount}
                      </span>
                    </h5>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card-body p-4 border-top border-top-dashed">
                <div className="row g-3">
                  <div className="col-6">
                    <h6 className="text-muted text-uppercase fw-semibold mb-3 fs-13">
                      A l'attention de
                    </h6>
                    <p className="fw-medium mb-2" id="billing-name">
                      {filteredInvoice[0]?.customer.name}
                    </p>
                    <p className="text-muted mb-1" id="billing-address-line-1">
                    {filteredInvoice[0]?.customer.address}
                    </p>
                    <p className="text-muted mb-1">
                      <span>Phone: +</span>
                      <span id="billing-phone-no">(689) {filteredInvoice[0]?.customer.phone}</span>
                    </p>
                    <p className="text-muted mb-0">
                      <span>Tax: </span>
                      <span id="billing-tax-no">12-3456789</span>{" "}
                    </p>
                  </div>
                  <div className="col-6">
                    <h6 className="text-muted text-uppercase fw-semibold mb-3 fs-13">
                      Adresse de livraison
                    </h6>
                    <p className="fw-medium mb-2" id="shipping-name">
                      David Nichols
                    </p>
                    <p className="text-muted mb-1" id="shipping-address-line-1">
                      305 S San Gabriel Blvd
                    </p>
                    <p className="text-muted mb-1">
                      <span>Phone: +</span>
                      <span id="shipping-phone-no">(123) 456-7890</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-borderless text-center table-nowrap align-middle mb-0">
                    <thead>
                      <tr className="table-active">
                        <th scope="col" style={{ width: "50px" }}>
                          #
                        </th>
                        <th scope="col">Désignations</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Quantité</th>
                        <th scope="col" className="text-end">
                          Montant HT
                        </th>
                      </tr>
                    </thead>
                    <tbody id="products-list">
                      {filteredInvoice[0]?.detailInvoice?.map(
                        (prod: any, indx: any) => (
                          <tr key={prod.id}>
                            <th scope="row">{indx + 1}</th>
                            <td className="text-start">
                              <span className="fw-medium">
                                {prod.designation}
                              </span>
                              <p className="text-muted mb-0">
                                {prod.detailDesignation}
                              </p>
                            </td>
                            <td>${prod.price}</td>
                            <td>{prod.qty}</td>
                            <td className="text-end">
                              ${prod.price * prod.qty}
                            </td>
                          </tr>
                        )
                      )}

                    
                    </tbody>
                  </table>
                </div>
                <div className="border-top border-top-dashed mt-2">
                  <table
                    className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                    style={{ width: "250px" }}
                  >
                    <tbody>
                      <tr>
                        <td>Total HT</td>
                        <td className="text-end">${htAmount}</td>
                      </tr>
                      <tr>
                        <td>TVA (13%)</td>
                        <td className="text-end">{htAmount*(0.13)}</td>
                      </tr>
                      <tr>
                        <td>CPS (1%)</td>
                        <td className="text-end">{htAmount*0.01}</td>
                      </tr>
                      <tr>
                        <td>
                          Réduction{" "}
                          <small className="text-muted">(ITL)</small>
                        </td>
                        <td className="text-end">- $0.00</td>
                      </tr>
                      <tr>
                        <td>Frais de livraison</td>
                        <td className="text-end">$0.00</td>
                      </tr>
                      <tr className="border-top border-top-dashed fs-15">
                        <th scope="row">Total TTC</th>
                        <th className="text-end">${htAmount + (htAmount*0.13) + (htAmount*0.01)}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <h6 className="text-muted text-uppercase fw-semibold mb-3 fs-13">
                    Payment Details:
                  </h6>
                  <p className="text-muted mb-1">
                    Payment Method:{" "}
                    <span className="fw-medium" id="payment-method">
                      Mastercard
                    </span>
                  </p>
                  <p className="text-muted mb-1">
                    Card Holder:{" "}
                    <span className="fw-medium" id="card-holder-name">
                      David Nichols
                    </span>
                  </p>
                  <p className="text-muted mb-1">
                    Card Number:{" "}
                    <span className="fw-medium" id="card-number">
                      xxx xxxx xxxx 1234
                    </span>
                  </p>
                  <p className="text-muted">
                    Total Amount:{" "}
                    <span className="fw-medium" id="">
                      ${" "}
                    </span>
                    <span id="card-total-amount">755.96</span>
                  </p>
                </div>
                <div className="mt-4">
                  <div className="alert alert-info">
                    <p className="mb-0">
                      <span className="fw-semibold">NOTES:</span>
                      <span id="note">
                        All accounts are to be paid within 7 days from receipt
                        of invoice. To be paid by cheque or credit card or
                        direct payment online. If account is not paid within 7
                        days the credits details supplied as confirmation of
                        work undertaken will be charged the agreed quoted fee
                        noted above.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                  <a
                    href="javascript:window.print()"
                    className="btn btn-success"
                  >
                    <i className="ri-printer-line align-bottom me-1"></i> Print
                  </a>
                  <a href="javascript:void(0);" className="btn btn-primary">
                    <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
