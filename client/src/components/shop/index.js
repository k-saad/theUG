import React, { Component } from 'react';
//import PageTop from '';

import { connect } from 'react-redux';
import Page_Top from '../utils/page_top';

class Shop extends Component {
    componentDidMount() {}
    render(){
        return (
            <div>
                <Page_Top name="shop" />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">left</div>
                        <div className="right">right</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

export default connect(mapStateToProps)(Shop);