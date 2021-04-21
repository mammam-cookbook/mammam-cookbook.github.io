import { Button, Col, Input, Row } from 'antd';
import AppHeader from 'components/Header';
import RecipeItem from 'components/RecipeItem';
import React, { Component } from 'react'
import './index.css';
const { Search } = Input;
export  default class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes : [
                {
                    id: 1,
                    title: 'Mi suon bo',
                    level: 'De',
                    cookingTime: '15 phut',
                    kcal: '124 ',
                    avatar: 'https://i.imgur.com/Co8XCuw.jpg'
                },
                {
                    id: 2,
                    title: 'Mi suon bo 2',
                    level: 'De',
                    cookingTime: '15 phut',
                    kcal: '124 ',
                    avatar: 'https://i.imgur.com/Co8XCuw.jpg'
                },
                {
                    id: 3,
                    title: 'Mi suon bo 3',
                    level: 'De',
                    cookingTime: '15 phut',
                    kcal: '124 ',
                    avatar: 'https://i.imgur.com/Co8XCuw.jpg'
                },
                {
                    id: 4,
                    title: 'Mi suon bo 3',
                    level: 'De',
                    cookingTime: '15 phut',
                    kcal: '124 ',
                    avatar: 'https://i.imgur.com/Co8XCuw.jpg'
                },
                {
                    id: 5,
                    title: 'Mi suon bo 3',
                    level: 'De',
                    cookingTime: '15 phut',
                    kcal: '124 ',
                    avatar: 'https://i.imgur.com/Co8XCuw.jpg'
                },
                {
                    id: 6,
                    title: 'Mi suon bo 3',
                    level: 'De',
                    cookingTime: '15 phut',
                    kcal: '124 ',
                    avatar: 'https://i.imgur.com/Co8XCuw.jpg'
                }
            ]
        };
    }

    

    render() {
        const { recipes } = this.state;
        return (
            <div className="container-fluid">
                <AppHeader />
                <div className='search-banner'>
                    <div className='text-banner'>
                        <p className="text">Eat good</p>
                        <p className='text'>Feel good</p>
                        <Button className="button"> Try it out</Button>
                    </div>
                </div>
                <Row type="flex" justify="center" style={{ margin: '20px 0'}}>
                    <Col xs={24} sm={24} md={14}>
                        <Search
                            style={{
                                width: '100%'
                            }}
                            placeholder="Search Here"
                            enterButton/>
                    </Col>
                </Row>
                <h2>{recipes ? 'BROWSE' : 'RESULT'}</h2>
                <Row gutter={[16, 24]}>
                    {recipes.map(recipe => 
                        <Col md={8} lg={6} sm={24}>
                            <RecipeItem recipe={recipe}/>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}