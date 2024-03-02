import React from 'react';
import { SiNamecheap } from "react-icons/si";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";



export default function Form() {
  return (
    <div className='border bg-black p-4'>
      <div>
        <img src="/avatar.webp" alt="" className='w-14 rounded-full mx-auto' />
        </div>
      <div className=''>

        <div className='border flex bg-white text-slate-600'>
          <SiNamecheap className='mt-[0.3rem]' />
          <input type="text" className='bg-white text-center w-[20rem]' placeholder='NAME' />


        </div>
        <div className='border flex bg-white text-slate-600'>
          <MdOutlineCurrencyExchange className='mt-[0.3rem]' />
          <input type="text" className='bg-white text-center w-[20rem]' placeholder='CURRENCY' />


        </div>
        <div className='border flex bg-white text-slate-600'>
          <FaAddressCard cheap className='mt-[0.3rem]' />
          <input type="text" className='bg-white text-center w-[20rem]' placeholder='PAYMENT METHOD' />


        </div>
        <div className='border flex bg-white text-slate-600'>
          <FaMoneyCheckAlt cheap className='mt-[0.3rem]' />
          <input type="text" className='bg-white text-center w-[20rem]' placeholder='AMOUNT' />


        </div>
        <div className='border flex bg-white text-slate-600'>
          {/* <FaAddressCard  cheap className='mt-[0.3rem]'/> */}
          <input type="text" className='bg-white text-center w-[20rem]' placeholder='DISCRIPTION' />


        </div>
      </div>
      <div >
        <button className='mx-auto'>SUBMIT</button>
      </div>
    </div>
  );
}
