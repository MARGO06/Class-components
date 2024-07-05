import { Component } from 'react';
import { ResultPart } from '../../components/resultPart/ResultPart';
import { SearchPart } from '../../components/searchPart/SearchPart';

type MainState = {
  inputValue: string;
};

export class MainPage extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('search') ?? '',
    };
  }

  handleSearch = (searchValue: string) => {
    this.setState({ inputValue: searchValue });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="wrapper">
        <SearchPart onSearch={this.handleSearch} />
        <ResultPart searchName={inputValue} />
      </div>
    );
  }
}
