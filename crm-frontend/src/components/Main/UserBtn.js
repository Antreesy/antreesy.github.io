import { postToServer } from "../Server.js";
import { DialogEdit } from "../Dialog/DialogEdit.js";

export function UserBtn() {
    const modal = document.querySelector(".modal");
    const dialog = document.querySelector(".dialog");

    const wrapper = document.createElement("div");
    wrapper.className = "btn-wrap btn-wrap-add-user";

    const btn = document.createElement("button");
    btn.className = "btn btn-add";
    btn.textContent = "Добавить клиента";
    btn.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialog.append(DialogEdit())
    })
    
    wrapper.append(btn)
    
    return wrapper;
}