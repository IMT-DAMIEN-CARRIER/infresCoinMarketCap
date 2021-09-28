import React, {useEffect, useState} from 'react';

import axios from 'axios';


function InfosCoin() {
  const [list, setInfos] = useState([]);

  useEffect(() => {
      refreshInfos();
  }, []);

  const refreshInfos = () => {
      var param = window.location.href.replace("http://localhost:3001","http://localhost:3000");
      axios.get(param)
          .then(results => {
            if (results.data) {
                setInfos(results.data);
            } else {
                setInfos([]);
            }
          })
          .catch(err => console.error(err));
  };

  return (
      <table>
          <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Rank</th>
              <th>Total market cap</th>
              <th>Total volume 24h</th>
              <th>Low price 24h</th>
              <th>High price 24h</th>
              <th>Delta 1h</th>
              <th>Delta 24h</th>
              <th>Delta 6d</th>
              <th>Delta 30d</th>
          </tr>
            <tr>
                <td>{(list) ? list?.nom : ''}</td>
                <td>{(list) ? list?.symbol : ''}</td>
                <td>{(list) ? list?.prix : ''}</td>
                <td>{(list) ? list?.rang : ''}</td>
                <td>{(list) ? list?.volume_marche : ''}</td>
                <td>{(list) ? list?.volume_marche_24h : ''}</td>
                <td>{(list) ? list?.prix_bas_24h : ''}</td>
                <td>{(list) ? list?.prix_haut_24h : ''}</td>
                <td>{(list) ? list?.delta_1h : ''}</td>
                <td>{(list) ? list?.delta_24h : ''}</td>
                <td>{(list) ? list?.delta_7d : ''}</td>
                <td>{(list) ? list?.delta_30d : ''}</td>
            </tr>
      </table>

  );
}

export default InfosCoin;