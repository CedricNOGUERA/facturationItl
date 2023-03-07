import React from 'react'

interface PropsFilterList {
  filterListProps: any
}

const FilterList: React.FC<PropsFilterList> = ({ filterListProps }) => {
  const {
    searchTerm,
    setSearchTerm,
    invoiceSearch,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
  } = filterListProps

  return (
    <div className='card-body bg-soft-light border border-dashed border-start-0 border-end-0'>
      <form>
        <div className='row g-3'>
          <div className='col-xxl-5 col-sm-12'>
            <div className='search-box'>
              <input
                type='text'
                className='form-control search bg-light border-light'
                placeholder='Recherchez un client, un e-mail, un statut ou quelque chose...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.currentTarget.value)
                  invoiceSearch()
                }}
              />
              <i className='ri-search-line search-icon'></i>
            </div>
          </div>

          <div className='col-xxl-3 col-sm-4'>
            <input
              type='text'
              className='form-control bg-light border-light'
              id='datepicker-range'
              placeholder='Selectionnez une date'
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.currentTarget.value)
                invoiceSearch()
              }}
            />
          </div>

          <div className='col-xxl-3 col-sm-4'>
            <div className='input-light'>
              <select
                className='form-control'
                data-choices
                data-choices-search-false
                name='choices-single-default'
                id='idStatus'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.currentTarget.value)}
              >
                <option value=''>Status</option>
                
                <option value='Unpaid'>Impayé</option>
                <option value='Paid'>Payé</option>
                <option value='Cancel'>Annulé</option>
                <option value='Refund'>Remboursé</option>
              </select>
            </div>
          </div>

          <div className='col-xxl-1 col-sm-4'>
            <button type='button' className='btn btn-primary w-100'>
              <i className='ri-equalizer-fill me-1 align-bottom'></i> Filtres
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FilterList
