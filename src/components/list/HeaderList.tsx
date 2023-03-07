import React from 'react'
import { Link } from 'react-router-dom'

const HeaderList: React.FC = () => {
  return (
    <div className="card-header border-0">
    <div className="d-flex align-items-center">
      <h5 className="card-title mb-0 flex-grow-1 fs-17">Liste des factures</h5>
      <div className="flex-shrink-0">

        <Link to="/create-invoice" className="btn btn-danger">
          <i className="ri-add-line align-bottom me-1"></i> Créer une facture
        </Link>
      </div>
    </div>
  </div>
  )
}

export default HeaderList
