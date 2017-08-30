﻿// @hash v3-FBA0AE670B53F93275F2CF6C24971CDB5A6FB4A5
// Automatically generated by ReactJS.NET. Do not edit, your changes will be overridden.
// Version: 3.1.0-dev-20170829-1956 (build 08021a5) with Babel 6.7.7
// Generated at: 2017-08-29 19:59:40
///////////////////////////////////////////////////////////////////////////////
/**
 *  Copyright (c) 2014-Present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant 
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

var CommentsBox = React.createClass({
	displayName: 'CommentsBox',

	propTypes: {
		initialComments: React.PropTypes.array.isRequired,
		page: React.PropTypes.number
	},
	getInitialState: function getInitialState() {
		return {
			comments: this.props.initialComments,
			page: this.props.page,
			hasMore: true,
			loadingMore: false
		};
	},
	loadMoreClicked: function loadMoreClicked(evt) {
		var _this = this;

		var nextPage = this.state.page + 1;
		this.setState({
			page: nextPage,
			loadingMore: true
		});

		var url = evt.target.href;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function () {
			var data = JSON.parse(xhr.responseText);
			_this.setState({
				comments: _this.state.comments.concat(data.comments),
				hasMore: data.hasMore,
				loadingMore: false
			});
		};
		xhr.send();
		evt.preventDefault();
	},
	render: function render() {
		var commentNodes = this.state.comments.map(function (comment) {
			return React.createElement(
				Comment,
				{ author: comment.Author },
				comment.Text
			);
		});

		return React.createElement(
			'div',
			{ className: 'comments' },
			React.createElement(
				'h1',
				null,
				'Comments'
			),
			React.createElement(
				'ol',
				{ className: 'commentList' },
				commentNodes
			),
			this.renderMoreLink()
		);
	},
	renderMoreLink: function renderMoreLink() {
		if (this.state.loadingMore) {
			return React.createElement(
				'em',
				null,
				'Loading...'
			);
		} else if (this.state.hasMore) {
			return React.createElement(
				'a',
				{ href: '/comments/page-' + (this.state.page + 1), onClick: this.loadMoreClicked },
				'Load More'
			);
		} else {
			return React.createElement(
				'em',
				null,
				'No more comments'
			);
		}
	}
});

var Comment = React.createClass({
	displayName: 'Comment',

	propTypes: {
		author: React.PropTypes.object.isRequired
	},
	render: function render() {
		return React.createElement(
			'li',
			null,
			React.createElement(Avatar, { author: this.props.author }),
			React.createElement(
				'strong',
				null,
				this.props.author.Name
			),
			': ',
			this.props.children
		);
	}
});

var Avatar = React.createClass({
	displayName: 'Avatar',

	propTypes: {
		author: React.PropTypes.object.isRequired
	},
	render: function render() {
		return React.createElement('img', {
			src: this.getPhotoUrl(this.props.author),
			alt: 'Photo of ' + this.props.author.Name,
			width: 50,
			height: 50,
			className: 'commentPhoto'
		});
	},
	getPhotoUrl: function getPhotoUrl(author) {
		return 'https://avatars.githubusercontent.com/' + author.GithubUsername + '?s=50';
	}
});