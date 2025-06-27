import TableTodo from "@/components/ui/TableTodo"
import { User } from 'lucide-react'

const ToDos = () => {
  return (
    <div className="container mx-auto p-4">
      <button
        className="flex float-right items-center rounded-full p-3 hover:bg-gray-100 focus:outline-none"
        aria-label="Open profile"
        type="button"
        onClick={() => {
          // TODO: Open profile modal or navigate to profile page
        }}
      >
        <User className="w-6 h-6 text-gray-500" />
      </button>
      <h1 className="text-2xl font-bold my-4">Welcome back!</h1>
      <p className="text-gray-600 mb-4">Here's a list of your tasks</p>

      <TableTodo />
    </div>
  )
}

export default ToDos