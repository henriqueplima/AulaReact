// https://api.mercadolibre.com/items/MLB1165400089


import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import './style.css';
import maskCurrency from '../../utils/mask'

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
            
            // console.log(item)
            // this.isLoading = false;
            // this.setState({
            //     data: {
            //         ...item.data,
            //         description: description.data.plain_text,
            //     }
            // });

            axios.get(`https://api.mercadolibre.com/users/${item.data.seller_id}`)
            .then((seller) => {
                console.log(seller)
                this.isLoading = false;
                this.setState({
                  data: {
                    ...item.data,
                    description: description.data.plain_text,
                    seller: seller.data
                  }
              });
              console.log(this.state);
            })
            .catch((err) => {

              console.log(err);
                this.isLoading = false;
                this.setState({
                  data: {
                    ...item.data,
                    description: description.data.plain_text,
                  }
                });
            });




        })
        .catch((err) => {
            console.log(err);
        });
    
  }

  showLoading(){
      return (
        <Loading />
      )
  }

  renderContent() {
      const { data } = this.state;

      return (
        
          <div className="demo-card mdl-shadow--2dp" >
            
              <div className="mdl-grid" style={{ backgroundColor: '#fff' }}>

                <div className="mdl-card__media">
                  <img className="thumb" src={ data.pictures[0].url}/>
                </div>
                <div className="mdl-card__supporting-text">
                  <div><h3> {this.state.data.title}</h3></div>
                  <div><b>Vendedor:</b> {this.state.data.seller.nickname}</div>
                  <div><b>Reputação:</b> {this.state.data.seller.seller_reputation.power_seller_status}</div>
                  <h2><div><b>{ maskCurrency(this.state.data.price)}</b></div></h2>

                  <div>
                    <div><h4>Descrição:</h4></div>
                      <div>  {this.state.data.description} </div>
                  </div>
                </div>

              </div>
           
        </div>
      )
  }
  
  render() {
    const { data } = this.state;
    return (
        this.isLoading === true ? this.showLoading() : this.renderContent()
      );
  }
}
  
export default Product;



// https://drive.google.com/open?id=1Hyicm4L13gSyWjqnnBZs3jxnaPByUIiN