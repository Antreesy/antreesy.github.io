(()=>{
  const eventTouch = ("ontouchstart" in window) ? 'touchend' : 'click';

  const pairs = {
    gameField: document.createElement("div"),

    createField: function(rows = 4,columns = 4) {
      rows = (rows*columns % 2 === 0 && rows >=2 && rows<= 10) ? rows : 4;
      columns = (rows*columns % 2 === 0 && columns >=2 && columns<= 10) ? columns : 4;

      if (document.querySelector('.game-container')) {
        document.querySelectorAll('.game-container .row').forEach(element => {element.remove();}); 
        document.querySelector('.game-container').remove();
      }
      pairs.gameField.className = "container game-container";

      function addCards() { //fill gameField
        let cardId = 0;
        let fontSize = Math.min(40/rows, 50/columns)
        for (let i = 0; i < rows; i++) {
          let cardsRow = document.createElement("div");
          cardsRow.className = 'row';
          for (let j = 0; j < columns; j++) {
            let card = document.createElement("button");
            card.className = 'game-card col m-1 p-1 btn btn-primary hidden-num';
            card.textContent = `${cardId}`
            card.classList.add(`id-${cardId}`);
            card.setAttribute('data-id', cardId++);
            card.style.fontSize = `${fontSize}vh`
            cardsRow.append(card);
          };
          if (pairs.gameField) {}
        pairs.gameField.append(cardsRow);
        };
        document.body.append(pairs.gameField)
      }
      addCards();
      const cardArray = document.querySelectorAll(".game-card")

      function shuffleCards() {
        const cardValues = [];
        let value = 1;
        for (let i = 0; i < cardArray.length/2; i++) {
          cardValues.push(value, value);
          value++;
        }
        for (let i = cardValues.length -1; i > 0; i--) { // Fisher Yates shuffle
          let j = Math.floor(Math.random() * i);
          let k = cardValues[i];
          cardValues[i] = cardValues[j];
          cardValues[j] = k;
        }
        return cardValues;
      }
  
      function fillCards() {
        const cardValues = shuffleCards()
        
        for (let i = 0; i < cardArray.length; i++) {
          cardArray[i].textContent = cardValues[i];
          cardArray[i].setAttribute("data-value", cardValues[i])
        }
      }
      fillCards();

      let timerInt;
      function addControls() { //add controls
        let controlWrapper = document.createElement('div');
        let cardsRemain = document.createElement('div');
        let cardsRefresh = document.createElement('button');
        let timer = document.createElement('div');
        let time = 60;
  
        controlWrapper.className = 'row';
        cardsRemain.className = 'game-counter col m-1 p-1 btn btn-lg btn-light';
        // cardsRemain.style.fontSize = `${4}vw`

        timer.className = 'timer col m-1 p-1 btn btn-lg btn-secondary'
        // timer.style.fontSize = `${4}vw`
        clearInterval(timerInt);
        timer.textContent = time.toFixed(1);
        function reducer() {
          time -= 0.1; //reduce time
          if (time <= 0) {
            clearInterval(timerInt);
            time = 0;
            timer.innerHTML = time.toFixed(1);
            alert('Time is up')
            cardsRefresh.removeAttribute('disabled');
            cardsRefresh.classList.remove('hidden-btn');
          }
          timer.innerHTML = time.toFixed(1); //show time
        }
        timerInt = setInterval(reducer, 100); //start timer

        cardsRefresh.className = 'game-refresh col m-1 p-1 btn btn-lg btn-light hidden-btn';
        cardsRefresh.textContent = 'Restart'
        // cardsRefresh.style.fontSize = `${4}vw`
        cardsRefresh.setAttribute('disabled', true)
        cardsRefresh.addEventListener(eventTouch, ()=>{
          pairs.createField();
          getTry();
        })
  
        controlWrapper.append(cardsRemain);
        controlWrapper.append(timer);
        controlWrapper.append(cardsRefresh);
        pairs.gameField.append(controlWrapper);
      }
      addControls();

      function getTry() {
        let valueFirst;
        let valueSecond;
        let idFirst;
        let elemFirst;
        let idSecond;
        let elemSecond;
        let btnCounter = document.querySelector('.game-counter');
        let btnRefresh = document.querySelector('.game-refresh');
    
        function resetCards() {
          valueFirst = null;
          valueSecond = null;
          if (elemFirst || elemSecond) {
            elemFirst.classList.remove('btn-warning')
            elemSecond.classList.remove('btn-warning')
          }
        }
        resetCards();
        let cardsRemain = cardArray.length;
    
        btnCounter.textContent = `${cardsRemain} left`;
    
    
        cardArray.forEach(element => {
          element.addEventListener(eventTouch, (elem) => {
            document.querySelectorAll('.btn-danger').forEach((elem)=>{
              elem.classList.remove('btn-danger');
              elem.removeAttribute('disabled');
            })
            elem.target.classList.add('btn-warning');
            elem.target.setAttribute('disabled', true)
    
            if (!valueFirst) {
              valueFirst = elem.target.getAttribute('data-value');
              idFirst = elem.target.getAttribute('data-id');
              elemFirst = document.querySelector(`.id-${idFirst}`)
            } else {
              valueSecond = elem.target.getAttribute('data-value');
              idSecond = elem.target.getAttribute('data-id');
              elemSecond = document.querySelector(`.id-${idSecond}`)
              if (valueSecond === valueFirst) {
                elemFirst.classList.add('btn-success')
                elemSecond.classList.add('btn-success')
                btnCounter.textContent = `${cardsRemain-=2} left`;
                resetCards();
                if (cardsRemain === 0) { // finish game
                  btnRefresh.removeAttribute('disabled');
                  btnRefresh.classList.remove('hidden');
                  clearInterval(timerInt);
                }
              } else {
                elemFirst.classList.add('btn-danger')
                elemSecond.classList.add('btn-danger')
                resetCards();
                // let timeout = setTimeout(() => {}, 500); //closed at timer
              }
            };
        });
      });
      }
      getTry();

      return cardArray;
    },

    createInput: function() {
      const inputContainer = document.createElement('div');
      inputContainer.className = 'container'
      const inputCaption = document.createElement('h2')
      inputCaption.className = 'h2'
      inputCaption.textContent = 'Number of cards by vertical / by horizontal'
      const inputForm = document.createElement('form');
      inputForm.className = 'row input-group mb-3'
      const textRow = document.createElement('span')
      textRow.className = 'col input-group-text'
      textRow.textContent = 'row'
      const inputRow = document.createElement('input')
      inputRow.className = 'col form-control'
      const textCol = document.createElement('span')
      textCol.className = 'col input-group-text'
      textCol.textContent = 'Col'
      const inputCol = document.createElement('input')
      inputCol.className = 'col form-control'
      const inputSubmit = document.createElement('button')
      inputSubmit.className = 'col btn btn-warning'
      inputSubmit.textContent = 'Start'

      inputSubmit.addEventListener(eventTouch, (elem)=>{
        elem.preventDefault();
        pairs.createField(inputRow.value, inputCol.value)
      })

      inputContainer.append(inputCaption);
      inputContainer.append(inputForm);
      inputForm.append(textRow)
      inputForm.append(inputRow)
      inputForm.append(textCol)
      inputForm.append(inputCol)
      inputForm.append(inputSubmit)

      document.body.append(inputContainer);
    }
  }

  pairs.createInput()

})()