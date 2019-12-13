import React, {Component} from 'react';
import Country from "./containers/Country/Country";

class App extends Component {
    render() {
        return (
            <Country key="CountryContainer"/>
        );
    }
}

export default App;