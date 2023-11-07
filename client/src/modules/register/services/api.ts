export async function httpRegisterUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
    const token = res.headers.get("Authorization")?.split(" ")[1]
    localStorage.setItem("token", token!)
    return res
  } catch (err) {
    console.log(err)
  }
}
