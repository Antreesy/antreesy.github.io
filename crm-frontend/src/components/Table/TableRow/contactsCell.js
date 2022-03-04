export function contactsCell(contacts) {

    const wrapper = document.createElement("div");
    wrapper.className = "btn-wrap btn-wrap-contacts";
    
    for (let contact of contacts) {
        const btn = document.createElement("button");
        btn.className = `btn btn-contact btn-contact-${contact.type}`;

        const tooltip = document.createElement("div");
        tooltip.className = `btn-contact__tooltip`;
        tooltip.textContent = contact.value;

        btn.append(tooltip)
        wrapper.append(btn)
    }
    
    return wrapper;
}