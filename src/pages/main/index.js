import React, { Component } from 'react';
import './styles.css';
import api from '../../services/API';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productInfo: {},
      page: 1,
      loading: false
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    this.setState({ loading: true });

    setTimeout(async () => {
      await api
        .get(`/products?page=${page}`)
        .then(res => {
          const { docs, ...productInfo } = res.data;
          this.setState({ products: docs, productInfo, loading: false });
        })
        .catch(e => {
          this.setState({ loading: false });
        });
    }, 600);
  };

  prevPage = () => {
    const { page, productInfo } = this.state;

    if (page === 1) {
      return;
    } else {
      const pageNumber = page - 1;
      this.loadProducts(pageNumber);
      this.setState({ page: pageNumber });
    }
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) {
      return;
    } else {
      const pageNumber = page + 1;
      this.loadProducts(pageNumber);
      this.setState({ page: pageNumber });
    }
  };

  render() {
    return (
      <div className="product-list">
        {this.state.loading ? (
          <div className="loading">
            <PropagateLoader color={'#da552f'} loading={this.state.loading} />
          </div>
        ) : (
          this.state.products.map((item, index) => {
            return (
              <article key={item._id}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>

                <Link to={`/product/${item._id}`}>Detalhes</Link>
              </article>
            );
          })
        )}
        <div className="actions">
          <button disabled={this.state.page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button
            disabled={this.state.page === this.state.productInfo.pages}
            onClick={this.nextPage}
          >
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
