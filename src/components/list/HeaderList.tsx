import React from 'react'
import { Link } from 'react-router-dom'



const HeaderList = ({title}: any) => {
  return (
    <div className="card-header border-0">
    <div className="d-flex align-items-center">
      <h5 className="card-title mb-0 flex-grow-1 fs-17">Liste des {title}</h5>
      <div className="flex-shrink-0">

        <Link to={title === 'facture' ? "/create-invoice" : "/create-devis"} className="btn btn-danger">
          <i className="ri-add-line align-bottom me-1"></i> Créer {title === 'facture' ? `une ${title}` : `un ${title}`}
        </Link>
      </div>
    </div>
  </div>
  )
}

export default HeaderList
