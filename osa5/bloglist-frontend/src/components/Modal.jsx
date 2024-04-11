import { useState, useImperativeHandle, forwardRef } from 'react'

const Modal = forwardRef((props, ref) => {
  const [modalMessage, setmodalMessage] = useState(null)
  const [modalStyle, setmodalStyle] = useState(null)

  const setMessage = (message) => {
    setmodalMessage(message)
  }
  const setStyle = (style) => {
    setmodalStyle(style)
  }

  useImperativeHandle(ref, () => {
    return {
      setMessage,
      setStyle
    }
  })

  let modalClass = 'modal green'

  if (modalMessage === null) {
    return null
  }
  if (modalStyle !== null) {
    modalClass = 'modal red'
  }

  return (
    <div className='container'>
      <div className={modalClass}>
        {modalMessage}
      </div>
    </div>
  )
})

Modal.displayName = 'Modal'

export default Modal
