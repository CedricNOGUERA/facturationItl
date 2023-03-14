import React from 'react'




interface PropsFilterList {
  filterListProps: any
}

const FilterList: React.FC<PropsFilterList> = ({ filterListProps }) => {
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


  // const dateNow = (new Date().getDate().toString().length === 1 ? "0" + new Date().getDate() : new Date().getDate()) +"/"+  (new Date().getMonth().toString().length === 1 ? "0" + (new Date().getMonth()+1 ): new Date().getMonth()+1) +"/"+ new Date().getFullYear()
     

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   setDateFilter(dateString)
  //   // invoiceSearchByDate()
    
  // };

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

          <div className='col-xxl-3 col-sm-6'>
            {/* <DatePicker
              className='form-control'
              defaultValue={dayjs(dateNow, dateFormatList[0])}
              format={dateFormatList}
              onChange={onChange}
            /> */}
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
            >
              <i className='ri-calendar-event-line align-middle'></i>
            </button>
          </div>

          <div className='col-xxl-3 col-sm-6'>
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

          {/* <div className='col-xxl-1 col-sm-4'>
            <button type='button' className='btn btn-primary w-100'>
              <i className='ri-equalizer-fill me-1 align-bottom'></i> Filtres
            </button>
          </div> */}
        </div>
      </form>
    </div>
  )
}

export default FilterList
