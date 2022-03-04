import {Header} from "../Header/Header.js";
import {Main} from "../Main/Main.js";
import {Dialog} from '../Dialog/Dialog.js'

export default function App() {
    
    const [header, search] = Header();
    document.body.append(header)

    const dialog = Dialog();
    document.body.append(dialog)
    
    const main = Main();
    document.body.append(main)

}