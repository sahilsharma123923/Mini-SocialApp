import { Button } from "./ui/button"

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
      <h1 className="text-6xl font-bold font-mono text-white">Social App</h1>
      <p className="text-muted-foreground mt-2 font-mono text-sm text-center">
        See what's happening. Join the conversation.
      </p>

     <div className="flex items-center gap-8 mt-8">
      <div className="flex items-center gap-3">
         <span className="text-white font-mono">New User?</span>
         <Button variant="ghost" className="font-bold font-mono px-4 py-2 rounded-lg">SignUp</Button>
       </div>
       <div className="flex items-center gap-3">
          <span className="text-white font-mono">Already a User?</span>
          <Button variant="ghost" className="font-mono font-bold px-4 py-2 rounded-lg">Login</Button>
        </div>
     </div>
   </div>
  )
}

export default LandingPage
