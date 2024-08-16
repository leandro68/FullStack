import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log('NOte', notification)
  if (notification === null) {
    return null
  }

  return (
    <div className="message">
      <Alert variant="success">{notification}</Alert>
    </div>
  )
}

export default Notification
