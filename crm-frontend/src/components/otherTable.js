(()=>{
  document.addEventListener("DOMContentLoaded", ()=>{
    const students = [
      {name: "Иван", surname: "Иванов", midname: "Иванович", birthDate: new Date(1997, 0, 9), firstYear: 2014, faculty: "ИПР",},
      {name: "Владимир", surname: "Володин", midname: "Владимирович", birthDate: new Date(1995, 1, 8), firstYear: 2015, faculty: "ВФТИ",},
      {name: "Алексей", surname: "Алексеев", midname: "Алексеевич", birthDate: new Date(1995, 5, 4), firstYear: 2019, faculty: "ДИФВТ",},
      {name: "Сергей", surname: "Сергеев", midname: "Сергеевич", birthDate: new Date(1994, 2, 7), firstYear: 2016, faculty: "АИНК",},
      {name: "Николай", surname: "Николаев", midname: "Николаевич", birthDate: new Date(1993, 3, 6), firstYear: 2017, faculty: "ГИК",},
      {name: "Пётр", surname: "Петров", midname: "Петрович", birthDate: new Date(1998, 4, 5), firstYear: 2018, faculty: "БЭНИН",},
    ];

    function drawTable(array) {
      const container = document.querySelector(".table-container");
      // check if table exist
      if (container.querySelector(".table")) {
        container.querySelector(".table").remove();
      }

      // add table to the page
      const table = document.createElement("table");
      table.className = "table table-striped d";
      const tableBody = document.createElement("tbody");
      tableBody.className = "tbody";

      //add header and sort buttons
      // function drawHeader() {
      //   const tableHead = document.createElement("thead");
      //   tableHead.className = "thead";
      //   const headerRow = document.createElement("tr");

      //   const thName = document.createElement("th");
      //   thName.className = "col-3 col-Name";
      //   thName.textContent = "ФИО студента";
      //     const btnSortName = document.createElement("button");
      //     btnSortName.className = "btn btn-sm btn-light ms-1 btn-sort col-Name-sort";
      //     btnSortName.setAttribute("data-set", "Name");
      //     thName.append(btnSortName);

      //   const thFac = document.createElement("th");
      //   thFac.className = "col-3 col-Fac";
      //   thFac.textContent = "Факультет";
      //     const btnSortFac = document.createElement("button");
      //     btnSortFac.className = "btn btn-sm btn-light ms-1 btn-sort col-Fac-sort";
      //     btnSortFac.setAttribute("data-set", "Fac");
      //     thFac.append(btnSortFac);

      //   const thBirth = document.createElement("th");
      //   thBirth.className = "col-3 col-Birth";
      //   thBirth.textContent = "Дата рождения";
      //     const btnSortBirth = document.createElement("button");
      //     btnSortBirth.className = "btn btn-sm btn-light ms-1 btn-sort col-Birth-sort";
      //     btnSortBirth.setAttribute("data-set", "Birth");
      //     thBirth.append(btnSortBirth);

      //   const thYears = document.createElement("th");
      //   thYears.className = "col-3 col-Years";
      //   thYears.textContent = "Годы обучения";
      //     const btnSortYears = document.createElement("button");
      //     btnSortYears.className = "btn btn-sm btn-light ms-1 btn-sort col-Years-sort";
      //     btnSortYears.setAttribute("data-set", "Years");
      //     thYears.append(btnSortYears);

      //   headerRow.append(thName);
      //   headerRow.append(thFac);
      //   headerRow.append(thBirth);
      //   headerRow.append(thYears);
      //   tableHead.append(headerRow);
      //   table.append(tableHead);
      // }
      // drawHeader();

      //add row with one student's info
      function drawStudent(index) {
        const row = document.createElement("tr");

        const studName = document.createElement("td");
        studName.className = "col-3 col-Name";
        studName.textContent = `${array[index].surname} ${array[index].name} ${array[index].midname}`;
        row.append(studName);

        const studFac = document.createElement("td");
        studFac.className = "col-3 col-Fac";
        studFac.textContent = `${array[index].faculty}`;
        row.append(studFac);

        const studBirth = document.createElement("td");
        const birthday = `${array[index].birthDate.getDate()}.${array[index].birthDate.getMonth()+1}.${array[index].birthDate.getFullYear()}`;
        const age = Math.floor((Date.now()-array[index].birthDate)/1000/60/60/24/365);
        studBirth.className = "col-3 col-Birth";
        studBirth.textContent =  `${birthday} (${age} лет)`;
        row.append(studBirth);

        const studYears = document.createElement("td");
        const firstYear = array[index].firstYear;
        const currentYear = (new Date()).toISOString().substr(0,4);
        const currentMonth = (new Date()).toISOString().substr(5,2);
        const currentCourse = (currentYear > firstYear + 4 || (+currentYear === firstYear + 4 && +currentMonth > 8))
          ? "закончил"
          : `${currentYear-firstYear+1} курс`;
        studYears.className = "col-3 col-Years";
        studYears.textContent = `${firstYear}-${firstYear+4} (${currentCourse})`;
        row.append(studYears);

        tableBody.append(row);
      }
      for (let index in array) {
        drawStudent(index);
      }

      table.append(tableBody);
      container.append(table);

      // add sorting
      function sortBy(array, data) {
        let arraySorted = array.slice();
        arraySorted.sort((a,b) => {

          let astring;
          let bstring;
          switch (data) {
            case "Name":
              astring = `${a.surname} ${a.name} ${a.midname}`.toLowerCase();
              bstring = `${b.surname} ${b.name} ${b.midname}`.toLowerCase();
              break;
            case "Fac":
              astring = a.faculty.toLowerCase();
              bstring = b.faculty.toLowerCase();
              break;
            case "Birth":
              astring = a.birthDate;
              bstring = b.birthDate;
              break;
            case "Years":
              astring = a.firstYear;
              bstring = b.firstYear;
              break;
        }

          if (astring > bstring) return 1; else return -1;
        });
        array = (array.every((v,i)=>v === arraySorted[i])) ? arraySorted.reverse().slice() : arraySorted.slice();
        return array;
      }
      table.querySelectorAll(".btn-sort").forEach(btn => {
        let iconSort = document.createElement("i");
        iconSort.className = "bi-arrow-down-up";
        btn.append(iconSort);
        btn.addEventListener("click", btn => {
          const data = btn.currentTarget.getAttribute("data-set");
          array = sortBy(array, data);
          drawTable(array);
        });
      });
    }
    drawTable(students);

    // const inputForm =
    function drawForm() {
      const container = document.querySelector(".form-container");
      const form = document.createElement("form");
      form.className = "input-form input-group row offset-2 flex-wrap";
      form.setAttribute("method", "GET");

      const leftColumn = document.createElement("div");
      leftColumn.className = "col-8 row";
      const rightColumn = document.createElement("div");
      rightColumn.className = "col-8 row";

      const surnameLabel = document.createElement("label");
      surnameLabel.className = "col-4 form-label flex-column";
      surnameLabel.textContent = "Фамилия";
      const surnameInput = document.createElement("input");
      surnameInput.className = "form-control";
      surnameInput.setAttribute("required", true);
      surnameLabel.append(surnameInput);

      const nameLabel = document.createElement("label");
      nameLabel.className = "col-4 form-label flex-column";
      nameLabel.textContent = "Имя";
      const nameInput = document.createElement("input");
      nameInput.className = "form-control";
      nameInput.setAttribute("required", true);
      nameLabel.append(nameInput);

      const midnameLabel = document.createElement("label");
      midnameLabel.className = "col-4 form-label flex-column";
      midnameLabel.textContent = "Отчество";
      const midnameInput = document.createElement("input");
      midnameInput.className = "form-control";
      midnameInput.setAttribute("required", true);
      midnameLabel.append(midnameInput);

      const birthLabel = document.createElement("label");
      birthLabel.className = "col-4 form-label flex-column";
      birthLabel.textContent = "Дата рождения";
      const birthInput = document.createElement("input");
      birthInput.className = "form-control";
      birthInput.setAttribute("required", true);
      birthInput.setAttribute("type", "date");
      birthLabel.append(birthInput);

      const firstYearLabel = document.createElement("label");
      firstYearLabel.className = "col-4 form-label flex-column";
      firstYearLabel.textContent = "Год начала обучения";
      const firstYearInput = document.createElement("input");
      firstYearInput.setAttribute("type", "number");
      firstYearInput.className = "form-control";
      firstYearInput.setAttribute("required", true);
      firstYearLabel.append(firstYearInput);

      const facultyLabel = document.createElement("label");
      facultyLabel.className = "col-4 form-label flex-column";
      facultyLabel.textContent = "Факультет";
      const facultyInput = document.createElement("input");
      facultyInput.className = "form-control";
      facultyInput.setAttribute("required", true);
      facultyLabel.append(facultyInput);

      const submitWarn = document.createElement("h5");
      submitWarn.className = "h5 text-center btn-outline-danger";
      const submit = document.createElement("button");
      submit.className = "btn btn-primary mt-3";
      submit.textContent = "Добавить";

      leftColumn.append(surnameLabel);
      leftColumn.append(nameLabel);
      leftColumn.append(midnameLabel);
      leftColumn.append(birthLabel);
      leftColumn.append(firstYearLabel);
      leftColumn.append(facultyLabel);
      rightColumn.append(submitWarn);
      rightColumn.append(submit);

      form.append(leftColumn);
      form.append(rightColumn);
      container.append(form);

      return {surnameInput, nameInput, midnameInput, birthInput, firstYearInput, facultyInput, submitWarn, submit};
    }
    const inputForm = drawForm();

    function validateForm(object) {
      const alphabet = ("АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя").split("");
      let valid = "true";


      for (let char of object.surname) {
        if (alphabet.indexOf(char) === -1) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Фамилия' может содержать только буквы А-Я";
          valid = false;
          break;
        }
      }
      for (let char of object.name) {
        if (alphabet.indexOf(char) === -1) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Имя' может содержать только буквы А-Я";
          valid = false;
          break;
        }
      }
      for (let char of object.midname) {
        if (alphabet.indexOf(char) === -1) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Отчество' может содержать только буквы А-Я";
          valid = false;
          break;
        }
      }
      for (let char of object.faculty) {
        if (alphabet.indexOf(char) === -1) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Факультет' может содержать только буквы А-Я";
          valid = false;
          break;
        }
      }
        if (Number(object.birthDate) < -2208988800000 || Number(object.birthDate) > Date.now()) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Дата' может содержать значение не ранее 01.01.1900 года и не позднее текущей даты";
          valid = false;
        }

        if (object.firstYear && (object.firstYear < 2000 || object.firstYear > new Date().getFullYear())) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Год начала обучения' может содержать значение не ранее 2000 года и не позднее текущей даты";
          valid = false;
        }

      return valid;
    }

    function submitForm(array, inputForm) {
      document.querySelector(".input-form").addEventListener("submit", (form) => {
        form.preventDefault();
        const newObj = {
          name: inputForm.nameInput.value.trim(),
          surname: inputForm.surnameInput.value.trim(),
          midname: inputForm.midnameInput.value.trim(),
          birthDate: new Date(inputForm.birthInput.value),
          firstYear: Number(inputForm.firstYearInput.value.trim()),
          faculty: inputForm.facultyInput.value.trim(),
          warning: inputForm.submitWarn,
        };
        newObj.warning.innerHTML = "";
        if (validateForm(newObj)) {
          array.push(newObj);

          inputForm.nameInput.value = "";
          inputForm.surnameInput.value = "";
          inputForm.midnameInput.value = "";
          inputForm.birthInput.value = "";
          inputForm.firstYearInput.value = "";
          inputForm.facultyInput.value = "";
        }
        drawTable(array);
      });
    }
    submitForm(students, inputForm);

    function drawFilter() {
      const container = document.querySelector(".filter-container");
      const form = document.createElement("form");
      form.className = "filter-form input-group offset-2 row flex-wrap";
      form.setAttribute("method", "GET");

      const leftColumn = document.createElement("div");
      leftColumn.className = "col-8 row";
      const rightColumn = document.createElement("div");
      rightColumn.className = "col-8 row";

      const surnameLabel = document.createElement("label");
      surnameLabel.className = "col-3 mb-1 form-label flex-column";
      surnameLabel.textContent = "ФИО";
      const surnameInput = document.createElement("input");
      surnameInput.className = "form-control";
      surnameLabel.append(surnameInput);

      const facultyLabel = document.createElement("label");
      facultyLabel.className = "col-3 mb-1 form-label flex-column";
      facultyLabel.textContent = "Факультет";
      const facultyInput = document.createElement("input");
      facultyInput.className = "form-control";
      facultyLabel.append(facultyInput);

      const firstYearLabel = document.createElement("label");
      firstYearLabel.className = "col-3 mb-1 form-label flex-column";
      firstYearLabel.textContent = "Год начала обучения";
      const firstYearInput = document.createElement("input");
      firstYearInput.setAttribute("type", "number");
      firstYearInput.className = "form-control";
      firstYearLabel.append(firstYearInput);

      const lastYearLabel = document.createElement("label");
      lastYearLabel.className = "col-3 mb-1 form-label flex-column";
      lastYearLabel.textContent = "Год окончания обучения";
      const lastYearInput = document.createElement("input");
      lastYearInput.setAttribute("type", "number");
      lastYearInput.className = "form-control";
      lastYearLabel.append(lastYearInput);

      const submitWarn = document.createElement("h5");
      submitWarn.className = "h5 text-center btn-outline-danger";
      const submit = document.createElement("button");
      submit.className = "btn btn-warning mt-3";
      submit.textContent = "Фильтровать";

      leftColumn.append(surnameLabel);
      leftColumn.append(facultyLabel);
      leftColumn.append(firstYearLabel);
      leftColumn.append(lastYearLabel);
      rightColumn.append(submitWarn);
      rightColumn.append(submit);

      form.append(leftColumn);
      form.append(rightColumn);
      container.append(form);

      return {surnameInput, facultyInput, firstYearInput, lastYearInput, submitWarn, submit};
    }
    const inputFilter = drawFilter();

    function validateFilter(object) {
      const alphabet = ("АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя").split("");
      let valid = "true";

      for (let char of object.surname) {
        if (alphabet.indexOf(char) === -1) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'ФИО' может содержать только буквы А-Я";
          valid = false;
          break;
        }
      }
      
      for (let char of object.faculty) {
        if (alphabet.indexOf(char) === -1) {
          object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
          object.warning.innerHTML += "Поле 'Факультет' может содержать только буквы А-Я";
          valid = false;
          break;
        }
      }

      if (object.firstYear && object.firstYear < 2000) {
        object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
        object.warning.innerHTML += "Поле 'Год начала обучения' может содержать значение не ранее 2000 года";
        valid = false;
      }
      if (object.firstYear && object.firstYear > new Date().getFullYear()) {
        object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
        object.warning.innerHTML += "Поле 'Год начала обучения' может содержать значение не позднее текущего года";
        valid = false;
      }

      if (object.lastYear && object.lastYear < 2000) {
        object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
        object.warning.innerHTML += "Поле 'Год окончания обучения' может содержать значение не ранее 2000 года";
        valid = false;
      }
      // if (object.lastYear && object.lastYear > new Date().getFullYear()) {
      //   object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
      //   object.warning.innerHTML += "Поле 'Год окончания обучения' может содержать значение не позднее текущего года";
      //   valid = false;
      // }
      if (object.lastYear && object.lastYear < object.firstYear) {
        object.warning.innerHTML += (object.warning.innerHTML !== "") ? "<br>" : "";
        object.warning.innerHTML += "Поле 'Год окончания обучения' может содержать значение не ранее 'Год начала обучения'";
        valid = false;
      }

      return valid;
    }

    function checkFilter(object, objectCheck) {
      let checked = "true";

      if (!(objectCheck.surname+objectCheck.name+objectCheck.midname).toLowerCase().includes(object.surname.toLowerCase())) {
        checked = false;
      }
      
      if (!objectCheck.faculty.toLowerCase().includes(object.faculty.toLowerCase())) {
        checked = false;
      }

      if (object.firstYear !== 0 && Number(object.firstYear) !== Number(objectCheck.firstYear)) {
        checked = false;
      }
      if (object.lastYear !== 0 && Number(object.lastYear) !== Number(objectCheck.firstYear+4)) {
        checked = false;
      }
      return checked;
    }

    function submitFilter(array, inputFilter) {
      document.querySelector(".filter-form").addEventListener("submit", (form) => {
        form.preventDefault();
        const filtObj = {
          surname: inputFilter.surnameInput.value.trim(),
          faculty: inputFilter.facultyInput.value.trim(),
          firstYear: Number(inputFilter.firstYearInput.value.trim()),
          lastYear: Number(inputFilter.lastYearInput.value.trim()),
          warning: inputFilter.submitWarn,
        };
        const arrFiltered = [];
        filtObj.warning.innerHTML = "";
        if (validateFilter(filtObj)) {
          for (let i in array) {
            if (checkFilter(filtObj, array[i])) arrFiltered.push(array[i]);
          }
          drawTable(arrFiltered);
        }
      });
    }
    submitFilter(students, inputFilter);
  });
})();
