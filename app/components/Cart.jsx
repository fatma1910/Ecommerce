

import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import Link from 'next/link'



function Cart() {
	const { cart, setcart ,isCartOpen, setIsCartOpen} = useContext(CartContext)

	return (


		<div className='h-[300px] w-[250px]
    bg-gray-100 z-10 rounded-md border shadow-sm
    absolute mx-10 right-1 top-9 p-5 overflow-auto'>
			<div className="mt-4 space-y-6">
				<ul className="space-y-4">
					{cart?.map((item) => (
						<li key={item?.id} className="flex items-center gap-4">
							<img
								src={item?.product?.attributes?.banner?.data?.attributes?.url}
								alt=""
								className="object-cover w-16 h-16 rounded"
							/>

							<div>
								<h3 className="text-sm text-gray-900 line-clamp-1">{item?.product?.attributes?.title}</h3>

								<dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
									<div>
										<dt className="inline">Category:</dt>
										<dd className="inline">{item?.product?.attributes?.category}</dd>
									</div>

									<div>
										<dt className="inline">Price:</dt>
										<dd className="inline">{item?.product?.attributes?.price}</dd>
									</div>
								</dl>
							</div>
						</li>
					))}



				</ul>
			</div>
			<div className="mt-5 space-y-4 text-center">

				
				<Link
					href="/cart"
					className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
					onClick={() => setIsCartOpen(!isCartOpen)}
				>
					View my cart ({cart?.length})
				</Link>

				<button
					
					className="inline-block text-sm text-gray-500 underline transition underline-offset-4 hover:text-gray-600"
					onClick={() => setIsCartOpen(!isCartOpen)}
				>
					Continue shopping
				</button>
			</div>
		</div>
	)
}

export default Cart