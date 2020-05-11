import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

const Callback = (props) => {
    const [responseUrl, setResponseUrl] = useState();
    const [error, setError] = useState();

    const params = props.location.search.replace('?code=', '')
    useEffect(() => {
        axios({
            method: 'POST',
            url: '/callback',
            data: {
                code: params
              },
        })
        .then(resUrl => setResponseUrl(resUrl.data))
        .catch((err) => console.log(err));
    })
    if (responseUrl) {
        return <Redirect to="/main" />;
      } else if (error) {
        return <Redirect to="/#error" />;
      } else {
        return <h1>Loading</h1>;
      }
}

export default Callback