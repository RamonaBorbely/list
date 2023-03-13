import React from 'react'

const ItemLine = ({item, handleDelete, handleCheck}) => {
  return (
    <li>
      <input 
        type='checkbox'
        onChange={() => handleCheck(item.id)}
        checked={item.checked} // to check the box when line through
      />
      <label 
        style={item.checked ? {textDecoration: 'line-through'}: null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <button 
        className='btn'
        onClick={e => handleDelete(item.id)}
        >
        X
      </button>
    </li>
  )
}

export default ItemLine
