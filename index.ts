import axios from 'axios';


const spotMetadata = axios.post('https://api.hyperliquid.xyz/info', {type : 'spotMeta'});

spotMetadata.then((res) => {
    console.log(JSON.stringify(res.data));
}).catch((err) => {
    console.log(err);
});


