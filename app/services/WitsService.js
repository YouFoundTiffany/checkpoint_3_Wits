import { AppState } from "../AppState.js";
import { Wit } from "../models/Wit.js";
import { saveState } from "../utils/Store.js";

function _saveWits() {
    saveState('wits', AppState.wits)
}


function _myWits() {
    debugger
    let myWits = AppState.wits.length
    return myWits
}

class WitsService {

    // GET ACTIVE FUNCTION
    setActive(witId) {
        let foundWit = AppState.wits.find(w => w.id == witId)
        console.log('setting active', foundWit)
        AppState.activeWit = foundWit
        // AppState.emit('activeWit');
    }

    // SAVE FUNCTION
    saveWit(updatedBody, lastUpdated) {
        let active = AppState.activeWit
        active.body = updatedBody
        active.lastUpdated = lastUpdated;
        // NOTE save changes to appstate
        active.open = false
        AppState.emit('activeWit')

        // NOTE save changes to local storage
        _saveWits()
    }

    // CREATE FUNCTION
    createWit(formData) {
        let newWit = new Wit(formData)
        AppState.wits.push(newWit)
        console.log(newWit);
        AppState.emit('wits')

        newWit.open = true
        AppState.activeWit = newWit

        _saveWits()

    }
    // DELETE FUNCTION
    deleteWit(witId) {

        let foundWit = AppState.wits.find(w => w.id == witId)
        let filteredWitArr = AppState.wits.filter(w => w.id != witId) // NOTE filter out the wit we want to remove
        AppState.wits = filteredWitArr // NOTE set the appstate to the returned array that filters out the wit we want to remove
        AppState.activeWit = null
        AppState.emit('activeWit') // reset the active Wit
        _saveWits()
        //NOTE save the newly filtered appstate.wits array back to local storage
        // need to clear this 'form'
    }

}

export const witsService = new WitsService()
