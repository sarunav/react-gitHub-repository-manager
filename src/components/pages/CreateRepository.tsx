import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Tabs, Tab, Card, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios'

import Search from '../ui/Search';
import { Spinner } from '../ui/Spinner';
import RepoPagination from '../ui/Pagination'
import AddModal from '../ui/AddModal';


const CreateRepository = () => {
    const [query, setQuery] = useState<string>('');
    const [key, setKey] = useState<string>('user');

    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);

    const handleSearch = (q: any) => {
        console.log(q);
        q ? setQuery(q) : setQuery('');
    }

    const tabSwitchHandler = (key: any) => {
        setKey(key);
        setItems([]);
        setPage(1);
        setHasNextPage(false);
        setQuery('');
        setQuery('');
    }

    useEffect(() => {
        const fetchItems = async () => {
            let result;
            if(key === 'user') {
                setIsLoading(true);
                result = axios(`https://api.github.com/users/${query}/repos?per_page=20&page=${page}`);
                result.then(res => {
                    setItems(res.data);
                    setIsLoading(false);
                    res.data.length === 20 ? setHasNextPage(true) : setHasNextPage(false)
                  }).catch(err => {
                    setItems([]);
                    setIsLoading(false);
                  });
            } else {
                setIsLoading(true);
                result = axios(`https://api.github.com/search/repositories?q=${query}&per_page=20&page=1`); 
                result.then(res => {
                    setItems(res.data.items);
                    setIsLoading(false);
                    res.data.items.length === 20 ? setHasNextPage(true) : setHasNextPage(false)
                  }).catch(err => {
                    setItems([]);
                    setIsLoading(false);
                  });
            }
        }
    
        fetchItems()
      }, [query, page, key])
    
    return (
        <Container fluid={false}>
            <Row className="mt-3">
                <Col xs={12}>

                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => tabSwitchHandler(k)}
                    >
                    <Tab eventKey="user" title="Users">
                        <Col xs={6}>
                        <h2 className="my-3">Search GitHub Users</h2>
                            <Search type="user-search" getQuery={(q: any) => handleSearch(q)} />
                        </Col>

                        { isLoading ? <Spinner /> : 
                                <>
                                    {items.length ? 
                                    
                                    <><Card className="mt-4 mb-3" style={{ width: '100%' }}>
                                        <Card.Header>Results:-</Card.Header>
                                            <ListGroup variant="flush">
                                                {items.map((res: any) => [
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                        <h4>{res.name}</h4>
                                                        <AddModal type="user" data={res} />
                                                    </ListGroup.Item>
                                                ])}
                                            </ListGroup></Card>

                                            <RepoPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />

                                            </>
                                           : <>
                                           <Alert className="mt-4" variant="secondary">
                                                Search repositories with a valid username!
                                           </Alert>
                                       </>   
                                    }
                                     </>
                        }
                    </Tab>
                    <Tab eventKey="repository" title="Repository">
                    
                    <Col xs={6}>
                    <h2 className="my-3">Search GitHub Repository</h2>
                        <Search type="repository-search" getQuery={(q: any) => handleSearch(q)} />
                    </Col>

                    { isLoading ? <Spinner /> : 
                                <>
                                    {items.length ? 
                                    
                                    <><Card className="mt-4 mb-3" style={{ width: '100%' }}>
                                        <Card.Header>Results:-</Card.Header>
                                            <ListGroup variant="flush">
                                                {items.map((res: any) => [
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                        <h4>{res.name}</h4>
                                                        <AddModal type="user" data={res} />
                                                    </ListGroup.Item>
                                                ])}
                                            </ListGroup></Card>

                                            <RepoPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
                                            </>
                                           : <>
                                           <Alert className="mt-4" variant="secondary">
                                            Search repositories with a valid terms like Js, React etc.
                                           </Alert>
                                       </>  
                                    }
                                     </>
                        }

                    </Tab>
                </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateRepository
