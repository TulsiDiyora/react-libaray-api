import './App.css'
import { Route, Routes } from 'react-router'
import View from './Components/View/View'
import LibraryForm from './Components/LibraryForm/LibraryForm'
import { Provider } from 'react-redux'
import store from './store'
import EditData from './Components/EditData/EditData'
function App() {

  return (
    <>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LibraryForm />} />
            <Route path="/view" element={<View />} />
            <Route path="/edit" element={<EditData />} />
          </Routes>
        </Provider>


    </>
  )
}

export default App

