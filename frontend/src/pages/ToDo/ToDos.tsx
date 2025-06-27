import TableTodo from "@/components/TableTodo";
import { User } from "lucide-react";

const ToDos = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 container mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground mt-2">
            Here&apos;s a list of your tasks !
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
      <TableTodo />
    </div>
  );
};

export default ToDos;
