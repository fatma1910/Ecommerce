import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useUser } from '@clerk/nextjs';
import CartApis from '../../utils/CartApis';
import OrderApis from '../../utils/OrderApis';

const CheckoutForm = ({ amount }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false); 
  const [errormessage, setErrorMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true); 

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    // Create New Order
    createOrder();

    // Send an Email
    sendEmail();

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const res = await fetch('api/create-intent', {
        method: 'POST',
        body: JSON.stringify({
          amount: amount,
        }),
      });
      const clientSecret = await res.json();

      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/payment-confirm',
        },
      });

      if (result.error) {
        handleError(result.error);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false); 
    }
  };

  const createOrder = () => {
    let productIds = [];
    cart.forEach((el) => {
      productIds.push(el?.product?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds,
      },
    };
    OrderApis.createOrder(data).then((res) => {
      if (res) {
        cart.forEach((el) => {
          CartApis.deleteCartItem(el?.id).then((result) => {});
        });
      }
    });
  };

  const sendEmail = async () => {
    await fetch('api/send-email', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        email: user.primaryEmailAddress.emailAddress,
        fullName: user.fullName,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-center mt-12' >
      <div className=' flex flex-col justify-center items-center  '>
        <PaymentElement />
        <button
          className={`w-full p-2 mt-4 text-white rounded-md bg-primary ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          type="submit"
          disabled={loading} 
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
