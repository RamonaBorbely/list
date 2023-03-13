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
    }, 2000)
  
  }, [])
  

  const addItem = async(item) => {
    const id = items.length ? items[items.length -1].id + 1 : 1
    const theItem = {id, item, checked: false}
    const newList = [...items, theItem]
    setItems(newList)

    const postOpt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theItem)
    }
  
    try {
      const response = await fetch(URL_API, postOpt) 
      if(!response.ok) throw Error('Oops! Error occured')
    } catch(err) {
        setFetchErr(err.message)
    } finally {
      setFetchErr(err.message)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return
    addItem(newItem)
    setNewItem('')
  }

  const handleDelete = async(id) => {
    const newList = items.filter(item => item.id !== id)
    setItems(newList)

    const deleteOpt = {
      method: 'DELETE',
    }
    try {
      const response = await fetch(`${URL_API}/${id}`, deleteOpt) 
      if(!response.ok) throw Error('Oops! Error occured')
    } catch(err) {
        setFetchErr(err.message)
    } finally {
        setFetchErr(err.message)
    }

  }

  const handleCheck = async(id) => {
    const newList = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(newList)

    const checkedItem = newList.filter(item => item.id === id)
    const updateOpt = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: checkedItem[0].checked})
    }
    try {
      const response = await fetch(`${URL_API}/${id}`, updateOpt) 
      if(!response.ok) throw Error('Oops! Error occured')
    } catch(err) {
        setFetchErr(err.message)
    } finally {
        setFetchErr(err.message)
    }
  }

  return (
    <div className="app">
      <Header title="Clasic List"/>

      <ShowLength length={items.length}/>

      {isLoading ? <h2 style={{color:'green', textAlign:'center', backgroundColor:'pink'}}>Loading data ...</h2> :
          <ItemsList 
          items={items}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
      />
      }
      {fetchErr && 
        <h2 style={{color:'red', textAlign:'center', backgroundColor:'pink'}}>
          {`Error: ${fetchErr}`}
        </h2>
      }
      
      <AddItem 
          handleSubmit={handleSubmit}
          newItem={newItem}
          setNewItem={setNewItem}
      />
    </div>
  )
     
}

export default App
