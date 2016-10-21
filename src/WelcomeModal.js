import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';

export default class WelcomeModal extends React.Component {

	state = {showModal: true, booksCount: 10000};

	closeModal = () => {
		this.setState({showModal: false});
		this.props.start(this.state.booksCount);
	};

	render () {
		return (
			<div className="static-modal">
				<Modal show={this.state.showModal}>
					<Modal.Header>
						<Modal.Title>Large list generator</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Welcome to books generator</p>
						<p>Please select how many books would you like to create</p>

						<p>Notice that while books are being generater you can perform filtering and sorting
						on the books that have been already created. After all the books are created the list
						will automatically refresh</p>

						<FormControl
							componentClass="select"
							data-name="filterBookType"
							onChange={e => this.setState({booksCount: e.target.value})}>
							<option value="10000">10 000 books</option>
							<option value="50000">50 000 books</option>
							<option value="100000">100 000 books</option>
							<option value="200000">200 000 books</option>
							<option value="500000">500 000 books</option>
							<option value="1000000">1 000 000 books</option>
						</FormControl>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={ this.closeModal }>Generate</Button>
					</Modal.Footer>
				</Modal>
			</div>)
	}
}
