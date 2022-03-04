import { Table } from "../Table/Table.js";
import { UserBtn } from './UserBtn.js';

export function Main() {
    const main = document.createElement("main");
    main.className="main";
    const container = document.createElement("div");
    container.className = "container main__container"

    const title = document.createElement("h1");
    title.className = "title main__title";
    title.textContent = "Клиенты";
    container.append(title);

    container.append(Table());

    const addUserBtn = UserBtn()
    container.append(addUserBtn);

    main.append(container);

    return main;
}