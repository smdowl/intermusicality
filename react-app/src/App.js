import React, { Component } from "react";
import "./App.css";
import MIDISounds from "midi-sounds-react";
import tones from "./tones.json";
import triads from "./triads.json";
import parent_sets from "./parent_sets.json";
import metadata from "./mela_meta.json";

import { Card, Button } from "semantic-ui-react";

console.log(metadata);
// const INSTRUMENT = 124; // Marimba
const INSTRUMENT = 3; // Piano
const ROOT = 58;
const NOTES = [60, 62, 64, 66];
const b = 0.35;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  playTones = (idx) => {
    this.midiSounds.setMasterVolume(0.4);
    var when = this.midiSounds.contextTime();
    const notes = tones[idx].map((i) => ROOT + i);
    notes.forEach((n, idx) => {
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
          <Card.Group>
            {triads.map((tr, i) => (
              <Card>
                <Card.Header>
                  {i + 1}: {metadata[i]["Name"]}
                </Card.Header>
                {/* <Card.Content>
                  {tones[i].join(", ")}
                  <br />
                  {triads[i].join(", ")}
                </Card.Content> */}
                <Button.Group>
                  <Button basic color="grey" onClick={() => this.playTones(i)}>
                    Tones
                  </Button>
                  <Button basic color="grey" onClick={() => this.playTriads(i)}>
                    Chords
                  </Button>
                </Button.Group>
              </Card>
            ))}
          </Card.Group>
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
          instruments={[3, 124]}
        />
      </div>
    );
  }
}
