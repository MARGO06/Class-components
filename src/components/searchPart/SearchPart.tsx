import { Component } from 'react';
import './SearchPart.css';

interface SearchState {
  inputValue: string;
}
type SearchProps = {
  onSearch: (searchValue: string) => void;
};

export class SearchPart extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('search') ?? '',
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
    const { onSearch } = this.props;
    localStorage.setItem('search', inputValue);
    onSearch(inputValue);
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
