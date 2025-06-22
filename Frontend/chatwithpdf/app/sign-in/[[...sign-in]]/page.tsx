import { SignIn as ClerkSignIn } from "@clerk/nextjs"

const SignUp = () => {
  return (
    <div className ="md:grid grid-cols-2 gap-6">
        <div className="bg-home"></div>
        <div className="flex justify-center items-center">
          <section className="p-6 w-full text-center">
            <h1 className="text-2xl font-semibold mb-4 font-sans">Sign In to ChatWithPDF</h1>
            <div className="flex justify-center items-center">
                <ClerkSignIn />
            </div>
          </section>
        </div>
    </div>
  )
}

export default SignUp


