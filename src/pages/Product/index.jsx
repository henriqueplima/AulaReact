// https://api.mercadolibre.com/items/MLB1165400089


import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

class Product extends Component {
  constructor(props) {
    super(props);
    
    this.isLoading = true
    this.state = {
      id: props.match.params.id,
      data: {},
    };
  }
  
  componentDidMount() {
    axios.all([
        axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
        axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
    ])
        .then(([item, description]) => {
            
            console.log(item, description)
            this.isLoading = false;
            this.setState({
                data: {
                    ...item.data,
                    description: description.data.plain_text,
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
    // axios.get(`https://api.mercadolibre.com/items/${this.state.id}`)
    //   .then(({ data }) => {
    //       this.isLoading = false
    //     this.setState({ 
    //       data,
    //     });
    //   });
  }

  showLoading(){
      return (
        <Loading />
      )
  }

  renderContent() {
      const { data } = this.state;

      return (
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--4-col">
              <img src={ data.pictures[0].url}/>
              <div class="mdl-cell mdl-cell--1-col"> {data.title}</div>
              <div class="mdl-cell mdl-cell--2-col"><p>{data.description}</p></div>
            </div>  
          </div>
      )
  }
  
  render() {
    const { data } = this.state;
    return (
        // this.showLoading()
        this.isLoading === true ? this.showLoading() : this.renderContent()
      );
  }
}
  
export default Product;



// https://drive.google.com/open?id=1Hyicm4L13gSyWjqnnBZs3jxnaPByUIiN