import { AppState } from "../AppState.js";
import { getFormData } from "../utils/FormHandler.js";
import { Wit } from "../models/Wit.js";
import { witsService } from "../services/WitsService.js";
import { setHTML } from "../utils/Writer.js";
import { Pop } from "../utils/Pop.js";



// NOTE This function creates your list of Wits on the left side.
function _drawWits() {
    // console.log('drawing wits')
    let wits = AppState.wits
    let content = ''
    wits.forEach(w => content += w.ListTemplate)
    setHTML('wit-list', content)
    _updateWitsCount()
}

// NOTE this function allows the user to click a wit in the left list and it displays on the right. 
// open = editable = true or maybe not?
// closed = viewable only = false my logic is messed up.
function _drawActive() {
    // console.log('drawing active')
    let active = AppState.activeWit
    if (active && active.open) {
        // this is OPEN
        // this would have been the unredacted
        setHTML('active-wit', active.activeTemplate)
    } else {
        setHTML('active-wit', active?.activeTemplate)
    }
}

function _updateWitsCount() {
    // debugger
    let witsCount = AppState.wits.length
    let witsCountElem = document.getElementById('wits-count')
    if (witsCountElem) {
        witsCountElem.textContent = witsCount.toString()
    }
}

export class WitsController {
    constructor() {
        // console.log('wits controller', AppState.wits)
        _drawWits()
        AppState.on('activeWit', _drawActive) //Attach an even hanler?
        AppState.on('wits', _drawWits) //Attach even handler
        // debugger
        _updateWitsCount()
    }

    setActive(witId) {
        witsService.setActive(witId)
        console.log('setting active wit', this.setActive)
    }
    saveWit() {
        let textAreaElem = document.querySelector('textarea')
        let updatedBody = textAreaElem.value
        let lastUpdated = new Date();
        console.log('saving')
        witsService.saveWit(updatedBody, lastUpdated)
        // Call this function whenever you want to update the count
        _updateWitsCount()

    }


    createWit() {

        window.event.preventDefault()
        const formEvent = window.event.target
        const formData = getFormData(formEvent)
        console.log('creating', formData)
        witsService.createWit(formData)
        formEvent.reset()
        _updateWitsCount()
    }

    async deleteWit(witId) {
        // debugger
        // NOTE we use await here to WAIT for the response before we run the next lines of code
        // NOTE we will be going over async/await in depth next week
        if (await Pop.confirm("Are you sure you want to remove this wit?")) {
            console.log('deleting', witId)
            witsService.deleteWit(witId)
            //NOTE pass the id from the onclick to the service to perform business logic
            _drawActive()
            _updateWitsCount()
        }


    }
}