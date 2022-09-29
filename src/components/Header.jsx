export default function Header({initialStoreItems, addToCart}) {
    return (<header id="store">
      <h1>Greengrocers</h1>
      <ul className="item-list store--item-list">
        {initialStoreItems.map(item => {
    return <li key={item.id}>
              <div className="store--item-icon">
                <img src={`/assets/icons/${item.id}.svg`} alt={item.alt} />
              </div>
              <button onClick={() => {
        console.log('clicked', item.name);
        return addToCart(item);
      }}>
                Add to cart
              </button>
            </li>;
  })}
      </ul>
    </header>);
  }
