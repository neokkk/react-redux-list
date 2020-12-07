import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Search, Table } from '../components';
import { getInfoList } from '../store';
import { request } from '../api';

const headerInfoList = [
    {
        key: 'name',
        name: 'Name',
        type: 'text',
        options: {
            required: true,
            pattern: '',
            setValueAs: value => value && `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}` // camelcase
        }
    },
    {
        key: 'alpha2Code',
        name: 'Alpha-2',
        type: 'text',
        options: {
            required: true,
            pattern: /^[a-zA-Z_]{2}$/,
            maxLength: 2,
            validate: async value => {
                const { data } = await request();
                return !data.some(val => val.alpha2Code === value);
            },
            setValueAs: value => value && value.toUpperCase()
        }
    },
    {
        key: 'callingCodes',
        name: 'Calling Codes',
        type: 'number',
        options: {
            saveValueAs: value => value + ''
        }
    },
    {
        key: 'capital',
        name: 'Capital',
        type: 'text',
        options: {
            pattern: /^[a-zA-Z_]*$/,
            setValueAs: value => value && `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`
        }
    },
    {
        key: 'region',
        name: 'Region',
        type: 'text',
        options: {
            pattern: /^[a-zA-Z_]*$/,
            setValueAs: value => value && `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`
        }
    }
];

export default function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfoList());
    }, [dispatch]);

    return (
        <div className="App">
            <section>
                <Form input={headerInfoList} />
                <Search />
            </section>

            <Table header={headerInfoList.map(info => ({
                key: info.key,
                name: info.name,
            }))} />
        </div>
    );
}