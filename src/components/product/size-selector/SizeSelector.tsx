import { Size } from '@/interfaces/product.interface';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import React from 'react'

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];
    onSizeChanged: (size:Size) => void;
}

export const SizeSelector = ({selectedSize, availableSizes, onSizeChanged}:Props) => {
    
  return (
    <div className='my-5 '>
        <h3 className='font-bold mb-4'>Tallas disponibles</h3>

        <div className='flex'>
            {
                availableSizes.map(size => (
                    <button 
                    onClick={()=> onSizeChanged(size)}
                    className={
                        clsx(
                            "mx-2 hover:underline text-lg ",
                            {
                                "underline text-blue-700": size === selectedSize
                            }
                        )
                    } key={size}>
                        {size}
                    </button>
                ))
            }
        </div>
    </div>
  )
}
