import React from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RepoTable = ({ data}: any) => {
    return (
        <>
        {
            data.length ? 
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Repository</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((res: any, index: number) => [
                            <tr>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/repository/${res.details.id}`}>{res.title}</Link>
                            </td>
                            <td>
                                <a href={`${res.details.clone_url}`} target="_blank" >{res.details.name}</a>
                            </td>
                            </tr>
                        ])
                    }
                    
                </tbody>
            </Table>
            : null
        }
            
        </>
    )
}

export default RepoTable
