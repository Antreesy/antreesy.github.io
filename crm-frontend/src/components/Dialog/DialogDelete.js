import { deleteFromServer } from "../Server.js"

export function DialogDelete(id) {
    const modal = document.querySelector(".modal");
    const dialog = document.querySelector(".dialog");
    dialog.classList.add('dialog-delete-window')

    const dialogDelete = document.createElement("div")
    dialogDelete.className = 'dialog-wrapper'

    const dialogCaption = document.createElement("h4")
    dialogCaption.className = 'dialog-caption'
    dialogCaption.textContent = "Удалить клиента"

    const dialogText = document.createElement("p")
    dialogText.className = 'dialog-text'
    dialogText.textContent = "Вы действительно хотите удалить данного клиента?"

    const confirmBtn = document.createElement("button")
    confirmBtn.className = 'dialog-confirm-button'
    confirmBtn.textContent = "Удалить"
    confirmBtn.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        deleteFromServer(id)
    })

    const cancelBtn = document.createElement("button")
    cancelBtn.className = 'dialog-cancel-button'
    cancelBtn.textContent = "Отмена"
    cancelBtn.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialogDelete.remove()
    })

    const exitBtn = document.createElement("button")
    exitBtn.className = 'dialog-exit-button'
    exitBtn.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialogDelete.remove()
    })

    dialogDelete.append(dialogCaption)
    dialogDelete.append(dialogText)
    dialogDelete.append(confirmBtn)
    dialogDelete.append(cancelBtn)
    dialogDelete.append(exitBtn)

    return dialogDelete;
}


