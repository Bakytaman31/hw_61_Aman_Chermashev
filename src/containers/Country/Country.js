import React, {Component} from 'react';
import List from "../../components/List/List";
// import CountryInfo from "../../components/CountryInfo/CountryInfo";

class Country extends Component {
    render() {
        return (
            <div key="Country">
                <List key="List"/>
            </div>
        );
    }
}

export default Country;