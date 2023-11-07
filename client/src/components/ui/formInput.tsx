import { InputHTMLAttributes } from "react"

type FormInputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({ label, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col mb-2">
      <label className="font-medium mb-2">{label}</label>
      <input
        className={`rounded-md p-2 text-sm text-black bg-slate-100 border-[2px] focus:border-red-300 focus:border-opacity-40 focus:outline-none`}
        {...props}
      />
    </div>
  )
}
