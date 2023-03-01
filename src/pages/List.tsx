import React from "react";
import {  useNavigate, useOutletContext } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const List = () => {
  const [invoicesData, setInvoicesData] = useOutletContext<any>();
  const navigate = useNavigate()

  React.useEffect(() => {
      
    getInvoices()
   
  }, []);






  const getInvoices = async () => {
    let { data: invoices, error } = await supabase
      .from("invoices")
      .select("*");

    if (invoices) {
      setInvoicesData(invoices);
    }
    if (error) {
      console.log(error);
    }
  };

// console.log(params)
  return (
    
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="invoiceList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1 fs-17">Invoices</h5>
                <div className="flex-shrink-0">
                  <button
                    className="btn btn-primary me-3"
                    // onClick="deleteMultiple()"
                  >
                    <i className="ri-delete-bin-2-line"></i>
                  </button>
                  <a href="/create-invoice" className="btn btn-danger">
                    <i className="ri-add-line align-bottom me-1"></i> Create
                    Invoice
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
              <form>
                <div className="row g-3">
                  <div className="col-xxl-5 col-sm-12">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search bg-light border-light"
                        placeholder="Search for customer, email, country, status or something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>

                  <div className="col-xxl-3 col-sm-4">
                    <input
                      type="text"
                      className="form-control bg-light border-light"
                      id="datepicker-range"
                      placeholder="Select date"
                    />
                  </div>

                  <div className="col-xxl-3 col-sm-4">
                    <div className="input-light">
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default"
                        id="idStatus"
                      >
                        <option value="">Status</option>
                        <option value="all" selected>
                          All
                        </option>
                        <option value="Unpaid">Impayé</option>
                        <option value="Paid">Payé</option>
                        <option value="Cancel">Annulé</option>
                        <option value="Refund">Remboursé</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-xxl-1 col-sm-4">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      // onClick="SearchData();"
                    >
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>{" "}
                      Filters
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-body">
              <div>
                <div className="table-responsive table-card">
                  <table
                    className="table align-middle table-nowrap"
                    id="invoiceTable"
                  >
                    <thead className="text-muted">
                      <tr>
                        <th scope="col" style={{ width: "50px" }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkAll"
                              value="option"
                            />
                          </div>
                        </th>
                        <th
                          className="sort text-uppercase"
                          data-sort="invoice_id"
                        >
                          ID
                        </th>
                        <th
                          className="sort text-uppercase"
                          data-sort="customer_name"
                        >
                          Customer
                        </th>
                        <th className="sort text-uppercase" data-sort="email">
                          Email
                        </th>
                       
                        <th className="sort text-uppercase" data-sort="date">
                          Date
                        </th>
                        <th
                          className="sort text-uppercase"
                          data-sort="invoice_amount"
                        >
                          Amount
                        </th>
                        <th className="sort text-uppercase" data-sort="status">
                          Status
                        </th>
                        <th className="sort text-uppercase" data-sort="action">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="list form-check-all"
                      id="invoice-list-data"
                    >
                      {invoicesData?.map((bill: any) => (
                      <tr key={bill.id}
                     
                      >
                        <th scope="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="chk_child"
                              value={bill.id}
                            />
                          </div>
                        </th>
                        <td className="id"  onClick={() => navigate(`/${bill.id}`)}>
                          <a
                            href="/"
                            data-id="25000351"
                            className="fw-medium link-primary"
                          >
                            #{bill.id}
                          </a>
                        </td>
                        <td className="customer_name"  onClick={() => navigate(`/${bill.id}`)}>
                          <div className="d-flex align-items-center">
                            <img
                              src={`assets/images/users/${bill?.customer?.avatar}.jpg`}
                              alt=""
                              className="avatar-xs rounded-circle me-2"
                            />
                            {bill.customer.name}
                          </div>
                        </td>
                        <td className="email"  onClick={() => navigate(`/${bill.id}`)}>{bill.customer.email}</td>
                        
                        <td className="date"  onClick={() => navigate(`/${bill.id}`)}>
                         {bill.created_at}
                          <small className="text-muted">9:58 PM</small>
                        </td>
                        <td className="invoice_amount"  onClick={() => navigate(`/${bill.id}`)}>${bill.amount}</td>
                        <td className="status"  onClick={() => navigate(`/${bill.id}`)}>
                          <span className="badge badge-soft-success text-uppercase">
                          {bill.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-soft-secondary btn-sm dropdown"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ri-more-fill align-middle"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <button
                                  className="dropdown-item"
                                  data-id="25000351"
                                  onClick={() => navigate(`/${bill.id}`)}
                                >
                                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  data-id="25000351"
                                  onClick={() => navigate(`/update-invoice/${bill.id}`)}

                                >
                                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                  Edit
                                </button>
                              </li>
                              <li>
                                <a className="dropdown-item" href="/">
                                  <i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                  Download
                                </a>
                              </li>
                              <li className="dropdown-divider"></li>
                              <li>
                                <a
                                  className="dropdown-item remove-item-btn"
                                  data-bs-toggle="modal"
                                  href="#deleteOrder"
                                >
                                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      ))}
                      
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{width:"75px",height:"75px"}}></lord-icon> */}
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ invoices We did not find
                        any invoices for you search.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <div className="pagination-wrap hstack gap-2">
                    <a className="page-item pagination-prev disabled" href="/">
                      Previous
                    </a>
                    <ul className="pagination listjs-pagination mb-0"></ul>
                    <a className="page-item pagination-next" href="/">
                      Next
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="modal fade flip"
                id="deleteOrder"
                tabIndex={-1}
                aria-labelledby="deleteOrderLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                      {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style="width:90px;height:90px"></lord-icon> */}
                      <div className="mt-4 text-center">
                        <h4>You are about to delete a order ?</h4>
                        <p className="text-muted fs-15 mb-4">
                          Deleting your order will remove all of your
                          information from our database.
                        </p>
                        <div className="hstack gap-2 justify-content-center remove">
                          <button
                            className="btn btn-link link-success fw-medium text-decoration-none"
                            id="deleteRecord-close"
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-line me-1 align-middle"></i>{" "}
                            Close
                          </button>
                          <button className="btn btn-danger" id="delete-record">
                            Yes, Delete It
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default List;
