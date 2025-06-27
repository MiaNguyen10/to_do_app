import { getToDos, type ToDo } from '@/api/todo.api';
import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';


export type TableTodoProps = ToDo
const columnHelper = createColumnHelper<TableTodoProps>()

const columns = [
    columnHelper.accessor('title', {
        id: 'title',
        header: () => 'Title',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('due_date', {
        id: 'due_date',
        header: () => 'Due Date',
        cell: info => {
            const date = info.getValue();
            if (!date) return 'No due date';
            return new Date(date).toLocaleDateString();
        },
    }),
    columnHelper.accessor('status', {
        id: 'status',
        header: () => 'Status',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('priority', {
        id: 'priority',
        header: () => 'Priority',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('id', {
        id: 'action',
        header: () => 'Action',
        cell: info => (
            <button 
                className="text-blue-600 hover:text-blue-900"
                onClick={() => console.log('View todo:', info.getValue())}
            >
                View
            </button>
        ),
    })
]

const TableTodo = () => {
    const user_id = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}').id : null;
    
    const {isPending, error, data} = useQuery({
        queryKey: ['todos', user_id],
        queryFn: async ({ queryKey }) => {
            const [, user_id] = queryKey;
            if (!user_id) return [];
            return await getToDos(user_id);
        }
    })
    
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    })

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td 
                                    colSpan={columns.length} 
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No todos found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableTodo