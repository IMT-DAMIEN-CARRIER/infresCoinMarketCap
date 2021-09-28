import React, {useEffect, useState} from 'react';

import axios from 'axios';


function List() {
    const [list, setList] = useState([]);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        axios.get('http://localhost:3000/')
            .then(results => {
                if (results.data) {
                    setList(results.data);
                } else {
                    setList([]);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <table>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Price</th>
                <th>Delta (24h)</th>
                <th></th>
            </tr>

            {list.map(element => (
                <tr>
                    <td>{(element) ? element?.rank : ''}</td>
                    <td>{(element) ? element?.name : ''}</td>
                    <td>{(element) ? '$' + element?.price : ''}</td>
                    <td>{(element) ? element?.delta_24h + '%' : ''}</td>
                    <td><a href={'http://localhost:3001/coin?symbol=' + element.symbol}>
                        More
                    </a></td>
                </tr>
            ))}
        </table>

    );
}

export default List;
