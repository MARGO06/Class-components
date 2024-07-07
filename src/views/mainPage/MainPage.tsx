import { Component } from 'react';
import { ResultPart } from '../../components/resultPart/ResultPart';
import { SearchPart } from '../../components/searchPart/SearchPart';
import { getPeople } from '../../api-requests/GetPeople';
import '../../components/resultPart/ResultPart.css';

type MainState = {
  inputValue: string;
  isLoading: boolean;
};

export class MainPage extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('search') ?? '',
      isLoading: false,
    };
  }

  handleSearch = (searchValue: string) => {
    this.setState({ inputValue: searchValue, isLoading: true });
    this.fetchPeople();
  };

  fetchPeople = () => {
    getPeople().then(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { inputValue, isLoading } = this.state;

    return (
      <div className="wrapper">
        <SearchPart onSearch={this.handleSearch} />
        {isLoading ? (
          <div className="container">
            <div className="loading" />
          </div>
        ) : (
          <ResultPart searchName={inputValue} />
        )}
      </div>
    );
  }
}
