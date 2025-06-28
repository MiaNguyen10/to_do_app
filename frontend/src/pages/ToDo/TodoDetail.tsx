import { getToDoById } from "@/api/todo.api";
import UserNav from "@/components/NavComponent/UserNav";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

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
            Here&apos;s details of your task !
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
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
        Go Back to To Do List
      </Button>
    </div>
  );
};

export default TodoDetail;
