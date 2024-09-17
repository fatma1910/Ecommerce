
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import SkeletonInfo from './SkeletonInfo'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import CartApis from '../../../utils/CartApis'
import { CartContext } from '../../../context/CartContext'


const ProductInfo = ({product}) => {
    const { user } = useUser();
    const router = useRouter();

    const { cart, setCart,setIsCartOpen } = useContext(CartContext)


    const handleAddToCart = () => {
		if (!user) {
			router.push('/sign-in')
		} else {

			const data = {
				data: {
					username: user.fullName,
					email: user.primaryEmailAddress.emailAddress,
					products: [product?.id]
				}
			}
			CartApis.addToCart(data).then(res => {
				console.log('cart created successfully', res.data.data)
				setCart(oldCart => [
					...oldCart,
					{
						id: res?.data?.data?.id,
						product
                    
					},
                    
                    
                    
				])
                
                setIsCartOpen(true);
			}).catch(error => {
				console.log('error', error)
			})
		}
	}
  return (
    <div className='flex-1'>
        { product?.attributes?.title ?

        <div>
            <h2 className='text-[20px]'>
                {product?.attributes?.title}
            </h2>
            <h2 className='text-[15px] text-green-400 capitalize'>
                {product?.attributes?.category}
            </h2>
            <h2 className='text-[15px] mt-5 '>
                {product?.attributes?.description[0]?.children[0].text}
            </h2>
            <h2 className='text-[15px] text-gray-500 mt-3 flex gap-2 items-center'>
                {product?.attributes?.instanceDelivery ? < BadgeCheck className='text-green-500'/> : <AlertOctagon/> }
                Eligible For Instant Delivery </h2>
            <h2 className='text-[32px] text-primary mt-3'>
            $ {product?.attributes?.price}
            </h2>
            <button 
            onClick={()=> handleAddToCart() }
            className='flex gap-2 rounded-lg bg-primary hover:bg-teal-600 p-4 mt-2 text-white font-semibold transition-all  ease-out duration-300 hover:'> < ShoppingCart/> Add To Cart </button> 
        </div> :

        <SkeletonInfo /> 
        }
    </div>
  )
}

export default ProductInfo

