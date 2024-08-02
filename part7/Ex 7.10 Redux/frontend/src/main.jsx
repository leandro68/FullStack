import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer, {
  setNotification,
} from './components/reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

store.subscribe(() => console.log(store.getState()))
