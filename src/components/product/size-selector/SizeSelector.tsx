import { Size } from "@/interfaces"
import clsx from "clsx"

interface Props{
  selectedSize?: Size,
  availableSize: Size[],

  onSizeChanged: (size: Size) => void
}
export const SizeSelector = ({selectedSize, availableSize, onSizeChanged}:Props) => {
  return (
    <div>
      {
        availableSize.map((size)=>(
          <button 
          key={size}
          onClick={() => onSizeChanged(size)} 
          className={
            clsx(
              "mx-2 hover:underline text-lg",
              {
                "underline": size === selectedSize
              }
            )
          }>
            {size}
          </button>
        ))
      }
    </div>
  )
}
