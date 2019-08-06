import React, { Component } from 'react';
import api from '../../services/API';
import './styles.css';
import { PropagateLoader } from 'react-spinners';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      loading: false
    };
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      await api
        .get(`/products/${this.state.id}`)
        .then(res => {
          this.setState({
            product: res.data,
            loading: false
          });
        })
        .catch(e => {
          this.setState({ loading: false });
        });
    }, 600);
  };

  render() {
    return (
      <div className="main">
        {this.state.loading ? (
          <div className="loading">
            <PropagateLoader color={'#da552f'} loading={this.state.loading} />
          </div>
        ) : (
          <div className="product-info">
            <h1>{this.state.product.title}</h1>
            <p>{this.state.product.description}</p>

            <p>
              URL: <a href={this.state.product.url}>{this.state.product.url} </a>
            </p>
          </div>
        )}
      </div>
    );
  }
}
