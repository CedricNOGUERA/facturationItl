    import React from 'react'

    interface DeleteInvoiceIdProps {
        deleteDocId: string
        handleCancel: any
        trigger: string
    }

    const deleteModal: React.FC<DeleteInvoiceIdProps> = ({deleteDocId, handleCancel, trigger}) => {
    return (
        <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
            <div className='modal-body p-5 text-center'>
            <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{width:"90px", height:"90px"}}></lord-icon>
            <div className='mt-4 text-center'>
                <h4>Voulez-vous annuler {trigger === 'DEVIS' ? 'ce devis' : 'cette facture'} ?</h4>
                <p className='text-muted fs-15 mb-4'>
                {trigger === 'DEVIS' ? 'Les informations, de ce devis, seront concervés dans votre base de donnée. Seul son status changera' : 'Les informations, de cette facture, seront concervées dans votre base de donnée. Seul son status changera'}
                
                </p>
                <div className='hstack gap-2 justify-content-center remove'>
                <button
                    className='btn btn-link link-success fw-medium text-decoration-none'
                    id='deleteRecord-close'
                    data-bs-dismiss='modal'
                >
                    <i className='ri-close-line me-1 align-middle'></i> Fermer
                </button>
                <button className='btn btn-danger' id='delete-record' onClick={() => handleCancel(deleteDocId)} data-bs-dismiss='modal'>
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
