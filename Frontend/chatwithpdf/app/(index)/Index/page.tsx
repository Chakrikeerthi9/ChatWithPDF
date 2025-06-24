"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const HomePage = () => {
  const router = useRouter()
  return (
    <div className ="md:grid grid-cols-2">
        <div className="bg-home"></div>
        <div className="flex justify-center items-center bg-gradient-to-b from-sky-50 to-sky-75">
          <section className="p-6 w-full text-left">
            <div className="flex items-center gap-2">
              <Image src='/favicon.jpg' alt="logo" width={30} height={30} className="rounded-full" />
              <h1 className="text-2xl font-bold">ChatWithPDF</h1>
            </div>
            <p className="text-white/80 text-sm">
            "Study smarter by chatting with your textbooks and notes—just upload a PDF and start asking."
            </p>
            <div className="flex items-center gap-2">
              <Image src='/download_8080663.png' alt="logo" width={40} height={40} className="relative bottom-3" />
              <p className="text-white/80 text-sm">
                Upload a PDF.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image src='/ask.png' alt="logo" width={40} height={40} className="relative bottom-3" />
              <p className="text-white/80 text-sm">
                Ask a PDF.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image src='/und.png' alt="logo" width={40} height={40} className="relative bottom-3" />
              <p className="text-white/80 text-sm">
                Understand a PDF.
              </p>
            </div>
            <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => router.push('/sign-in')}
            >Get Started</button>
          </section>
        </div>
    </div>

  )
}

export default HomePage
