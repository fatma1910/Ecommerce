import Image from 'next/image'
import React from 'react'

const Banner = ({product}) => {
  return (
    <div>
      { product?.attributes?.banner?.data?.attributes?.url ?
        <Image 
        src={product?.attributes?.banner?.data?.attributes?.url} 
        width={400} 
        height={400} 
        alt='' 
        className='rounded-lg '
        /> :
        <div className='w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse'>

        </div>
        }
    </div>
    
  )
}

export default Banner