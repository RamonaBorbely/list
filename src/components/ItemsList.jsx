import React from 'react'
import ItemLine from './ItemLine'


const ItemsList = ({items, handleDelete, handleCheck}) => {
   return (
      <ul>
        {items.map(item => (
            <ItemLine 
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                handleCheck={handleCheck}
            />))}
      </ul>
   )
   
   }

export default ItemsList
