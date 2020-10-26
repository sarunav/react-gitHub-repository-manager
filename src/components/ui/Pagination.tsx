import React from 'react'
import { Pagination } from 'react-bootstrap'

interface PaginationProps {
    page: number;
    setPage: any;
    hasNextPage: boolean;
}

export default function RepoPagination({ page, setPage, hasNextPage }: PaginationProps) {
    const adjustPage = (amount: number) => {
        setPage((prevPage: number) => {
            return prevPage + amount
        })
    }


    return (
        <Pagination className="mb-5">
            {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
            {page !== 1 && <Pagination.Item  onClick={() => setPage(1)}>1</Pagination.Item>}
            {page > 2 && <Pagination.Ellipsis />}
            {page > 2 && <Pagination.Item>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
            {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
        </Pagination>
    )
}
