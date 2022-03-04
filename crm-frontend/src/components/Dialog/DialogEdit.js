import { getFromServer, patchToServer, postToServer } from "../Server.js"
import { TextInput } from "./components/TextInput.js";
import { SelectInput } from "./components/SelectInput.js";

export function DialogEdit(id = null) {
    const modal = document.querySelector(".modal");
    const dialog = document.querySelector(".dialog");
    dialog.classList.add('dialog-edit-window')

    const dialogEdit = document.createElement("div")
    dialogEdit.className = 'dialog-wrapper'

    const dialogCaption = document.createElement("h4")
    dialogCaption.className = 'dialog-caption'
    dialogCaption.textContent = (id) ? "Изменить клиента" : "Новый клиент"

    const dialogForm = document.createElement("form")
    dialogForm.className = 'dialog__form'

    const dialogWrapper = document.createElement("div")
    dialogWrapper.className = 'dialog__select-wrapper'

    const confirmBtn = document.createElement("button")
    confirmBtn.className = 'dialog-confirm-button'
    confirmBtn.textContent = (id) ? "Изменить" : "Сохранить"
    confirmBtn.addEventListener("click", () => {
        modal.classList.toggle("is-active");
        const userInfo = {
            name: inputName.value || 'Фамилия',
            surname: inputSurname.value || 'Имя',
            lastName: inputLastName.value || 'Отчество',
            contacts: [
                {type:"phone",value:"+71234567890"},
                {type:"email",value:"abc@xyz.com"},
                {type:"facebook",value:"https://facebook.com/vasiliy-pupkin-the-best"},
                {type:"other",value:"aсc@xyz.com"},
                {type:"vkontakte",value:"https://vk.com/shishkin"}
            ]
        }
        if (id) patchToServer(id, userInfo); else postToServer(userInfo);
    })

    const cancelBtn = document.createElement("button")
    cancelBtn.className = 'dialog-cancel-button'
    cancelBtn.textContent = "Отмена"
    cancelBtn.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialogEdit.remove()
    })

    const exitBtn = document.createElement("button")
    exitBtn.className = 'dialog-exit-button'
    exitBtn.addEventListener("click", () => {
        modal.classList.toggle("is-active")
        dialogEdit.remove()
    })

    const [labelSurname, inputSurname] = TextInput(id, "Фамилия", true)
    const [labelName, inputName] = TextInput(id, "Имя", true)
    const [labelLastName, inputLastName] = TextInput(id, "Отчество")
    const selectElem = SelectInput() 

    const getData = async() => {
        const data = (id) ? await getFromServer(id) : typeof id

        inputSurname.value = (id) ? data.surname : ''
        inputName.value = (id) ? data.name : ''
        inputLastName.value = (id) ? data.lastName : ''
    } 
    getData()

    dialogEdit.append(dialogCaption)

    dialogForm.append(labelSurname)
    dialogForm.append(labelName)
    dialogForm.append(labelLastName)
    dialogForm.append(dialogWrapper)
    dialogWrapper.append(selectElem)

    dialogForm.append(confirmBtn)
    dialogEdit.append(dialogForm)
    dialogEdit.append(cancelBtn)
    dialogEdit.append(exitBtn)

    return dialogEdit;
}


