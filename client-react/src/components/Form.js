import Axios from 'axios';
import "./Form.css"
import React, { Component } from 'react';

export default class Form extends Component{

    constructor(props) {
        super(props)
        this.state = {
            body: this.props.body || '',
           heading: this.props.heading || '',
           email: this.props.email || '',
           password: this.props.password || ''
        }
        this.handleHeadingChange = this.handleHeadingChange.bind(this)
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log(props)
    }

    handleBodyChange(e) {
        this.setState({
            body: e.target.value
        });
    }

    handleHeadingChange(e) {
        console.log({...this.state})
        this.setState({
            heading: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        let url = "http://localhost:3001/topics/create"
        Axios.post(url, {...this.state}).then(response => console.log(response))
    }

    render() {
        return (
            <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="blog_post">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Heading</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="blog_post_title"
                                   required="required"
                                   value={this.state.heading}
                                   onChange={this.handleHeadingChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="blog_post_body"
                                   required="required"
                                   value={this.state.body}
                                   onChange={this.handleBodyChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit"
                                    id="blog_post_submit"
                                    className="postButton">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}