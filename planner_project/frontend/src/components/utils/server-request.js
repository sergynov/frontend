export const request = async (url,method,data) => {
  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json'
    },
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include'
  })
  

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || result.message || 'Request error');
  }
  
  return result
}