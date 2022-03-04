import { DialogWindow } from "./DialogWindow.js";

export function Dialog() {
    const modalWindow = document.createElement("div")
    modalWindow.className = 'modal'

    const dialogWindow = DialogWindow();
    modalWindow.append(dialogWindow)

    return modalWindow;
}