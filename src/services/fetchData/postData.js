export const postData = async(url, post, token) => {

    const res = await fetch(`http://localhost:3000/api/${url}`, {
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