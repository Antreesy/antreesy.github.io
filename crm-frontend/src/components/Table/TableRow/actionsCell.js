import { deleteFromServer, getFromServer, patchToServer } from "../../Server.js";
import { DialogEdit } from "../../Dialog/DialogEdit.js";
import { DialogDelete } from "../../Dialog/DialogDelete.js";

export function actionsCell(id) {

    const modal = document.querySelector(".modal");
    const dialog = document.querySelector(".dialog");

    const wrapper = document.createElement("div");
    wrapper.className = "btn-wrap btn-wrap-actions";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn-edit";
    btnEdit.setAttribute("data-id", id);
    btnEdit.textContent = "Изменить";
    btnEdit.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialog.append(DialogEdit(id))
    })
    
    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-delete";
    btnDelete.setAttribute("data-id", id);
    btnDelete.textContent = "Удалить";
    btnDelete.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialog.append(DialogDelete(id))
    })
    
    wrapper.append(btnEdit, btnDelete)
    
    return [wrapper, btnEdit, btnDelete];
}