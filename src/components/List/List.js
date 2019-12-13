import React, {Component} from 'react';
import  axios from 'axios';
import './List.css'

class List extends Component {
    state = {
      countryNames: [],
      countryInfo: {},
        borders:[],
        area: 0,
    };


    componentDidMount = async () => {
        const res = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code');
                const countryNames = res.data;
                this.setState({countryNames: countryNames});
    };

    getCountryInfo = async alpha => {
        const res = await axios.get('https://restcountries.eu/rest/v2/alpha/' + alpha);
        const countryInfo = res.data;
        this.setState({countryInfo});
            let request = this.state.countryInfo.borders.map(border =>{
               return axios.get('https://restcountries.eu/rest/v2/alpha/' + border + '?fields=name');
            });
            Promise.all(request).then(borders => {
                    let countryBorders = borders.map(border => border.data);
                    this.setState({borders: countryBorders})
                })
    };

    render() {
        return (
            <div className="table">
                <div  className="List">
                    <ul>
                        {this.state.countryNames.map(countryName =>
                            <li
                                id={countryName.alpha3Code}
                                key={countryName.alpha3Code}
                                onClick={() => this.getCountryInfo(countryName.alpha3Code)}>
                                {countryName.name}
                            </li>)}
                    </ul>
                </div>
                    <div>
                            <p>Name: {this.state.countryInfo.name}</p>
                            <p>Area: {this.state.countryInfo.area}</p>
                            <p>Population: {this.state.countryInfo.population}</p>
                            <div>Borders:
                                {this.state.borders.map(border => {
                                    return <p key={border.name}>{border.name}</p>
                                })}
                            </div>
                    </div>
            </div>
        );
    }
}

export default List;