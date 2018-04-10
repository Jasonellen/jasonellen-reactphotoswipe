import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2, _class2, _temp4, _initialiseProps;

import React from 'react';
import PropTypes from 'prop-types';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import './index.css';

var events = ['beforeChange', 'afterChange', 'imageLoadComplete', 'resize', 'gettingData', 'mouseUsed', 'initialZoomIn', 'initialZoomInEnd', 'initialZoomOut', 'initialZoomOutEnd', 'parseVerticalMargin', 'close', 'unbindEvents', 'destroy', 'updateScrollOffset', 'preventDragEvent', 'shareLinkClick'];
export var PhotoSwipeGallery = (_temp2 = _class = function (_React$Component) {
	_inherits(PhotoSwipeGallery, _React$Component);

	function PhotoSwipeGallery() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PhotoSwipeGallery);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhotoSwipeGallery.__proto__ || _Object$getPrototypeOf(PhotoSwipeGallery)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			isOpen: _this.props.isOpen,
			options: _Object$assign({}, { shareEl: false, tapToClose: true, closeEl: true, captionEl: false, fullscreenEl: false }, _this.props.options)
		}, _this.componentWillReceiveProps = function (nextProps) {
			var isOpen = _this.state.isOpen;

			if (nextProps.isOpen) {
				if (!isOpen) {
					_this.setState({ isOpen: true });
				}
			} else if (isOpen) {
				_this.setState({ isOpen: false });
			}
		}, _this.showPhotoSwipe = function (itemIndex) {
			return function (e) {
				e.preventDefault();
				var getThumbBoundsFn = function getThumbBoundsFn(index) {
					var thumbnail = _this.thumbnails[index];
					var img = thumbnail.getElementsByTagName('img')[0];
					var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
					var rect = img.getBoundingClientRect();
					return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
				};
				var options = _this.state.options;

				options.index = itemIndex;
				options.getThumbBoundsFn = options.getThumbBoundsFn || getThumbBoundsFn;
				_this.setState({
					isOpen: true,
					options: options
				});
			};
		}, _this.handleClose = function () {
			_this.setState({
				isOpen: false
			});
			_this.props.onClose();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PhotoSwipeGallery, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    id = _props.id,
			    items = _props.items,
			    thumbnailContent = _props.thumbnailContent,
			    other = _objectWithoutProperties(_props, ['id', 'items', 'thumbnailContent']);

			var className = this.props.className;

			className = ('pswp-gallery ' + className).trim();
			var eventProps = _Object$assign({}, other, events);
			var _state = this.state,
			    isOpen = _state.isOpen,
			    options = _state.options;

			items.map(function (item) {
				if (!item.w) item.w = 1200;
				if (!item.h) item.h = 900;
			});
			return React.createElement(
				'div',
				{ id: id, className: className },
				React.createElement(
					'div',
					{ className: 'pswp-thumbnails' },
					items.map(function (item, index) {
						return React.createElement(
							'div',
							{
								key: index,
								ref: function ref(node) {
									_this2.thumbnails = _this2.thumbnails || [];
									_this2.thumbnails[index] = node;
								},
								className: 'pswp-thumbnail',
								onClick: _this2.showPhotoSwipe(index)
							},
							thumbnailContent(item)
						);
					})
				),
				React.createElement(_PhotoSwipe, _extends({}, eventProps, {
					isOpen: isOpen,
					items: items,
					options: options,
					onClose: this.handleClose
				}))
			);
		}
	}]);

	return PhotoSwipeGallery;
}(React.Component), _class.propTypes = {
	items: PropTypes.array.isRequired,
	options: PropTypes.object,
	thumbnailContent: PropTypes.func,
	id: PropTypes.string,
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func
}, _class.defaultProps = {
	options: {},
	thumbnailContent: function thumbnailContent(item) {
		return React.createElement('img', { src: item.src, width: '100', height: '100', alt: '' });
	},
	id: '',
	className: '',
	isOpen: false,
	onClose: function onClose() {}
}, _temp2);

var _PhotoSwipe = (_temp4 = _class2 = function (_React$Component2) {
	_inherits(_PhotoSwipe, _React$Component2);

	function _PhotoSwipe() {
		var _ref2;

		var _temp3, _this3, _ret2;

		_classCallCheck(this, _PhotoSwipe);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref2 = _PhotoSwipe.__proto__ || _Object$getPrototypeOf(_PhotoSwipe)).call.apply(_ref2, [this].concat(args))), _this3), _initialiseProps.call(_this3), _temp3), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(_PhotoSwipe, [{
		key: 'render',
		value: function render() {
			return React.createElement('div', null);
		}
	}]);

	return _PhotoSwipe;
}(React.Component), _class2.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	options: PropTypes.object,
	onClose: PropTypes.func,
	id: PropTypes.string,
	className: PropTypes.string
}, _class2.defaultProps = {
	options: {},
	onClose: function onClose() {},
	id: '',
	className: ''
}, _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.state = {
		isOpen: this.props.isOpen,
		options: _Object$assign({}, { shareEl: false, tapToClose: true, closeEl: true, captionEl: false, fullscreenEl: false }, this.props.options)
	};

	this.componentDidMount = function () {
		var isOpen = _this4.state.isOpen;

		if (isOpen) {
			_this4.openPhotoSwipe(_this4.props);
		}
	};

	this.componentWillReceiveProps = function (nextProps) {
		var isOpen = _this4.state.isOpen;

		if (nextProps.isOpen) {
			if (!isOpen) {
				_this4.openPhotoSwipe(nextProps);
			} else {
				_this4.updateItems(nextProps.items);
			}
		} else if (isOpen) {
			_this4.closePhotoSwipe();
		}
	};

	this.componentWillUnmount = function () {
		_this4.closePhotoSwipe();
	};

	this.openPhotoSwipe = function (props) {
		var items = props.items;

		_this4.setState({ options: _Object$assign({}, _this4.state.options, props.options) }, function () {
			items.map(function (item) {
				if (!item.w) item.w = 1200;
				if (!item.h) item.h = 900;
			});
			var pswpElement = document.querySelectorAll('.pswp')[0];

			_this4.photoSwipe = new Photoswipe(pswpElement, PhotoswipeUIDefault, items, _this4.state.options);
			events.forEach(function (event) {
				var callback = props[event];
				if (callback || event === 'destroy') {
					var self = _this4;
					_this4.photoSwipe.listen(event, function () {
						if (callback) {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							args.unshift(this);
							callback.apply(undefined, args);
						}
						if (event === 'destroy') {
							self.handleClose();
						}
					});
				}
			});
			_this4.setState({
				isOpen: true
			}, function () {
				_this4.photoSwipe.init();
			});
		});
	};

	this.updateItems = function () {
		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		_this4.photoSwipe.items.length = 0;
		items.forEach(function (item) {
			_this4.photoSwipe.items.push(item);
		});
		_this4.photoSwipe.invalidateCurrItems();
		_this4.photoSwipe.updateSize(true);
	};

	this.closePhotoSwipe = function () {
		if (!_this4.photoSwipe) {
			return;
		}
		_this4.photoSwipe.close();
	};

	this.handleClose = function () {
		var onClose = _this4.props.onClose;

		_this4.setState({
			isOpen: false
		}, function () {
			if (onClose) {
				onClose();
			}
		});
	};
}, _temp4);

export { _PhotoSwipe as default };