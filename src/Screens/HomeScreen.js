import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productAction";

function HomeScreen(props) {
  // hooks

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map(
        ({ name, image, brand, price, rating, numReviews, _id }) => {
          return (
            <li key={_id}>
              <div className="product">
                <Link to={"/product/" + _id}>
                  <img className="product-image" src={image} alt={name} />
                </Link>

                <div className="product-name">
                  <Link to={"/product/" + _id}>{name}</Link>
                </div>
                <div className="product-brand">Brand: {brand}</div>
                <div className="product-price">
                  <small>Price: </small>${price}
                </div>
                <div className="product-rating">
                  {rating} Stars {numReviews} (reviews)
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
}

export default HomeScreen;
