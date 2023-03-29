import React from 'react'
import Input from '../ui/Input'

interface PropsFilterList {
  filterListProps: any
  title: string
}

const FilterList: React.FC<PropsFilterList> = ({ filterListProps, title }) => {
  const {
    searchTerm,
    setSearchTerm,
    invoiceSearch,
    invoiceSearchByDate,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
  } = filterListProps

  return (
    <div className='card-body bg-soft-light border border-dashed border-start-0 border-end-0'>
      <span className='text-muted p-2 rounded '>
        <i className='ri-equalizer-fill me-1 align-bottom'></i> Filtres et recherche
      </span>
      <form className='mt-3'>
        <div className='row g-3'>
          <div className='col-xxl-6 col-sm-12'>
            <div className='search-box'>
              <input
                type='text'
                className='form-control search bg-light border-light'
                placeholder='Recherchez un document, par n°, un nom ou e-mail...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.currentTarget.value)
                  invoiceSearch()
                }}
              />
              <i className='ri-search-line search-icon'></i>
            </div>
          </div>
          <div className='col-xxl-3 col-sm-6'>
            <input
              type='text'
              className='form-control search bg-light border-light'
              placeholder='Entrez une date'
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.currentTarget.value)
                invoiceSearchByDate()
              }}
            />
            <button
              className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon'
              type='button'
              id='password-addon'
              aria-label='pass addon'
            >
              <i className='ri-calendar-event-line align-middle'></i>
            </button>
          </div>
          <div className='col-xxl-3 col-sm-6'>
            <div className='input-light'>
              <select
                className='form-control pointer'
                data-choices
                data-choices-search-false
                name='choices-single-default'
                id='idStatus'
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.currentTarget.value)
                }}
              >
                <option value=''>Status</option>
                {title === 'DEVIS' ? (
                  <>
                    <option value='En cours'>En cours</option>
                    <option value='Validé'>Validé</option>
                    <option value='Annulé'>Annulé</option>
                  </>
                ) : (
                  <>
                    <option value='Payée'>Payée</option>
                    <option value='Impayée'>Impayée</option>
                    <option value='Annulée'>Annulée</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FilterList
