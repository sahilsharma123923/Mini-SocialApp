import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

const FloatingButton = () => {
  return (
  <Link to="/create">
    <Button  size="icon" className="text-white bg-blue-800 fixed bottom-8 right-8 h-12 w-12 rounded-full hover:bg-blue-700  hover:text-white shadow-lg">
      <Plus className="size-6"/>
    </Button>
  </Link>
  )
}

export default FloatingButton
