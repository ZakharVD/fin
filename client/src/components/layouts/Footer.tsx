import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 w-full h-[200px] sm:h-[170px] flex justify-center items-center text-white">
      <div className=" py-4 px-3 sm:px-10 w-full">
        <div className="flex flex-row items-center w-[150px] sm:w-[190px] justify-between mb-[20px]">
          <Link to={"/"} className="flex justify-center items-center">
            <span className="text-4xl font-logo font-semibold">
              Finlio<span className="text-[#ff6884]">.</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center border-t-[3px] border-gray-200">
          <p className="mt-[20px] sm:mt-[10px] text-sm sm:text-lg">
            Copyright 2023 | All rights reserved.
          </p>
          <div>
          <a href="https://github.com/ZakharVD/finlio" className="my-2 sm:my-0 text-sm sm:text-lg mr-5">GitHub</a>
          <Link
            to={"/privacy-policy"}
            className="my-2 sm:my-0 text-sm sm:text-lg"
          >
            Privacy Policy
          </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
