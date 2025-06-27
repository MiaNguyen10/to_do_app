import { getToDoById } from "@/api/todo.api";
import { useQuery } from "@tanstack/react-query";
import { User, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const TodoDetail = () => {
  const { task_id } = useParams<{ task_id: string }>();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["todoDetail", task_id],
    queryFn: async () => {
      if (!task_id) return null;
      return await getToDoById(Number(task_id));
    },
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading todo details</div>;
  }
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
      {/* Todo detail content goes here */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{data?.title}</h3>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Status:</span> {data?.status}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Priority:</span> {data?.priority}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Description:</span>{" "}
          {data?.description}
        </p>
        {data?.due_date && (
          <p className="text-gray-700">
            <span className="font-semibold">Due Date:</span>{" "}
            {new Date(data.due_date).toLocaleDateString()}
          </p>
        )}
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="size-8 float-right pr-20"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
        Back to to do list
      </Button>
    </div>
  );
};

export default TodoDetail;
