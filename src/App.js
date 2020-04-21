import React, {Component} from 'react';
import './App.css';
import MainPage from './Components/mainPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <MainPage />
            </div>
        )
    }
}

export default App;
