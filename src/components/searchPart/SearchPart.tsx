import { Component } from 'react';
import './SearchPart.css';
import { getPeople } from '../../api-requests/GetPeople';

interface SearchState {
  inputValue: string;
}

export class SearchPart extends Component<Record<string, never>, SearchState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    this.setState({
      inputValue: newName,
    });
  };

  handleNameSave = () => {
    const { inputValue } = this.state;
    localStorage.setItem('search', inputValue);
    getPeople();
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="searchPart">
        <input id="main-input" value={inputValue} onChange={this.handleNameChange} />
        <button type="button" className="button-search" onClick={this.handleNameSave}>
          Search
        </button>
      </div>
    );
  }
}
