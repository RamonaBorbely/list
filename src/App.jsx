import Header from "./components/Header"
import ItemsList from "./components/ItemsList"
import AddItem from "./components/AddItem"
import { useState, useEffect } from 'react'
import ShowLength from "./components/ShowLength"
function App() {

  const URL_API = 'http://localhost:3500/items'
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
        try {
          const response = await fetch(URL_API)
          if(!response.ok) 
            throw Error("No data")
          const lst = await response.json()
          setItems(lst)
          setFetchErr(null)

        } catch (err) {
          setFetchErr(err.message)
        } finally {
          setIsLoading(false)
        }
    }

    setTimeout(() => {
      fetchData()
    }, 3000)
  
  }, [])
  

  const addItem = (item) => {
    const id = items.length ? items[items.length -1].id + 1 : 1
    const theItem = {id, item, checked: false}
    const newList = [...items, theItem]
    setItems(newList)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return
    addItem(newItem)
    setNewItem('')
  }

  const handleDelete = (id) => {
    const newList = items.filter(item => item.id !== id)
    setItems(newList)
  }

  const handleCheck = (id) => {
    const newList = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(newList)
  }

  return (
    <div className="app">
      <Header title="Clasic List"/>

      <ShowLength length={items.length}/>

      {isLoading ? <h2 style={{color:'green', textAlign:'center'}}>Loading data ...</h2> :
          <ItemsList 
          items={items}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
      />
      }
      {fetchErr && <h2 style={{color:'red', textAlign:'center'}}>{`Error: ${fetchErr}`}</h2>}
      
      <AddItem 
          handleSubmit={handleSubmit}
          newItem={newItem}
          setNewItem={setNewItem}
      />
    </div>
  )
     
}

export default App
