export function TextInput(id=null, labelText="Label", required=false) {

    const label = document.createElement("label")
    label.className = 'form__label'

    const wrapper = document.createElement("div")
    wrapper.className = 'form__label-wrapper'

    const span = document.createElement("span")
    span.className = 'form__label-span'
    span.textContent = labelText

    const spanRequired = document.createElement("span")
    spanRequired.className = 'form__label-span is-required'
    spanRequired.textContent = `*`

    const inputField = document.createElement("input")
    inputField.className = 'form__input'
    inputField.addEventListener("focus", ()=>{
        wrapper.classList.add('is-focused')
    })
    inputField.addEventListener("blur", ()=>{
        if (!inputField.value)
        wrapper.classList.remove('is-focused')
    })

    wrapper.append(span)
    if (required) wrapper.append(spanRequired)
    label.append(wrapper)
    label.append(inputField)

    if (id) wrapper.classList.add('is-focused')

    return [label, inputField]
}