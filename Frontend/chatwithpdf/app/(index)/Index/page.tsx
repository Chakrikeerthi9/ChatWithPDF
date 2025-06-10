"use client"
import { useRouter } from "next/navigation"

const HomePage = () => {
  const router = useRouter()
  return (
    <div className ="grid grid-cols-2 gap-6">
        <div className="bg-home"></div>
        <div className="flex justify-center items-center">
          <section className="p-6 w-full text-center">
            <h1 className="text-2xl font-bold mb-4">ChatWithPDF</h1>
            <p className="text-white/80 text-sm">
            "Upload a PDF. Ask a question. Get answers like magic.
            ChatWithPDF is your smart AI reading assistant."
            </p>
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
