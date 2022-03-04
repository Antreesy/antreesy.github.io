import { contactsCell } from "./contactsCell.js";
import { actionsCell } from "./actionsCell.js";

export function TableRow(data) {

    const row = document.createElement("tr");
    row.className = `row table__row`;
  
    const createdDate = new Date(data.createdAt).toLocaleDateString('ru-RU', {day: '2-digit', month:'2-digit', year:'numeric'})
    const createdTime = new Date(data.createdAt).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})

    const updatedDate = new Date(data.updatedAt).toLocaleDateString('ru-RU', {day: '2-digit', month:'2-digit', year:'numeric'})
    const updatedTime = new Date(data.updatedAt).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})

    const [actionBtns, btnEdit, btnDelete] = actionsCell(data.id)

    const bodyContent = [ 
      {name:"Id", content: `<span>${data.id}</span>`}, 
      {name:"Name", content: `<span>${data.surname} ${data.name} ${data.lastName}</span>`}, 
      {name:"Create", content: `<span class="text-date">${createdDate}</span>  <span class="text-time">${createdTime}</span>`}, 
      {name:"Change", content: `<span class="text-date">${updatedDate}</span>  <span class="text-time">${updatedTime}</span>`}, 
      {name:"Contacts", content: contactsCell(data.contacts)}, 
      {name:"Actions", content: actionBtns},
    ]

    for (let i=0; i < bodyContent.length; i++) {
      const col = document.createElement("td");
      col.className = `table__col table__col_${bodyContent[i].name}`;
      if (typeof bodyContent[i].content === "object") {
        col.append(bodyContent[i].content)
      } else {col.innerHTML = bodyContent[i].content}

      row.append(col);
    }
  
    return [row, btnEdit, btnDelete];
  }