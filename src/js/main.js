import $ from 'jquery';
import React from 'react'
import {render} from 'react-dom';
import NewsList from './NewsList.js';
import NewsHeader from './NewsHeader.js'

render(
    <div>
    <NewsHeader/>
    <div className="loading">
        <img className="gears" src="imgs/gears.gif" />
    </div>
</div>, document.querySelector('.content'));

function get(url) {
    return Promise.resolve($.ajax(url));
}

get('https://hacker-news.firebaseio.com/v0/topstories.json').then(function(stories) {
    return Promise.all(stories.slice(0, 30).map(itemId => get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json')));
}).then(function(items) {
    render(
        <NewsList items={items}/>, document.querySelector('.content'));
}).catch(function(err) {
    console.log('error occur', err);
});
