import React, { Component } from 'react';
import './Opal.css';

class Opal extends Component {
	render(){
		return(
			<div className='Opal'>
				<span className='Name'>{this.props.name}</span>
				<img src={this.props.img} alt={this.props.name}/>
				<span className="Price">${this.props.price}</span>

				{/* If item is currently in cart then change button text and disable */}

				{!this.props.inCart ?
					<button type="button" className="add-to-cart" onClick={(e)=>this.props.updateCart(this.props.id)}>
						Add to Cart
					</button> :
					<button type="button" className="add-to-cart" onClick={(e)=>this.props.updateCart(this.props.id)} disabled>
						Not Available
					</button>
				}
			</div>
		)
	}
}

export default Opal;
