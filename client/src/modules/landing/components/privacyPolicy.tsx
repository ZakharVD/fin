import Footer from "../../../components/layouts/Footer";
import Navbar from "../../../components/layouts/Navbar";

export default function PrivacyPolicyPage() {
    return (
        <>
            <Navbar/>
            <section className="w-[90%] max-w-[1000px] mx-auto h-screen">
            <div className="m-6 text-left">
            <h3 className="text-2xl my-6 text-center">Privacy Policy</h3>
            <p className="font-semibold my-2">Information we collect:</p>
            <p className="my-2">When you create an account, we may collect your name, email address, and password.</p>
            <p className="font-semibold my-2">How We Use Your Information</p>
            <p className="my-2">To create and manage your account.</p>
            <p className="font-semibold my-2">Sharing Your Information</p>
            <p className="my-2">We do not sell or rent your personal information to third parties.</p>
            <p className="font-semibold my-2">Security</p>
            <p className="my-2">We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please be aware that no method of transmission over the internet or electronic storage is entirely secure.</p>
            <p className="font-semibold my-2">Your Choices</p>
            <p className="my-2">You have the right to access, correct, update, or delete your personal information. You can do this by logging into your account</p>
        </div>
        </section>
            <Footer/>
        </>
    )
}