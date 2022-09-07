export const postData = async(url, post, token) => {
    // TODO: remplace hard coded url by env variable
    const res = await fetch(`/api/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}
export default postData