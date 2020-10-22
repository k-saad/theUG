import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pagetop from '../utils/page_top';
import { getProducts } from '../../actions/product_actions';
import { getProductTypes } from '../../actions/product_actions'; 

class Shop extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.dispatch(getProducts());
        this.props.dispatch(getProductTypes());
    }
    render(){
        const products = this.props.products;
        return (
            <div>
                <Pagetop name="Browse Shop" />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">left..</div>
                        <div className="right">right</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        productTypes: state.productTypes
    }
};

export default connect(mapStateToProps)(Shop);