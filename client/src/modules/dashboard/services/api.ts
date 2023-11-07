export async function httpGetCollections() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/collections`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return res
}

export async function httpGetStatistics() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/statistics`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return res
}

export async function httpCreateGoal(name: string, amount: number, targetAmount: number) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/goals`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            name,
            amount,
            targetAmount
        })
    })
    return res
}

export async function httpGetGoal() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/goals`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    return res
}

export async function httpAddToGoal(amountToAdd: number, goalId: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/goals/${goalId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            amountToAdd
        })
    })
    return res
}

export async function httpGetTotalCashFlow() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/statistics/cashflow`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    return res
}