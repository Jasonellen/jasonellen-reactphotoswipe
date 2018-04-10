import React from 'react';
import PropTypes from 'prop-types';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import './index.css'

let events = [
	'beforeChange',
	'afterChange',
	'imageLoadComplete',
	'resize',
	'gettingData',
	'mouseUsed',
	'initialZoomIn',
	'initialZoomInEnd',
	'initialZoomOut',
	'initialZoomOutEnd',
	'parseVerticalMargin',
	'close',
	'unbindEvents',
	'destroy',
	'updateScrollOffset',
	'preventDragEvent',
	'shareLinkClick'
]
export class PhotoSwipeGallery extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		options: PropTypes.object,
		thumbnailContent: PropTypes.func,
		id: PropTypes.string,
		className: PropTypes.string,
		isOpen: PropTypes.bool,
		onClose: PropTypes.func
	};

	static defaultProps = {
		options: {},
		thumbnailContent: item => (
			<img src={item.src} width="100" height="100" alt=""/>
		),
		id: '',
		className: '',
		isOpen: false,
		onClose: () => {
		}
	};

	state = {
		isOpen: this.props.isOpen,
		options: Object.assign({},{shareEl: false,tapToClose: true,closeEl:true,captionEl: false,fullscreenEl: false},this.props.options)
	};

	componentWillReceiveProps = (nextProps) => {
		const { isOpen } = this.state;
		if (nextProps.isOpen) {
			if (!isOpen) {
				this.setState({ isOpen: true });
			}
		} else if (isOpen) {
			this.setState({ isOpen: false });
		}
	};

	showPhotoSwipe = itemIndex => (e) => {
		e.preventDefault();
		const getThumbBoundsFn = ((index) => {
			const thumbnail = this.thumbnails[index];
			const img = thumbnail.getElementsByTagName('img')[0];
			const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
			const rect = img.getBoundingClientRect();
			return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
		});
		const { options } = this.state;
		options.index = itemIndex;
		options.getThumbBoundsFn = options.getThumbBoundsFn || getThumbBoundsFn;
		this.setState({
			isOpen: true,
			options
		});
	};

	handleClose = () => {
		this.setState({
			isOpen: false
		});
		this.props.onClose();
	};

	render() {
		const { id, items, thumbnailContent, ...other } = this.props;
		let { className } = this.props;
		className = ('pswp-gallery '+ className).trim();
		const eventProps = Object.assign({},other, events);
		const { isOpen, options } = this.state;
		items.map(function(item){
			if(!item.w)item.w = 1200;
			if(!item.h)item.h = 900;
		})
		return (
			<div id={id} className={className}>
				<div className="pswp-thumbnails">
					{items.map((item, index) => (
						<div
							key={index}
							ref={(node) => {
								this.thumbnails = this.thumbnails || [];
								this.thumbnails[index] = node;
							}}
							className="pswp-thumbnail"
							onClick={this.showPhotoSwipe(index)}
						>
							{thumbnailContent(item)}
						</div>
					))}
				</div>
				<_PhotoSwipe
					{...eventProps}
					isOpen={isOpen}
					items={items}
					options={options}
					onClose={this.handleClose}
				/>
			</div>
		);
	}
}


export default class _PhotoSwipe extends React.Component {
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		items: PropTypes.array.isRequired,
		options: PropTypes.object,
		onClose: PropTypes.func,
		id: PropTypes.string,
		className: PropTypes.string
	};

	static defaultProps = {
		options: {},
		onClose: () => {},
		id: '',
		className: ''
	};

	state = {
		isOpen: this.props.isOpen,
		options: Object.assign({},{shareEl: false,tapToClose: true,closeEl:true,captionEl: false,fullscreenEl: false},this.props.options)
	};

	componentDidMount = () => {
		const { isOpen } = this.state;
		if (isOpen) {
			this.openPhotoSwipe(this.props);
		}
	};

	componentWillReceiveProps = (nextProps) => {
		const { isOpen } = this.state;
		if (nextProps.isOpen) {
			if (!isOpen) {
				this.openPhotoSwipe(nextProps);
			} else {
				this.updateItems(nextProps.items);
			}
		} else if (isOpen) {
			this.closePhotoSwipe();
		}
	};

	componentWillUnmount = () => {
		this.closePhotoSwipe();
	};

	openPhotoSwipe = (props) => {
		const { items } = props;
		this.setState({options:Object.assign({},this.state.options,props.options)},()=>{
			items.map(function(item){
				if(!item.w)item.w = 1200;
				if(!item.h)item.h = 900;
			})
			const pswpElement = document.querySelectorAll('.pswp')[0];

			this.photoSwipe = new Photoswipe(pswpElement, PhotoswipeUIDefault, items, this.state.options);
			events.forEach((event) => {
				const callback = props[event];
				if (callback || event === 'destroy') {
					const self = this;
					this.photoSwipe.listen(event, function (...args) {
						if (callback) {
							args.unshift(this);
							callback(...args);
						}
						if (event === 'destroy') {
							self.handleClose();
						}
					});
				}
			});
			this.setState({
				isOpen: true
			}, () => {
				this.photoSwipe.init();
			});
		})
	};

	updateItems = (items = []) => {
		this.photoSwipe.items.length = 0;
		items.forEach((item) => {
			this.photoSwipe.items.push(item);
		});
		this.photoSwipe.invalidateCurrItems();
		this.photoSwipe.updateSize(true);
	};

	closePhotoSwipe = () => {
		if (!this.photoSwipe) {
			return;
		}
		this.photoSwipe.close();
	};

	handleClose = () => {
		const { onClose } = this.props;
		this.setState({
			isOpen: false
		}, () => {
			if (onClose) {
				onClose();
			}
		});
	};

	render() {
		return (
			<div></div>
		);
	}
}