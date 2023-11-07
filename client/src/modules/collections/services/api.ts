export async function httpAddCollection(collectionName: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/collections`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            collectionName
        })
    })
    return res
}

export async function httpDeleteCollection(collectionId: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/collections/${collectionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return res
}