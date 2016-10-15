import React from 'react';
import {ProgressBar} from 'react-bootstrap';

export default React.createClass({
	render: function () {
		return (
			<ProgressBar
				now={this.props.progress}
				label={this._getLabel()}/>
		)
	},

	_getLabel: function() {
		if (this.props.progress === 100)
			return 'books loaded';
		else {
			var progress;
			if (this.props.total >= 5000)
				progress = + this.props.loaded/1000 + 'k / '+ this.props.total/1000 +'k';
			else
				progress = this.props.loaded +' / ' + this.props.total;

			return 'loading books... (' + progress + ')'
		}
	}
});
