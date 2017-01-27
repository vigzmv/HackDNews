import React from 'react';

export default class NewsHeader extends React.Component {
    render() {
        return (
            <div className="newsHeader">
                I am NewsHeader.
            </div>
        );
    }
    getLogo() {
        return (
            <div className="newsHeader-logo">
                <a href="https://news.ycombinator.com/"><img src="imgs/logo.png"/></a>
            </div>
        );
    }
    getTitle() {
        return (
            <div className="newsHeader-title">
                <a className="newsHeader-textLink" href="https://news.ycombinator.com/">HackDNews</a>
            </div>
        );
    }
    render() {
        return (
            <div className="newsHeader">
                {this.getLogo()}
                {this.getTitle()}
            </div>
        );
    }
}
