import React from 'react'
import {render} from 'react-dom';
import NewsList from './NewsList.js';
import NewsHeader from './NewsHeader.js'

render(
    <div>
    <NewsHeader/>
    <div className="loading">
        <img className="gears" src="imgs/gears.gif"/>
    </div>
</div>, document.querySelector('.content'));

const stories = [];
let count = 30;

fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(parent => {
    return parent
    .text();

})
.then(story => {
    if (story.slice(1).split(",").length < 31)
        count = story.slice(1).split(",").length - 1;

    story.slice(1).split(",").slice(0, count)
    .map(itemsId => fetch('https://hacker-news.firebaseio.com/v0/item/' + itemsId + '.json')
    .then(value => {
        return value.json();
    })
    .then(value => {
        stories.push(value);
        if (stories.length == 30) {
            render(
                <NewsList items={stories}/>, document.querySelector('.content'));
        }
        return value;
    }));
});
