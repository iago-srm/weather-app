import * as React from 'react';

export const useFetch = (url: string) => {
    const cache = React.useRef<string>(undefined);
    const [status, setStatus] = React.useState('idle');
    const [data, setData] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('fetching');
            if (cache) {
                const data = cache;
                // setData(data);
                setStatus('fetched');
            } else {
                const response = await fetch(url);
                const data = await response.json();
                // cache = data[0]; // set response in cache;
                setData(data);
                setStatus('fetched');
            }
        };

        fetchData();
    }, [url]);

    return { status, data };
};
