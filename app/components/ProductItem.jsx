import React from 'react'
import Image from 'next/image'
import { List } from 'lucide-react';
import Link from 'next/link';


const ProductItem = ({product}) => {
  return (
    <div className='ml-4 mb-4 p-1 hover:border hover:shadow-md rounded-lg  cursor-pointer' >
    <Link href={`/Product-details/${product?.id}`}  >
        <Image src={product?.attributes?.banner?.data?.attributes?.url} 
        width={400} 
        height={400} 
        alt=''
        className='rounded-t-lg object-cover h-[170px]'
        />
        <div className='flex items-center justify-between bg-gray-50 rounded-b-lg p-3'>
        <div >
          <h2 className='text-[14px] font-medium line-clamp-1'>
            {product?.attributes?.title}
          </h2>
          <h2 className='text-[12px] text-gray-400 flex gap-1 items-center capitalize'>
            <List className='w-4 h-4' />  
            {product?.attributes?.category} 
          </h2>
        </div>
        <h2 >
          {product?.attributes?.price}
        </h2>
        </div>
    </Link>
    </div>
  )
}

export default ProductItem