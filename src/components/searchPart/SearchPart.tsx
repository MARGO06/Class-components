import { Component } from 'react';
import './SearchPart.css';

interface SearchState {
  inputValue: string;
  hasError: boolean;
}
type SearchProps = {
  onSearch: (searchValue: string) => void;
};

export class SearchPart extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('search') ?? '',
      hasError: false,
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

  handleError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { inputValue, hasError } = this.state;
    if (hasError) {
      throw new Error('Mistake');
    }
    return (
      <div className="searchPart">
        <input id="main-input" value={inputValue} onChange={this.handleNameChange} />
        <button type="button" className="button-search" onClick={this.handleNameSave}>
          Search
        </button>
        <button type="button" className="button-error" onClick={this.handleError}>
          Error
        </button>
      </div>
    );
  }
}
