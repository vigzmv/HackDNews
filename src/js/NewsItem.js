import React from 'react';
import URL from 'url';

export default class NewsItem extends React.Component {
    getDomain() {
        return URL.parse(this.props.item.url).hostname;
    }

    getTitle() {
        return (
            <div className="newsItem-title">
                <a className="newsItem-titleLink" href={this.props.item.url
                    ? this.props.item.url
                    : 'https://news.ycombinator.com/item?id=' + this.props.item.id}>{this.props.item.title}</a>
                {this.props.item.url && <span className="newsItem-domain">
                    <a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>({this.getDomain()})</a>
                </span>}
            </div>
        );
    }

    render() {
        return (
            <div className="newsItem">
                <div className="newsItem-itemText">
                    {this.getTitle()}
                </div>
            </div>
        );
    }
}
