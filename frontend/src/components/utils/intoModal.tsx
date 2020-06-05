import React from 'react';

export const intoModal = (content: JSX.Element, modalId: string) => {
    return (
        <div className="modal fade" id={modalId} tabIndex={-1} role="dialog"
            aria-labelledby={`${modalId}Label`} aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content modal-body">
                    {content}
                </div>
            </div>
        </div>
    )
}