import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const ExampleTable = () => {
  // Dữ liệu của bảng
  const data = useMemo(
    () => [
      { id: 1, name: 'John Doe', age: 28, occupation: 'Developer' },
      { id: 2, name: 'Jane Smith', age: 34, occupation: 'Designer' },
      { id: 3, name: 'Sam Green', age: 25, occupation: 'Product Manager' },
    ],
    []
  );

  // Cấu hình cột
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'age', header: 'Age' },
      { accessorKey: 'occupation', header: 'Occupation' },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default ExampleTable;
