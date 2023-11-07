export async function httpUpdateProfile(firstName: string, lastName: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/settings/profile`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    }
  )
  return res
}

export async function httpUpdateEmail(email: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/settings/email`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  )
  return res
}

export async function httpDeleteAccount() {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/settings/user`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  return res
}

export async function httpUploadFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/settings/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }
  )
  return res
}

export async function httpDeleteFile() {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/settings/upload`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  return res
}
