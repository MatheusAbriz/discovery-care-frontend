/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputHTMLAttributes } from "react";
import { type UseFormRegister } from "react-hook-form";

type InputProps = {
    register: UseFormRegister<any>
    name: string
    isRequired?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ name, register, isRequired, ...props }: InputProps) => {
    return (
        <input
            {...register(name, { required: isRequired ? 'Required field' : '' })}
            {...props}
            className="border border-gray-400 p-2 rounded-md w-full"
        />
    )
};