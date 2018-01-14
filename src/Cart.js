import React, { Component } from 'react';
import './Cart.css';


class Cart extends Component{
	constructor(props){
		super(props);
		// this.showCart = this.showCart.bind(this);
		this.state = {showCart:false};
	}

	// showCart(){
	// 	if(this.state.showCart===false){
	// 		this.setState({showCart:true});
	// 	}else{
	// 		this.setState({showCart:false});
	// 	}
	// }

	componentDidMount() {
		// Listen on document for clicks if clicks occur outside the cart pop up it will close if clicks occur within the cart pop up it will stay open unless the shopping cart icon is clicked then it will toggle open/closed
    	document.addEventListener('click', (e)=>{
			if(e.target.classList.contains('stay-open')){
				this.setState({showCart:true});
			}else if(e.target.classList.contains('cart-btn')){
				if(this.state.showCart===true){
					this.setState({showCart:false});
				}else{
					this.setState({showCart:true});
				}
			}else{
				this.setState({showCart:false});
			}
		});
  	}

	render(){
		const cart = this.props.cart;
		const cartList = cart.map((opal,index)=>{
			return (
				<div className="cart-row stay-open" key={index}>
					<img src={opal.img} alt={opal.name} className='thumbnail stay-open'/>
					1 x {opal.name}
					<i onClick={(e)=>this.props.removeItem(opal.name, index)} className="fa fa-2x fa-times remove stay-open"></i>
				</div>
			);
		})

		return(
		<div className='Cart stay-open'>
			<div className='cart-icon cart-btn'>
				<i className='fa fa-4x fa-shopping-cart cart-btn'></i>
				<span className='items-in-cart cart-btn'>{this.props.itemsInCart}</span>
			</div>
			{this.state.showCart &&
				<div className="cart-pop-up stay-open">
					<span className='shopping-cart-text stay-open'>Shopping Cart:</span>
						{this.props.itemsInCart>0 ? cartList : ''}
					<div><span className='total stay-open'>TOTAL:</span><span className='stay-open amount'>${this.props.total}</span></div>
					<button type="button" className="checkout">CHECK OUT</button>
				</div>
			}
		</div>
		)

	}
}
export default Cart;
