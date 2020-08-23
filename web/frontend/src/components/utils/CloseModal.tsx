import React from 'react'

export const CloseModal = () => {
    return (
        <div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
