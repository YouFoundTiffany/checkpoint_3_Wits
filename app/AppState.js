import { Value } from "./models/Value.js"
import { Wit } from "./models/Wit.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

// done CREATE AREA THAT SHOWS TOTAL COUNT OF NOTES IN LOCAL STORAGE
// done REFINE THE ACTIVE OPEN WIT DATE SO THAT IT IS READABLE
// done CREATE AN UPDATED NOTE TIMESTAMP AND MAKE IT VIEWABLE
// done MAKE THE INPUT FIELD EMPTY WHEN PLUS BUTTON IS CLICKED
// done MAKE WIT COLOR SHOW IN ACTIVE/RIGHT SIDE/ AREA
// done MAKE DELETE FUNCTIONALITY, ENSURE USER GETS A PROMPT OF SOMEKIND TO CONFIRM DELETION
// done IF USER CANCELS THE DELETION, THE NOTE SHOULD NOT DELETE.
// done CHECK MOCK GUI REQUIREMENTS - updated my checklist

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./models/Wit.js').Wit[]} */

  wits = loadState('wits', [Wit])

  // NOTE open = editable = true
  // NOTE closed = viewable only = false
  // wits = [
  //   new Wit(
  //     {
  //       title: "Cupcakes",
  //       body: "Cupcake ipsum dolor sit amet jujubes fruitcake. Topping sesame snaps chocolate oat cake gummi bears bear claw topping pie.",
  //       color: "brdr-Sunshine-Sherbet",
  //     }),
  // ]

  /** @type {import('./models/Wit.js').Wit|null} */
  activeWit = null


  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
