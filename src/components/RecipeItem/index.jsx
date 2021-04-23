import { Image } from 'antd';
import React, { Component } from 'react'
import './index.css';
export  default class RecipeItem extends Component {
    constructor(props){
        super(props);
    }

    

    render() {
        const { recipe } = this.props;
        return (
            <div>
                <Image src={recipe.avatar} />
            </div>
        );
    }
}