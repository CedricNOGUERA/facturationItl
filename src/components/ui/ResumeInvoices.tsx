import React from 'react'

const ResumeInvoices = () => {
  return (
    <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-semibold text-muted mb-0">
                    Invoices Sent
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                    +89.24 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span className="counter-value" data-target="559.25">
                      0
                    </span>
                    k
                  </h4>
                  <span className="badge bg-warning me-1">2,258</span>{" "}
                  <span className="text-muted">Invoices sent</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                  <i className="ri-file-text-line fs-3 align-middle text-success icon-dual-success"></i>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-semibold text-muted mb-0">
                    Paid Invoices
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-danger fs-14 mb-0">
                    <i className="ri-arrow-right-down-line fs-13 align-middle"></i>{" "}
                    +8.09 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span className="counter-value" data-target="409.66">
                      0
                    </span>
                    k
                  </h4>
                  <span className="badge bg-warning me-1">1,958</span>{" "}
                  <span className="text-muted">Paid by clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <i
                      data-feather="check-square"
                      className="text-success icon-dual-success"
                    ></i>
                  <i className="ri-check-square-line fs-3 align-middle text-success icon-dual-success"></i>{" "}

                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-semibold text-muted mb-0">
                    Unpaid Invoices
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-danger fs-14 mb-0">
                    <i className="ri-arrow-right-down-line fs-13 align-middle"></i>{" "}
                    +9.01 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span className="counter-value" data-target="136.98">
                      0
                    </span>
                    k
                  </h4>
                  <span className="badge bg-warning me-1">338</span>{" "}
                  <span className="text-muted">Unpaid by clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <i
                      data-feather="clock"
                      className="text-success icon-dual-success"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-semibold text-muted mb-0">
                    Cancelled Invoices
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                    +7.55 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span className="counter-value" data-target="84.20">
                      0
                    </span>
                    k
                  </h4>
                  <span className="badge bg-warning me-1">502</span>{" "}
                  <span className="text-muted">Cancelled by clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <i
                      data-feather="x-octagon"
                      className="text-success icon-dual-success"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ResumeInvoices