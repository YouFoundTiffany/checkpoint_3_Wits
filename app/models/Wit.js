import { generateId } from "../utils/generateId.js"



export class Wit {
  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.body = data.body || "Wits here"
    this.createdDate = data.createdDate ? new Date(data.createdDate) : new Date();
    this.lastUpdated = this.createdDate
    // new Date()
    this.open = data.open || true
    this.color = data.color || ''
  }

  get ListTemplate() {
    return /*html*/`   <div class="px-0 pb-1 col-12">
            <div class="p-1 d-flex justify-content-between ${this.color} selectable" onclick="app.WitsController.setActive('${this.id}')">
              <span>${this.title}</span>

              <span>${this.createdDate.toLocaleDateString()}</span>

              <span id="shortenedText">${this.ComputeWitBody}</span>
            </div>
          </div>`
  }


  // Currently the template that is showing as active 
  get activeTemplate() {
    return /*html*/ `<div class="row">
    <div class="col-12">
      <div class="${this.color} p-1">
        <h6>Created On: ${this.createdDateView}</h6>
        <h6>Last Updated: ${this.formatDate(this.lastUpdated)}</h6>
        <h6>Title: ${this.title}</h6>
        <div class="text-end">
          <button class="btn plusBtn" onclick="app.WitsController.saveWit()">Save Wit</button>
        </div>
      </div>
      <div class="pt-2">
        <textarea class="w-100" name="body" id="body" cols="30" rows="10">${this.body}</textarea>
        <div class="col-2 p-1">
        <button class="btn plusBtn" onclick="app.WitsController.deleteWit('${this.id}')">Delete</button>
      </div>
      </div>
    </div>
  </div>`
  }


  get ComputeWitBody() {
    return this.body.slice(0, 12) + '...'
  }

  get createdDateView() {
    return this.formatDate(this.createdDate);
  }

  formatDate(date) {
    if (!date) {
      return "N/A";
    }
    // If date is a string, parse it into a Date object
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  }

  get ComputeLastUpdatedView() {
    let newLastUpdated = this.lastUpdated
    return newLastUpdated.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
}

