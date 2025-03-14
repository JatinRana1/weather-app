import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { useGetSearchSuggestionsQuery } from '../service/weather';
import _ from 'lodash';

const SearchWeather = ({ setQuery }) => {
    const [search, setSearch] = useState({ q: '', days: '4' });
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const debouncedHandleQuery = useRef(_.debounce((q) => {
        setSearch(prev => ({ ...prev, q }));
    }, 700)).current;

    const { data } = useGetSearchSuggestionsQuery(search, { skip: !search.q });

    useEffect(() => {
        return () => debouncedHandleQuery.cancel();
    }, []);

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Enter Your City"
                    value={search.q} // Dual-binding the input
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(prev => ({ ...prev, q: value })); // Update input immediately
                        debouncedHandleQuery(value); // Debounced API search
                        setShowSuggestions(!!value); // Show suggestions if input is not empty
                    }}
                />
                {showSuggestions && data?.length > 0 && (
                    <Card className="mt-2">
                        <ListGroup>
                            {data.map((location) => (
                                <ListGroup.Item
                                    key={location.id}
                                    onClick={() => {
                                        setQuery({ ...search, q: location.name }); // Update query in parent
                                        setSearch(prev => ({ ...prev, q: '' })); // Reset input value
                                        setShowSuggestions(false);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {location.name}, {location.region}, {location.country}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                )}
            </Form.Group>
        </Form>
    );
};

export default SearchWeather;
