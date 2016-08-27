import {observable, action, toJS} from 'mobx';

class RequirementStore {

  requirements = observable([])
  
  requirementForm = observable({
    system: 0,
    priority: -1,
    type: -1,
    object: "",
    processword: ""
  })

  add = action(() => {
    this.requirements.push(toJS(this.requirementForm))
  })

  remove = action((index) => {
      this.requirements.splice(index, 1)
  })

  options = {
    system: [{value: 0, label: 'Das System'}, {value: 1, label: '<Name des Systems>'}],
    priority: [{value: -1, label: '<Wichtigkeit>'}, {value: 0, label: 'muss'}, {value: 1, label: 'sollte'}, {value: 2, label: 'wird'}, {value: 3, label: 'kann'}],
    type: [{value: -1, label: '<Art der Funktionalität>'}, {value: 0, label: '-'},{value: 1, label: '<Wem?> die Möglichkeit bieten'}, {value: 2, label: 'fähig sein'}]
  }
}

export default new RequirementStore();