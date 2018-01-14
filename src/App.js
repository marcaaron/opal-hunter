import React, { Component } from 'react';
import './App.css';
import Opal from './Opal.js';
import Cart from './Cart.js';
import data from './inventory.json';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			itemsInCart:0,
			inventory: data,
			cart: [],
			total: 0,
		}
		this.updateCart = this.updateCart.bind(this);
		this.removeItem = this.removeItem.bind(this);

	}

	updateCart(index){
		let inventory = {...this.state.inventory};
		let cart = [...this.state.cart];
		let total = parseFloat(this.state.total);
		inventory.opals[index].inCart=true;
		cart.push(inventory.opals[index]);
		let price = inventory.opals[index].price;
		total += price;
		total = total.toFixed(2);
		let itemsInCart = cart.length;
		this.setState({itemsInCart, inventory, cart, total});
	}

	removeItem(name, index){
		let cart = [...this.state.cart];
		let cartIndex = index;
		cart.splice(cartIndex, 1);

		let inventory = {...this.state.inventory};
		let inventoryIndex;
		for(let i=0; i<inventory.opals.length;i++){
			if(inventory.opals[i].name===name){
				inventoryIndex = i;
			}
		};
		inventory.opals[inventoryIndex].inCart=false;
		let total = parseFloat(this.state.total);
		let price = inventory.opals[inventoryIndex].price;
		total -= price;
		total = total.toFixed(2);
		let itemsInCart = cart.length;
		this.setState({cart, inventory, total, itemsInCart});
	}

  render() {
	  const opals = this.state.inventory.opals;
    return (
      <div className="app-container">
		 <div className='header-col'>
			<div className="header">
				<h1>Opal Hunter</h1>
		  		<Cart removeItem={this.removeItem} total={this.state.total} cart={this.state.cart} itemsInCart={this.state.itemsInCart}/>

				<div className="rainbow-bar"></div>
			</div>
			<div className='sub-heading'>
				<h2 className="sub-head">A Simple ReactJS Shopping Cart</h2>
				<img className="react-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"></img>
			</div>
		</div>
		<div className="main">
			{opals.map((opal,index) =>
				<Opal
					updateCart={this.updateCart}
					key={index}
					id={index}
					name={opal.name}
					img={opal.img}
					price={opal.price}
					inCart={opal.inCart}
				/>)}
		</div>
      </div>
    );
  }
}

export default App;
