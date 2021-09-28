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
          </tr>

          {list.map(element => (
            <tr>
                <td>{(element) ? element?.rank : ''}</td>
                <td>{(element) ? element?.name : ''}</td>
                <td>{(element) ? element?.price : ''}</td>
            </tr>
          ))}
      </table>

  );
}

export default List;
