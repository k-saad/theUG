import React from 'react';
import { PromiseProvider } from 'mongoose';

const Page_Top = (props) => {
    return (
        <div className="page_top">
            <div className="container">
                {props.name}
            </div>
        </div>
    )
}

export default Page_Top;