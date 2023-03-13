import Header from "./components/Header"
import ItemsList from "./components/ItemsList"
import AddItem from "./components/AddItem"
import { useState } from 'react'
import ShowLength from "./components/ShowLength"
function App() {

  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([
    {
      id:1,
      item: 'item1',
      checked: false
    },
    {
      id:2,
      item: 'item2',
      checked: false

    },
    {
      id:3,
      item: 'item3',
      checked: false

    },
  ])

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

      <ItemsList 
          items={items}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
      />
          
      <AddItem 
          handleSubmit={handleSubmit}
          newItem={newItem}
          setNewItem={setNewItem}
      />
    </div>
  )
     
}

export default App
