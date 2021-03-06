import React, { Component } from 'react';
import Form from './Form';

export default class Create extends Component {

    handleSubmit(data) {
        console.log('form submission data', data);
    }

    render() {
        return (
                                <div>
                                    <Form onSubmit={this.handleSubmit} {...this.props}></Form>
                                </div>
        );
    }
}