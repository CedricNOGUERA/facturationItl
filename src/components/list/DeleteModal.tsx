    import React from 'react'

    interface DeleteInvoiceIdProps {
        deleteInvoiceId: string
        handleCanelInvoice: any
    }

    const deleteModal: React.FC<DeleteInvoiceIdProps> = ({deleteInvoiceId, handleCanelInvoice}) => {
    return (
        <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
            <div className='modal-body p-5 text-center'>
            <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{width:"90px", height:"90px"}}></lord-icon>
            <div className='mt-4 text-center'>
                <h4>Voulez-vous supprimer une facture ?</h4>
                <p className='text-muted fs-15 mb-4'>
                Les informations, de cette facture, seront supprimer de votre base de donnée
                </p>
                <div className='hstack gap-2 justify-content-center remove'>
                <button
                    className='btn btn-link link-success fw-medium text-decoration-none'
                    id='deleteRecord-close'
                    data-bs-dismiss='modal'
                >
                    <i className='ri-close-line me-1 align-middle'></i> Fermer
                </button>
                <button className='btn btn-danger' id='delete-record' onClick={() => handleCanelInvoice(deleteInvoiceId)} data-bs-dismiss='modal'>
                    Oui, supprime
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
    }

    export default deleteModal
