import React, { Component } from 'react';
import CheckboxGroup from '../components/CheckboxGroup';
import Select from '../components/Select';

class SearchForm extends Component {
  state = {
    sites: [],
    areaOptions: [],
    pitchOptions: [],
    activityOptions: [],
    areaSelection: '',
    selectedPitches: [],
    selectedActivities: []
  };

  componentDidMount() {
    const areaArray = [],
      pitchesArray = [],
      activitiesArray = [];

    fetch('./glamping1.json')
      .then(res => res.json())
      .then(data => {
        console.log(data.sites);
        data.sites.map(site => {
          return (
            areaArray.push(site.area),
            site.activities.map(activity => {
              return activitiesArray.push(activity);
            }),
            site.pitches.map(pitch => {
              return pitchesArray.push(pitch);
            })
          );
        });
        // console.log(areaArray);
        // console.log(pitchesArray);
        // console.log(activitiesArray);

        this.setState({
          sites: data.sites,
          areaOptions: areaArray,
          pitchOptions: [...new Set(pitchesArray)],
          activityOptions: [...new Set(activitiesArray)]
        });
      });
  }
  handleAreaSelect = e => {
    this.setState({ areaSelection: e.target.value }, () =>
      console.log('area selection', this.state.areaSelection)
    );
  };
  handlePitches = e => {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedPitches.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedPitches.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.selectedPitches, newSelection];
    }
    this.setState({ selectedPitches: newSelectionArray }, () =>
      console.log('pitch selection', this.state.selectedPitches)
    );
  };
  handleActivities = e => {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedActivities.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedActivities.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.selectedActivities, newSelection];
    }
    this.setState({ selectedActivities: newSelectionArray }, () =>
      console.log('pitch selection', this.state.selectedActivities)
    );
  };

  handleClearForm = e => {
    e.preventDefault();
    this.setState({
      areaSelection: '',
      selectedPitches: [],
      selectedActivities: []
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();

    const formPayload = {
      areaSelection: this.state.areaSelection,
      selectedPitches: this.state.selectedPitches,
      selectedActivities: this.state.selectedActivities
    };

    console.log('Send this in a POST request:', formPayload);
    this.handleClearForm(e);
  };
  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <h5>Search Options</h5>
        <Select
          name={'area'}
          placeholder={'Select Area'}
          controlFunc={this.handleAreaSelect}
          options={this.state.areaOptions}
          selectedOption={this.state.areaSelection}
        />
        <CheckboxGroup
          title={'Type of pitches available'}
          setName={'pitches'}
          type={'checkbox'}
          controlFunc={this.handlePitches}
          options={this.state.pitchOptions}
          selectedOptions={this.state.selectedPitches}
        />
        <CheckboxGroup
          title={'Nearby Activities'}
          setName={'activities'}
          type={'checkbox'}
          controlFunc={this.handleActivities}
          options={this.state.activityOptions}
          selectedOptions={this.state.selectedActivities}
        />
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Submit"
        />
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}
        >
          Clear form
        </button>
      </form>
    );
  }
}

export default SearchForm;
