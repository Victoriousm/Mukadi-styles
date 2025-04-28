/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const placeorder = () => {
  const [method, setMethod] = useState('cod'); // Default to COD
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    province: '',
    nrc: '',
    phone: '',
    CardNumber: '', // Add fake card fields
    ExpiryDate: '',
    Cvv: '',
    mobileNumber: '', // Add airtel number
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount()+ delivery_fee, // Remove delivery_fee from here
      };

      let response = '';
      let cartAmount;
      switch (method) {
        case 'cod':
          orderData.amount = getCartAmount() + delivery_fee; // add delivery fee for cod
          response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        case 'visa':
          // Add fake card details to orderData
          orderData.amount = getCartAmount();
          orderData = {
            ...orderData,
            CardNumber: formData.CardNumber,
            ExpiryDate: formData.ExpiryDate,
            Cvv: formData.Cvv,
          };
          response = await axios.post(backendUrl + '/api/order/visa', orderData, { headers: { token } });
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success('Payment successful!');
          } else {
            toast.error(response.data.message);
          }
          break;
        case 'airtel':
          // Add airtel number to orderData
          cartAmount= getCartAmount();
          orderData.amount = cartAmount;
          console.log(`Print cart amount: ` +  orderData.amount)
          orderData = {
            ...orderData,
            mobileNumber: formData.mobileNumber,
          };
          response = await axios.post(backendUrl + '/api/order/airtel', orderData, { headers: { token } });
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success('Mobile Money Payment successful!');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {React.createElement('span', null)}
      {/* will be displayed on the left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street/house number" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="province" value={formData.province} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Province" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="nrc" value={formData.nrc} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Passport or NRC number" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />

        {method === 'visa' && (
          <div>
            <input required onChange={onChangeHandler} name="CardNumber" value={formData.CardNumber} className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-4" type="text" placeholder="Card Number" />
            <input required onChange={onChangeHandler} name="ExpiryDate" value={formData.ExpiryDate} className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-2" type="text" placeholder="Expiry Date (MM/YY)" />
            <input required onChange={onChangeHandler} name="Cvv" value={formData.Cvv} className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-2" type="text" placeholder=" CVV" />
          </div>
        )}

        {method === 'airtel' && (
          <div>
            <input required onChange={onChangeHandler} name="mobileNumber" value={formData.mobileNumber} className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-2" type="text" placeholder="Mobile Money Number" />
          </div>
        )}
      </div>
      {/* right side  */}
      <div className="mt-8">
        <div className="mt-8 min-w-8">
          <CartTotal />
          <div className="mt-12">
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            {/* payment method selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={() => setMethod('airtel')} className="flex items-center bg-red-500 gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'airtel' ? 'bg-green-600' : ''}`}></p>
                <img className="h-10 mx-4" src={assets.airtel} alt="" />
              </div>
              <div onClick={() => setMethod('visa')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'visa' ? 'bg-green-600' : ''} `}></p>
                <img className="h-10 mx-4" src={assets.visa_logo} alt="" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center  gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
                <p className="text-gray-600 text-sm font-small mx-4">CASH ON DELIVERY </p>
              </div>
            </div>
            <div className="w-full txt-end mt-8">
              <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default placeorder;