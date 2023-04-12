const request = async (url:URL): Promise<Object> => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

export {
    request,
}