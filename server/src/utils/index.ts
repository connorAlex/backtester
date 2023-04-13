const request = async (url:URL): Promise<aggregateResponse> => {
    const res = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    
    const data: aggregateResponse = await res.json();

    return data;
}

export {
    request,
}