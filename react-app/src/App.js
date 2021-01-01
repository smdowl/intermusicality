import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MIDISounds from "midi-sounds-react";
import tones from "./tones.json";
import triads from "./triads.json";
import parent_sets from "./parent_sets.json";

// const INSTRUMENT = 124; // Marimba
const INSTRUMENT = 4; // Piano
const ROOT = 58;
const NOTES = [60, 62, 64, 66];
const b = 0.35;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  playPositions = (positions) => {
    this.midiSounds.setMasterVolume(0.4);
    var when = this.midiSounds.contextTime();
    const notes = positions.map((i) => ROOT + i);
    notes.forEach((n, idx) => {
      console.log(idx);
      this.midiSounds.playChordAt(when + b * idx, INSTRUMENT, [n], 0.8 * b);
    });
  };

  playTriads = (i) => {
    const tr = triads[i];
    const t = tones[i];

    this.midiSounds.setMasterVolume(0.4);
    var when = this.midiSounds.contextTime();

    console.log(tr);
    const notes = tr.map((triad, i) => [
      ROOT + t[i],
      ROOT + t[i] + triad[0],
      ROOT + t[i] + triad[0] + triad[1],
    ]);
    console.log(notes);

    notes.forEach((n, idx) => {
      this.midiSounds.playChordAt(when + b * idx, INSTRUMENT, n, 0.8 * b);
    });
  };

  render() {
    return (
      <div className="App">
        <h2>All Melakartas</h2>
        <p>
          {triads.map((tr, i) => (
            <button onClick={() => this.playTriads(i)}>{i + 1}</button>
          ))}
        </p>

        <h2>Parent scales</h2>

        {parent_sets.map((mela_idxs, i) => (
          <p>
            {i}:<span> </span>
            {mela_idxs.map((mela_idx) => (
              <button onClick={() => this.playTriads(mela_idx)}>
                {mela_idx + 1}
              </button>
            ))}
          </p>
        ))}

        <MIDISounds
          ref={(ref) => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[3]}
        />
      </div>
    );
  }
}
