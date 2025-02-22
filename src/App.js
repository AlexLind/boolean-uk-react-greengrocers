import './styles/reset.css'
import './styles/index.css'

import initialStoreItems from './store-items'
import { useState } from 'react'

import Header from './components/Header'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔
*/

console.log(initialStoreItems)

export default function App() {
  const [cart, setCart] = useState([])

  const addToCart = targetItem => {
    if (!cart.includes(targetItem)) {
    targetItem.quantity = 1
    setCart([...cart, targetItem])}
    else {
      targetItem.quantity++
      setCart([...cart])
    }
  }

  const addItemQuantity = targetItem => {
    const updatedCart = item =>
      item.map(item =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity++ }
          : item
      )
    setCart(updatedCart)
  }

  const decreaseItemQuantity = targetItem => {
    const updatedCart = item =>
      item.map(item =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity-- }
          : item
      )
    setCart(updatedCart)
  }

  const removeFromCart = targetItem => {
    console.log(targetItem.quantity)
    if (targetItem.quantity === 1) {
      console.log(`Removing ${targetItem.name} from cart`)
      const updatedCart = cart.filter(item => item !== targetItem)
      setCart(updatedCart)
    }
  }

  const calculateTotal = () => {
    let total = 0
    cart.forEach(item => (total += item.quantity * item.price))
    return `£${total.toFixed(2)}`
  }

  console.log(cart)

  return (
    <>
      <Header initialStoreItems={initialStoreItems} addToCart={addToCart}/>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map(item => {
              return (
                <li key={item.id}>
                  <img
                    className="cart--item-icon"
                    src={`/assets/icons/${item.id}.svg`}
                    alt={item.alt}
                  />
                  <p>{item.name}</p>
                  <button
                    className="quantity-btn remove-btn center"
                    onClick={() => {
                      console.log('clicked -', item.name)
                      decreaseItemQuantity(item)
                      removeFromCart(item)
                    }}
                  >
                    -
                  </button>
                  <span className="quantity-text center">{item.quantity}</span>
                  <button
                    className="quantity-btn add-btn center"
                    onClick={() => {
                      console.log('clicked +', item.name)
                      addItemQuantity(item)
                    }}
                  >
                    +
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">{calculateTotal()}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )

          }
