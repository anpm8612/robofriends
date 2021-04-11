import React, {Component} from 'react';

import './App.css';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import { robots } from './robots';

// STATE changes PROPS stays static

// const state = {
// 	robots: robots,
// 	searchfield: ''
// }

// const App = () => {
// 	return(
// 		<div className='tc'>
// 			<h1>RobotFriends</h1>
// 			<SearchBox />
// 			<CardList robots={robots}/>
// 		</div>
// 	);
// }

// to use the state data
class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => {return response.json();})
		.then(users => {this.setState({ robots: users });});
		// .then(users => {});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
		// console.log(filteredRobots);
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		return !robots.length ?
			// We can add a loading bar here too.
			<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RobotFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		);
	}
}

export default App;