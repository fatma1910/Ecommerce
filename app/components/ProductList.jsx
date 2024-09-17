import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ productList, className,onProductClick = () => {} }) => {
  return (
    <div className={`grid gap-4 ${className}`}>
      {productList.length > 0 ? (
        productList.map((item) => (
          <div 
          onClick={() => onProductClick(item)}>
          <ProductItem key={item.id} product={item} /> 
          </div>
        ))
      ) : (
        <div>No products found</div> 
      )}
    </div>
  );
};

export default ProductList;
