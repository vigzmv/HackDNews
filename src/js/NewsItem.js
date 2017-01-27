import React from 'react';
import URL from 'url';
import Moment from 'moment';

export default class NewsItem extends React.Component {
    getCommentLink() {
        var commentText = 'discuss';
        if (this.props.item.kids && this.props.item.kids.length) {
            commentText = this.props.item.kids.length + ' comment';
        }

        return (
            <a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
        );
    }

    getSubtext() {
        return (
            <div className="newsItem-subtext">
                {this.props.item.score}
                &nbsp;points by&nbsp;
                <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a>
                &nbsp;{Moment.utc(this.props.item.time * 1000).fromNow()}
                &nbsp;| {this.getCommentLink()}
            </div>
        );
    }

    getRank() {
        return (
            <div className="newsItem-rank">
                {this.props.rank}.
            </div>
        );
    }

    getVote() {
        return (
            <div className="newsItem-vote">
                <a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&goto=news'}>
                    <img src="imgs/grayarrow.gif" width="10"/>
                </a>
            </div>
        );
    }

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
                {this.getRank()}
                {this.getVote()}
                <div className="newsItem-itemText">
                    {this.getTitle()}
                    {this.getSubtext()}
                </div>
            </div>
        );
    }

}
