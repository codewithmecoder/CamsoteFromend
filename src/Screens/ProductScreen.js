import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productAction";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  console.log(productDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));

    return () => {};
    // eslint-disable-next-line
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt={product.name}></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h2>{product.name}</h2>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews)
              </li>
              <li>
                Price: <small>$</small>
                <b>{product.price}</b>
              </li>
              <li>
                Descripton:
                <div>{product.descripton}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>
                Price: <small>$</small>
                {product.price}
              </li>
              <li>
                Status: {product.countStok > 0 ? "In Stok " : "Unavailable"}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countStok).keys()].map((x) => {
                    return (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                {product.countStok > 0 && (
                  <button className="button primary" onClick={handleAddToCart}>
                    Add To Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
