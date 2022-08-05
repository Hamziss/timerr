// TODO: remplace localhost by the correct url

const getData = async(url, token) => {
    const res = await fetch(`http://localhost:3000/api/${url}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })

    const data = res.json()
    return data
}

export default getData