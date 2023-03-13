import React, {useState} from 'react'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {


  return (
    <form 
      className='form'
      onSubmit={handleSubmit}
      >
      <input 
        type='text'
        placeholder='Add new item'
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
        required
      />
      <button 
        className='btn btn-plus'
        aria-label='Add new item'
        >
          +
      </button>
    </form>
  )
}

export default AddItem

