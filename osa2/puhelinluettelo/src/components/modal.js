const Modal = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="container">
            <div className="modal">
                {message}
            </div>
        </div>
    )
}

export default Modal
