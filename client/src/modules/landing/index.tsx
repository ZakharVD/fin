import Navbar from "../../components/layouts/Navbar"
import Footer from "../../components/layouts/Footer"
import GetStartedBtn from "./components/getStartedBtn"
import illustration from "../../assets/landing-illustr.svg"
import dashboardImage from "../../assets/my-dashboard.png"

export default function LandingPage() {
  return (
    <>
      <main className="gradientBg">
        <Navbar />
        <section className="min-h-[90vh] flex flex-col justify-center items-center mb-8">
          <div className="flex flex-col justify-center text-center mt-3 max-w-[95%]">
            <h1 className="text-3xl sm:text-4xl mb-5">
              <span className="text-4xl sm:text-5xl font-semibold">Finlio</span>{" "}
              - your financial buddy.
            </h1>
            <h3 className="font-light mb-5 text-lg text-zinc-600">
              Gain a clear view of your spending habits and watch your savings
              grow.
              <br /> Budget, track, and save with ease.
            </h3>
            <div className="w-[200px] mx-auto hidden phone:flex">
              <GetStartedBtn />
            </div>
          </div>
          <div className="w-[95%] xl:w-[70%] h-auto mt-10">
            <img src={dashboardImage} alt="" className="rounded-lg shadow-md"/>
          </div>
          <div className="flex phone:hidden w-[95%] mt-10">
            <GetStartedBtn/>
          </div>
        </section>
        <section className="min-h-screen bg-white flex justify-center items-center">
          <div className="w-[90%] max-w-[1300px] mx-auto flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex justify-center items-center bg-white mb-5 lg:mb-0">
            <img
                src={illustration}
                alt=""
                className="w-[350px] h-[350px] md:w-[450px] md:h-[450px]"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center items-center">
              <p className="w-[90%] lg:w-[70%] mx-auto text-lg lg:text-xl mb-5">
                At Finlio, we're dedicated to your financial well-being. Our app
                is your partner in managing your money, whether you're an
                individual, a couple, or a family. Monitor your spending, set
                savings goals, and keep an eye on your income effortlessly. Get
                access to various tools and analytics - all build to to give you
                confidence in your financial decisions.{" "}
              </p>
              <div className="w-[100%] mx-auto phone:mx-0 phone:max-w-[200px]">
                <GetStartedBtn />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
