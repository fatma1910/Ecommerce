'use client'
import Banner from './_components/Banner'
import ProductApis from '../../utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductInfo from './_components/ProductInfo'
import ProductList from '../../components/ProductList'
import { usePathname } from 'next/navigation'
import BreadCrumb from '../../components/BreadCrumb'

const ProductDetails = ({params}) => {


    const path = usePathname();

    const [product, setProduct] = useState({});
    const [productList, setProductList] = useState([])

    useEffect(()=>{

        getProductById_();
        


      },[params?.productId]);


    const getProductById_=() => {

        ProductApis.getProductById(params?.productId).then( res =>{

            console.log('product item' , res.data.data)
            setProduct(res.data.data);

            getProductByCategory(res.data.data);

        }) 
    }

    const getProductByCategory = (product_)=>{
      ProductApis.getProductByCategory(product_?.attributes.category).then( res =>{
      
        console.log( res.data.data)
        setProductList(res.data.data);

    })
    }
  return (
    <div className='px-10 md:py-8 md:px-28 '>
        <BreadCrumb path={path} />
        

        <div className='flex flex-col gap-24 mt-10 lg:items-center lg:flex-row'> 
          <Banner product={product}/>
          <ProductInfo product={product}/>
        </div>
        <div>
          <h2 className='mt-24 text-xl mb-10'>Similar Products</h2>
          <ProductList productList={productList} className={'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'} />
        </div>
    </div>
  )
}

export default ProductDetails