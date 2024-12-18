'use client'
import React, { useEffect, useState } from 'react';
import { Table as AntTable, Button } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

const onChange: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function Table({ columns, data, className }: any) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems] = useState(data.slice(0, itemsPerPage)); 
  const totalPages = data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1;

  
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage; 
    setPageItems(data.slice(startIndex, endIndex)); 
    if(currentPage > totalPages)
    setCurrentPage(1);
  }, [currentPage, data]); 

  return (
    <div className="border w-full border-1 rounded-xl overflow-hidden shadow-md">
      <AntTable
        className={`${className} `}
        columns={columns}
        dataSource={pageItems}
        pagination={false}
        virtual
        onChange={onChange}
      />
      <div className="bg-[#fafafa] flex justify-between p-3">
        <div className="text-sm">{`หน้าที่ ${currentPage} จาก ${totalPages}`}</div>
        <div className="flex gap-2">
          {currentPage > 1 && (
            <div className="text-sm">
              <Button onClick={() => setCurrentPage(prev => prev - 1)}>ก่อนหน้า</Button>
            </div>
          )}
          <div className="text-sm">
            <Button
              onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
