import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RepoTable from '../ui/RepoTable'

const Home = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const getLocalData = JSON.parse(localStorage.getItem('data')   || '[]');
        setData(getLocalData);
    }, []);


    return (
        <>
        <Container fluid={false}>
            <Row>
            <Col xs={12} className="d-flex justify-content-end">
            <Link className="btn btn-primary my-3" to="/add-github">Create</Link>
            </Col>

            <Col xs={12}>
                {
                    data && data.length ? 
                    <RepoTable data={data} />
                    : <>
                        <Alert variant="secondary">
                        No Repositories added yet ! <Link className="my-3" to="/add-github">Add repositories.</Link>
                        </Alert>
                    </>
                }
            </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home
