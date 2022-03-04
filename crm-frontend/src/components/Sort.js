export function sort(array, dataSet) {

    let arraySorted = array.slice();
    let sortDir = 'nosort';
    if (dataSet !== null) {
      arraySorted.sort((a,b) => {

        let astring;
        let bstring;

        switch (dataSet) {
          case "Id":
              astring = a.id;
              bstring = b.id;
              break;
          case "Name":
            astring = `${a.surname} ${a.name} ${a.lastName}`.toLowerCase();
            bstring = `${b.surname} ${b.name} ${b.lastName}`.toLowerCase();
            break;
          case "Create":
            astring = a.createdAt;
            bstring = b.createdAt;
            break;
          case "Change":
            astring = a.updatedAt;
            bstring = b.updatedAt;
            break;
        }

        if (astring > bstring) return 1; else return -1;
      });
      
      if (array.every((elem, index) => elem === arraySorted[index] )) {
        array = arraySorted.reverse().slice();
        sortDir = 'backward';
      } else {
        array = arraySorted.slice();
        sortDir = 'forward';
      };
    }

    return [array, sortDir];
  }