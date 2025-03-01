import React from 'react';
import { Typography } from '@material-tailwind/react';

interface TableHeaderCellProps {
  children: React.ReactNode;
  className?: string
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children, className }) => {
  return (
    <th className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${className || ''}`}>
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