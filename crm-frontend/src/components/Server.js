const defaultAddress = `http://localhost:3000/api/clients/`

export async function getFromServer(id) {
    const address = defaultAddress + (id || '');

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();

    console.log('server working, status:', response.status)
    return data;
}

export async function deleteFromServer(id) {
  const address = defaultAddress + id;

  fetch(address, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  });
}

export async function postToServer(userInfo) {
  const address = defaultAddress;

  fetch(address, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userInfo)
  });
}

export async function patchToServer(id, userInfo) {
  const address = defaultAddress + id;

  fetch(address, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userInfo)
  });
}