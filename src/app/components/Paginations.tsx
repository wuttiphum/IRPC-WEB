'use client';

import { useState } from "react";
import { Button } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";



interface PaginationsProps {
    className?: string;
    classNames?: {
        items?: string;
    },
    emptyTxt?: string | React.ReactNode;
    items: any[];
    pageSize?: number;
    renderItem: (item: any) => React.ReactNode;
}

export default function Paginations({ className, classNames, items, emptyTxt, pageSize = 10, renderItem }: PaginationsProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const pages = Math.ceil(items.length / pageSize)
    const totalPage = Array.from({ length: pages })
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={`grid gap-2 `}>
            <div className={`${classNames?.items}`}>
                {items?.length > 0 ? paginatedItems.map((item, index) => (
                    <div key={index}>
                        {renderItem(item)}
                    </div>
                )) :
                    <div className="flex min-h-[50vh] justify-center items-center w-full">{emptyTxt}</div>
                }
            </div>



            <div className="flex justify-between">
                <Button onClick={e => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)} color="default" variant="text"><ArrowLeft /> <div className="lg:block hidden">Previous</div></Button>
                <div className="flex gap-2">
                    {totalPage.map((_, index) => {
                        const isCurrentPage = index + 1 === currentPage;
                        const isFirstOrLastPage = index === currentPage - 1 || index === pages - 1 || index === currentPage || index === pages - 2;
                        const mid = Math.ceil(pages / 2)



                        if (isFirstOrLastPage) {
                            return (
                                <Button
                                    key={index}
                                    style={{
                                        color: isCurrentPage ? "var(--primary)" : "black",
                                        borderColor: isCurrentPage ? "var(--primary)" : ""
                                    }}
                                    onClick={() => onPageChange(index + 1)}
                                >
                                    {index + 1}
                                </Button>
                            );
                        } else if (index === mid) {

                            return <Button onClick={e => onPageChange(index + 1)} color="default" variant="text" key={index}>...</Button>;
                        } else {
                            if ( index == mid-2 && currentPage <= mid+1) {

                                return <Button onClick={e => onPageChange(index + 1)} color="default" variant="text" key={index}>...</Button>;
                            } else return null;
                        }
                    })}

                </div>
                <Button onClick={e => onPageChange(currentPage < pages ? currentPage + 1 : currentPage)} color="default" variant="text"><div className="hidden lg:block">Next</div> <ArrowRight /></Button>
            </div>
        </div>
    );
}
