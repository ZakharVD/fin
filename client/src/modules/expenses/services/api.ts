export async function httpGetExpenses(collectionId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/expenses/collection/${collectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  return res
}

export async function httpGetCollectionInfo(collectionId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/collections/${collectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  return res
}

export async function httpAddExpense(
  collectionId: string,
  amount: number,
  description: string,
  label: string,
  day: string
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/expenses/collection/${collectionId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description,
        label,
        day,
      }),
    }
  )
  return res
}

export async function httpGetTotalIncome(collectionId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/income/collection/${collectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  )
  return res
}

export async function httpAddIncome(collectionId: string, amount: number) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/incomes/collections/${collectionId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount
    })
  })
  return res
}

export async function httpUpdateIncome(incomeId: string, amount: number) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/incomes/${incomeId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount
    })
  })
  return res
}

export async function httpGetExpense(expenseId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/expenses/expense/${expenseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
  return res
}

export async function httpDeleteExpense(expenseId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/expenses/expense/${expenseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
  return res
}

export async function httpUpdateExpense(day: string, amount: number, description: string, label: string, expenseId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/expenses/expense/${expenseId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }, 
    body: JSON.stringify({
      day,
      amount,
      description,
      label
    })
  })
  return res
}

