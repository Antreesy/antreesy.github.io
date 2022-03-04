import {Select} from './Select.js'

export function SelectInput() {
    const wrapper = document.createElement("div")
    wrapper.className="select__item-wrapper"

    const [select, selectId] = Select()

    const input = document.createElement("input")
    input.className="form__input select__input"

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent="X"

    wrapper.append(select)
    wrapper.append(input)
    wrapper.append(deleteBtn)

    return wrapper
}