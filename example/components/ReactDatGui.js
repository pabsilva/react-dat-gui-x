import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatFolder,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString
} from 'react-dat-gui';
import React, { Component } from 'react';

import Stats from './Stats';

/**
 * Demonstrates presets that extend the default preset (initial state)
 * as well as presets which extend the current state
 */
class DatGUI extends Component {
  constructor() {
    super();

    const initialState = {
      string: 'Hello World',
      minMaxNumber: 66,
      number: 80,
      boolean: true,
      select: 'one',
      objSelect: 'four',
      color: '#2FA1D6',
      random: 0,
      nested: {
        string: 'Nested Hello World'
      }
    };

    this.state = {
      data: initialState,
      defaultData: initialState
    };
  }

  // Update random number for current state
  handleButtonClick = () =>
    this.setState(prevState => ({
      data: { ...prevState.data, random: Math.random() }
    }));

  // Update current state with changes from controls
  handleUpdate = newData =>
    this.setState(prevState => ({
      data: { ...prevState.data, ...newData }
    }));

  onChange = (path,value) => console.log('Change at property',path, value)

  render() {
    const { data, defaultData } = this.state;
    const presets = [
      // Preset A doesn't extend any other presets
      {
        A: {
          string: 'Preset A',
          minMaxNumber: 33,
          number: 40,
          boolean: false,
          select: 'one',
          objSelect: 'two',
          color: '#e61d5f',
          random: Math.random(),
          nested: {
            string: 'Nested Preset A'
          }
        }
      },
      {
        B: {
          string: 'Preset B',
          minMaxNumber: 12,
          number: 68,
          boolean: true,
          select: 'three',
          objSelect: 'one',
          color: '#2FD654',
          random: Math.random(),
          nested: {
            string: 'Nested Preset B'
          }
        }
      },
      // Preset C extends the default preset
      { 'C (extends Default)': { ...defaultData, string: 'Preset C' } },
      // Preset D extends the current state
      { 'D (extends current state)': { ...data, string: 'Preset D' } }
    ];

    return (
      <main style={{ marginRight: '350px' }}>
        <Stats data={data} />
        <DatGui data={data} onUpdate={this.handleUpdate}>
          <DatPresets
            label="Presets"
            options={presets}
            onUpdate={this.handleUpdate}
          />
          <DatString path="string" label="String" onChange={this.onChange}/>
          <DatNumber
            path="minMaxNumber"
            label="Number"
            min={0}
            max={100}
            step={1}
          />
          <DatNumber path="number" label="Number" onChange={this.onChange}/>
          <DatBoolean path="boolean" label="Boolean" onChange={this.onChange}/>
          <DatButton label="Button" onClick={this.handleButtonClick} />
          <DatSelect
            label="Select"
            path="select"
            options={['two', 'three', 'four']}
            onChange={this.onChange}
          />
          <DatSelect
            label="Select"
            path="objSelect"
            options={{'two': 'Two', 'three':'Three', 'four': 'Four'}}
            onChange={this.onChange}
          />
          <DatColor label="Color" path="color" onChange={this.onChange}/>
          <DatFolder title="Folder">
            <DatString path="string" label="String" onChange={this.onChange}/>
            <DatNumber
              path="minMaxNumber"
              label="Number"
              min={0}
              max={100}
              step={1}

            />
            <DatFolder title="Nested Folder">
              <DatNumber
                path="minMaxNumber"
                label="Number"
                min={0}
                max={100}
                step={1}
              />
              <DatString path="nested.string" label="String" onChange={this.onChange}/>
              <DatFolder title="Another Nested Folder">
                <DatColor label="Color" path="color" />
                <DatString path="nested.string" label="Nested String" />
              </DatFolder>
            </DatFolder>
          </DatFolder>
        </DatGui>
      </main>
    );
  }
}

export default DatGUI;
