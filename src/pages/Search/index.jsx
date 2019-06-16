import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import './style.css';
import maskCurrency from '../../utils/mask'

class Search extends Component {
    constructor(){
        super();
        this.onSearch = this.onSearch.bind(this);
        this.formatValue = this.formatValue.bind(this);
        this.state = {
            results: [],
          };
    }

    onSearch(event) {
        //console.log(event.currentTarget.value);
        const value = event.currentTarget.value;
        axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
            .then((item) => {
                console.log(item.data.results);
                this.setState({
                    results: item.data.results,
                });
            })
    }

    

    formatValue(value) {
        return 'R$ ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    renderItem(item) {
        return (
            <div key={item.id} className="demo-card-wide mdl-card mdl-shadow--2dp mdl-cell--12-col mdl-cell--12-col-tablet">
                <Link to={`/produtos/${item.id}`}>           
                        <div className="mdl-cell mdl-cell--3-col mdl-cell--3-col-phone mdl-cell--3-col-tablet">
                            <img className="thumbnail" src={item.thumbnail}></img>
                        </div>
                        <div className="mdl-cell mdl-cell--9-col mdl-cell--4-col-tablet">
                            <h4> <span className="mdl-card__title-text">{item.title}</span></h4>
                            <div className="mdl-card__supporting-text">
                                <div><h2> {maskCurrency(item.price)}</h2></div>
                                <p> {item.installments.quantity}x {maskCurrency(item.installments.amount)}</p>
                                <p> Total vendidos: {item.sold_quantity} </p>
                                <p>{item.address.city_name} - {item.address.state_name}</p>
                            </div>
                        </div>
                </Link>
            </div>
        );
    }

    render() {
        return(
            <div>
                <style>{'body { background-color: #eee; }'}</style>
                <div id="container">

                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.onSearch}/>
                        <label className="mdl-textfield__label" for="sample1">Search...</label>
                    </div>
                </div>

                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet">  {this.state.results.map(this.renderItem)} </div>
                </div>
            </div>  
        );
    }
}

export default Search;