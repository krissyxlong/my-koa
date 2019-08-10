const fetch = require('node-fetch');

module.exports = async(url, options={}) => {
    try {
        let res = await fetch(url, {
            ...options,
            timeout: 60000
        })
        res = await res.text();
        return res
    } catch(e) {
        console.error('fetch err::', e);
        throw new Error(e);
    }
}
