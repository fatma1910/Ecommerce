import React from 'react'

const SkeletonInfo = () => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='w-[400px] h-[22px] bg-slate-200 animate-pulse'></div>
        <div className='w-[70px] h-[22px] bg-slate-200 animate-pulse'></div>
        <div className='w-[400px] h-[22px] bg-slate-200 animate-pulse'></div>
        <div className='w-[400px] h-[22px] bg-slate-200 animate-pulse'></div>
        <div className='w-[400px] h-[22px] bg-slate-200 animate-pulse'></div>
        <div className='w-[100px] h-[22px] bg-slate-200 animate-pulse'></div>
    </div>
  )
}

export default SkeletonInfo