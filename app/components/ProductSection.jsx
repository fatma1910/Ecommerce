'use client'

import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApis from '../utils/ProductApis'
import Category from './Category'

const ProductSection = () => {
  
  const [productList, setProductList] = useState([]) 
  const [filteredProducts, setFilteredProducts] = useState([]) 

  useEffect(()=>{
    getLatestProducts_();
  },[])

  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then(res=> {
      const products = res.data.data;
      setProductList(products);
      setFilteredProducts(products); 
    }) 
  }


  const handleCategorySelect = (category) => {
    if (category === 'all') {
      setFilteredProducts(productList); 
    } else {
      const filtered = productList.filter(product =>
        product.attributes.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered); 
    }
  }

  return (
    <div className='px-10 md:px-20 my-16'>
      <h2 className='flex items-center justify-center text-3xl font-semibold text-primary mb-14 uppercase'> Our Latest Products </h2>
      
      <div className='my-9 flex flex-col justify-center items-center '> 
        {/* <h2 className='mb-2'>Select Category</h2> */}
        <Category onCategorySelect={handleCategorySelect} />
      </div>
      
      <ProductList productList={filteredProducts} className={'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'} /> 
    </div>
  )
}

export default ProductSection;
