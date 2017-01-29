import React from 'react';
import {render} from 'react-dom';
import NewsList from './NewsList.js';

function getStories(storiesName) {

    render(
        <div>
            <NewsHeader/>
            <div className="loading">
                <img className="gears" src="imgs/gears.gif"/>
            </div>
        </div>
    ,document.querySelector('.content'));

    document.querySelector('#'+storiesName).classList.add("bold");

    const stories = [];
    let count = 30;

    fetch('https://hacker-news.firebaseio.com/v0/' + storiesName + '.json').then(parent => {
        return parent.text();

    }).then(story => {
        if (story.slice(1).split(",").length < 31)
            count = story.slice(1).split(",").length - 1;

        story.slice(1).split(",").slice(0, count)
        .map(itemsId => fetch('https://hacker-news.firebaseio.com/v0/item/' + itemsId + '.json').then(value => {
            return value.json();
        })
        .then(value => {
            stories.push(value);
                render(<NewsList items={stories} storiesName={storiesName}/>, document.querySelector('.content'));
            return value;
        }));
    });

}
export default class NewsHeader extends React.Component {

    getLogo() {
        return (
            <div className="newsHeader-logo">
                <a href="https://vigneshm.com/HackDNews/"><img src="imgs/y18.gif"/></a>
            </div>
        );
    }
    getTitle() {
        return (
            <div className="newsHeader-title">
                <a className="newsHeader-textLink HackDNews" href="https://vigneshm.com/HackDNews/">
                    HackDNews </a>
            </div>
        );
    }
    render() {
        return (
            <div className="newsHeader">
                {this.getLogo()}
                {this.getTitle()}
                {this.getNav()}
                {this.getLogin()}
            </div>
        );
    }

    getNav() {
        var navLinks = [
            {
                name: 'new',
                storiesName: 'newstories'
            }, {
                name: 'top',
                storiesName: 'topstories'
            }, {
                name: 'show',
                storiesName: 'showstories'
            }, {
                name: 'ask',
                storiesName: 'askstories'
            }, {
                name: 'jobs',
                storiesName: 'jobstories'
            }
        ];

        const storiesName = this.props.storiesName;
        // href={"https://news.ycombinator.com/" + navLink.url}
        return (
            <div className="newsHeader-nav">
                {navLinks.map(function(navLink) {
                    return (
                        <a id={navLink.storiesName} key={navLink.url} className={storiesName!=navLink.storiesName? "newsHeader-navLink newsHeader-textLink": "newsHeader-navLink newsHeader-textLink bold"} onClick={getStories.bind(null, navLink.storiesName)} href="#">
                            {navLink.name}
                        </a>
                    );
                })}
            </div>
        );
    }

    getLogin() {
        return (
            <div className="newsHeader-login">
                <a className="newsHeader-textLink" href="https://news.ycombinator.com/login?goto=news">login</a>
                &nbsp;&nbsp;
            </div>
        );
    }
}
