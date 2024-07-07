import { Component } from 'react';
import './SearchPart.css';

interface SearchState {
  inputValue: string;
  hasError: boolean;
  errorMessage: string;
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
      errorMessage: ' ',
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
    if (inputValue.endsWith(' ')) {
      this.setState({ errorMessage: 'Please remove the space at the end of the line' });
    } else {
      this.setState({ errorMessage: ' ' });
      localStorage.setItem('search', inputValue);
      onSearch(inputValue);
    }
  };

  handleError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { inputValue, hasError, errorMessage } = this.state;
    if (hasError) {
      throw new Error('Mistake');
    }
    return (
      <section className="searchPart">
        <input
          id="main-input"
          placeholder="name"
          value={inputValue}
          onChange={this.handleNameChange}
        />
        <button type="button" className="button-search" onClick={this.handleNameSave}>
          Search
        </button>
        <button type="button" className="button-error" onClick={this.handleError}>
          Error
        </button>
        {errorMessage && <div className="error-input">{errorMessage}</div>}
      </section>
    );
  }
}
