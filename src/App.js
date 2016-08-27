import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import {observer} from 'mobx-react'
import logo from './logo.svg'
import './App.css'

@observer
class App extends Component {

  render() {
    let reqs = this.props.store.requirements;    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className="App-intro">
          Requirements made easy.
        </p>
        {
          reqs.map((r, index) => {              
            return (
              <p key={index}>
                {this.props.store.options.system[r.system].label} {' '}
                {this.props.store.options.priority[parseInt(r.priority, 0)+1].label} {' '}
                {this.props.store.options.type[parseInt(r.type, 0)+1].label} {' '}
                {r.object} {' '}
                {r.processword}
                <button onClick={() => {this.props.store.remove(index)}}>-</button>
              </p>
            )
          })
        }
        <RequirementForm store={this.props.store} />
      </div>
    )
  }
}

@autobind
@observer
class RequirementForm extends Component {

  handleSystemChange(value) {
    this.props.store.requirementForm.system = value
  }

  handlePriorityChange(value) {
    this.props.store.requirementForm.priority = value
  }

  handleTypeChange(value) {
    this.props.store.requirementForm.type = value
  }

  handleObjectChange(e) {
    this.props.store.requirementForm.object = e.target.value
  }

  handleVerbChange(e) {
    this.props.store.requirementForm.processword = e.target.value
  }

  render() {
    const { system, priority, type, object, processword } = this.props.store.requirementForm
    const options = this.props.store.options
    return (
      <div>
        <Select name="system" value={system} options={options.system} onChange={this.handleSystemChange} />
        <Select name="priority"  value={priority} options={options.priority} onChange={this.handlePriorityChange} />
        <Select name="type" value={type} options={options.type} onChange={this.handleTypeChange} />
        <input name="object" type="text" placeholder="<Objekt>" value={object} onChange={this.handleObjectChange} />
        <input name="processword" type="text" placeholder="<Prozesswort>" value={processword} onChange={this.handleVerbChange} />
        .
        <button onClick={() => { this.props.store.add() }}>+</button>
      </div>
    );
  }
}

@autobind
class Select extends Component {
  
  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <select name={this.props.name} value={this.props.value} onChange={this.handleChange}>
      {
        this.props.options.map((o, index) => {
          return <option key={index} value={o.value}>{o.label}</option>
        })
      }
      </select>
    )
  }
}

export default App;
