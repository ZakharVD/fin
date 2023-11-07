import ButtonSpinner from "./buttonLoading";

type ButtonProps = {
    text: string
    type?: "submit"
    isLoading: boolean
  };
  
  export default function Button({ text, type, isLoading }: ButtonProps) {
    return (
      <button
        className={`bg-black text-white rounded-md ${isLoading === true ? "py-3" : "py-4"} text-md mt-[15px] w-full hover:opacity-80`}
        type={type}
      >
        {isLoading === true ? <ButtonSpinner/> : text}
      </button>
    );
  }