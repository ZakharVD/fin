export async function httpLoginUser(email: string, password: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const token = res.headers.get('Authorization')?.split(" ")[1]
    localStorage.setItem("token", token!)
    return res
  } catch (err) {
    console.log(err)
  }
}
