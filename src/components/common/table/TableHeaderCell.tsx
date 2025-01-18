import React from 'react';
import { Typography } from '@material-tailwind/react';

interface TableHeaderCellProps {
  children: React.ReactNode;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children }) => {
  return (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal leading-none opacity-70"
      >
        {children}
      </Typography>
    </th>
  );
};

export default TableHeaderCell;