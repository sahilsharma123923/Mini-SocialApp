import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"  
  
const LandingPage = () => {

    const navigate=useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-900"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <h1 className="text-6xl font-bold font-mono text-white">Social App</h1>
      <p className="text-muted-foreground mt-2 font-mono text-sm text-center">
        See what's happening. Join the conversation.
      </p>

      <div className="flex items-center gap-8 mt-12">
        <div className="flex items-center gap-3">
          <span className="text-white font-mono">New User?</span>
          <Button
           className="font-bold font-mono px-4 py-2 rounded-lg bg-neutral-100 text-black hover:bg-neutral-300"
           onClick={()=>navigate("/register")}
           >SignUp</Button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white font-mono">Already a User?</span>
          <Button 
          className="font-mono font-bold px-4 py-2 rounded-lg bg-neutral-100 text-black hover:bg-neutral-300"
          onClick={()=>navigate("/login")}
          >Login</Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage