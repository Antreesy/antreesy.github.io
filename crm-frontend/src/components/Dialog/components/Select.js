export function Select() {

    const choises = [
        {id:0, name:'Телефон'},
        {id:1, name:'Доп. телефон'},
        {id:2, name:'Email'},
        {id:3, name:'Vk'},
        {id:4, name:'Facebook'},
    ]

    let selectedId = 0;

    const wrapper = document.createElement("div")
    wrapper.className="select__wrapper"

    const select = document.createElement("button")
    select.className="select__preview"

    const dropdown = document.createElement("ul")
    dropdown.className="select__dropdown"

    select.addEventListener("click", (e) => {
        e.preventDefault()
        dropdown.classList.add("is-open")
    })

    function drawSelect() {
        const selectedItem = choises.find(item => item.id === selectedId)
        select.textContent = `${selectedItem.name}`

        choises.map((choise) => {
            const item = document.createElement("li")
            item.className="select__item"
            const btn = document.createElement("button")
            btn.className="select__item-btn"
            btn.textContent = choise.name
            btn.addEventListener("click", (e)=>{
                selectedId = choise.id

                dropdown.classList.remove("is-open")
                dropdown.querySelectorAll(".select__item").forEach((el)=>{el.remove()})
                drawSelect()
            })
    
            item.append(btn)
            if (choise.id !== selectedId) dropdown.append(item)
        })
    }
   
    drawSelect()

    wrapper.append(select)
    wrapper.append(dropdown)

    return [wrapper, selectedId];
}