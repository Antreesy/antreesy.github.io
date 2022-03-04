export function TableHeader() {

  const tableHeader = document.createElement("thead");
  tableHeader.className = "table__head";
  const row = document.createElement("tr");
  row.className = `row table__row`;

  const headContent = [ 
    {name:"Id", content: `<span>ID</span>`, isSorted: true}, 
    {name:"Name", content: `<span>Фамилия Имя Отчество</span>`, isSorted: true}, 
    {name:"Create", content: `<span>Дата и время создания</span>`, isSorted: true}, 
    {name:"Change", content: `<span>Последние изменения</span>`, isSorted: true}, 
    {name:"Contacts", content: `<span>Контакты</span>`, isSorted: false}, 
    {name:"Actions", content: `<span>Действия</span>`, isSorted: false},
  ]

  const sortButtons = [];

  for (let i=0; i < headContent.length; i++) {
    const col = document.createElement("th");
    col.className = "table__head-col";

    const wrapper = document.createElement("div")
    wrapper.className = "table__head-col__wrapper"
    wrapper.innerHTML = headContent[i].content;

    if (headContent[i].isSorted) {
      const btnSort = document.createElement("button");
      btnSort.className = "btn table__sort";
      btnSort.setAttribute("data-set", headContent[i].name);
      sortButtons.push(btnSort);
      
      wrapper.append(btnSort);
    }
    col.append(wrapper);
    row.append(col);
  }

  tableHeader.append(row)

  return [tableHeader, sortButtons];
}