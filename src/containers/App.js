import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }


    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }


    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value })
    }

    render() {
      const { robots, searchfield } = this.state
        const filterRobots = robots.filter(robot =>{
            return (robot.name.toLowerCase().includes(searchfield.toLowerCase()) ||
                    robot.email.toLowerCase().includes(searchfield.toLowerCase()));
        })
        if(robots.length===0){
          return(
            <div className='h1Center'>
              <h1>Loading...</h1>
            </div>
          );
        }else{
           return (
               <div className='tc'>
                   <h1 className='f1'>RoboFriends</h1>
                   <SearchBox searchChange={this.onSearchChange}/>
                   <Scroll>
                     <CardList robots={filterRobots} />
                   </Scroll>
               </div>
          );
        }

    }
}

export default App;
