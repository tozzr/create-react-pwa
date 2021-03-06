import {action, computed, observable, toJS} from 'mobx'

class RequirementStore {

  serviceUrl = 'http://localhost:8080/requirements'

  _requirements = observable([])
  loaded = false
  
  requirementForm = observable({
    system: 0,
    priority: -1,
    type: -1,
    object: "",
    processword: ""
  })

  @computed get requirements() {
      if (!this.loaded)
        fetch(this.serviceUrl)
        .then((res) => {
          return res.json()
        })
        .then((values) => {
          values.map(v => {
            return this._requirements.push(v)
          })
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
      this.loaded = true
      return this._requirements
  }

  @action add() {
    this._requirements.push(toJS(this.requirementForm))
  }

  @action remove(index) {
    this._requirements.splice(index, 1)
  }

  options = {
    system: [{value: 0, label: 'Das System'}, {value: 1, label: '<Name des Systems>'}],
    priority: [{value: -1, label: '<Wichtigkeit>'}, {value: 0, label: 'muss'}, {value: 1, label: 'sollte'}, {value: 2, label: 'wird'}, {value: 3, label: 'kann'}],
    type: [{value: -1, label: '<Art der Funktionalität>'}, {value: 0, label: '-'},{value: 1, label: '<Wem?> die Möglichkeit bieten'}, {value: 2, label: 'fähig sein'}]
  }
}

export default new RequirementStore();