import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from '../../hooks';
import { saveSearch } from '../../store';
import './index.scss';

export default function Search() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const debValue = useDebounce(inputValue, 1000);

    useEffect(() => {
        dispatch(saveSearch(debValue));
    }, [debValue])

    return (
        <div className="Search">
            <input className="Search_input" type="search" value={inputValue} onChange={event => setInputValue(event.target.value)} />
            <span className="Search_icon">
                <SearchIcon />
            </span>
        </div>
    );
}