'use client'

import clsx from 'clsx'

interface ButtonProps {
    type?: 'button' |'submit' |'reset' | undefined
    fullwidth?: boolean;
    children: React.ReactNode;
    onclick?: () => void;
    secondary?: boolean;
    disabled?: boolean;
    danger?: boolean;
}

const Button = ({type, fullwidth, children, onclick, secondary, disabled, danger}: ButtonProps) => {
  return (
    <button
        onClick={onclick}
        disabled={disabled}
        type={type}
        className={clsx('flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            disabled && 'opacity-50 cursor-default',
            fullwidth && 'w-full',
            secondary? 'text-gray-900' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
        )}
     >
        {children}
    </button>
  )
}

export default Button