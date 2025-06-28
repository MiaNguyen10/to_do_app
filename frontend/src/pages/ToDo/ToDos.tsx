import UserNav from "@/components/NavComponent/UserNav";
import TableTodo from "@/components/TableComponent/TableTodo";

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
          <UserNav />
        </div>
      </div>
      <TableTodo />
    </div>
  );
};

export default ToDos;
