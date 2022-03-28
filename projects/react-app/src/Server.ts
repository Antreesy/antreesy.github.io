import { IDataGetDto, IDataPostDto } from "./Interfaces/IContactsDto";

class Server {
  public authAddress = `https://my-json-server.typicode.com/antreesy/db/auth/`

  public dataAddress = `https://my-json-server.typicode.com/antreesy/db/data/`

  public isUserAuthorized = async(username: string, password: string) => {
    const address = this.authAddress + ('?login=' + username || '');

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();

    return (data[0].password === password);
  }

  public async getFromServer(search?: string): Promise<IDataGetDto[]> {
    const searchRequest = (search) ? `?q=${search}`: '';
    const address = this.dataAddress + searchRequest;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();

    return data;
  }

  public async getFromServerById(id: string): Promise<IDataGetDto> {
    const address = this.dataAddress + (id || '');

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();

    return data;
  }

  public deleteFromServer(id: string) {
    const address = this.dataAddress + id;
  
    fetch(address, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });
  }

  public postToServer(id: string, userInfo: IDataPostDto) {
    const address = this.dataAddress;
  
    fetch(address, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id:id, ...userInfo})
    });
  }

  public patchToServer(id: string, userInfo: IDataPostDto) {
    const address = this.dataAddress + id;
  
    fetch(address, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userInfo)
    });
  }
}

export default new Server();