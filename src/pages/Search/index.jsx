import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
class Search extends Component {
    constructor(){
        super();
        this.onSearch = this.onSearch.bind(this);
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

    renderItem(item) {
        return (
            <tbody>
                <tr key={item.id}>
                    <td class="mdl-data-table__cell--non-numeric">{item.id}</td>
                    <td>{item.title}</td>
                    <Link to={`/produtos/${item.id}`}>
                        Abrir Produto
                    </Link>
                </tr>
            </tbody>
            // <li key={item.id}>
            //     <span>{ item.id}</span>
            //     <span>{item.title}</span>
            // </li>
        );
    }
    render() {
        return(
            <div>
                <input type="text" onChange= {this.onSearch} />
                <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                    {this.state.results.map(this.renderItem)}
                </table>
            </div>        
        );
    }
}

export default Search;