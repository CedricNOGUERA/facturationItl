import { StringGradients } from 'antd/es/progress/progress'
import React from 'react'

interface pageTitleProps {
  title: string
}

const PageTitle: React.FC<pageTitleProps> = ({title}: any) => {
  return (
    <div className="row">
    <div className="col-12">
      <div className="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 className="mb-sm-0">Factures</h4>

        <div className="page-title-right">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <a href="/">Factures</a>
            </li>
            <li className="breadcrumb-item active">
            {title}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PageTitle