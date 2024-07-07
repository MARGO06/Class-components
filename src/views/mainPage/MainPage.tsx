import { Component } from 'react';
import { ResultPart } from 'src/components/resultPart/ResultPart';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { getPeople, Person } from 'src/apiRequests/GetPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import '../../components/resultPart/ResultPart.css';

type MainState = {
  inputValue: string;
  isLoading: boolean;
  people: Person[];
};

export class MainPage extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('search') ?? '',
      isLoading: false,
      people: [],
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  handleSearch = (searchValue: string) => {
    this.setState({ inputValue: searchValue, isLoading: true });
    this.fetchPerson(searchValue);
  };

  fetchPeople = () => {
    getPeople().then((people) => {
      this.setState({
        isLoading: false,
        people,
      });
    });
  };

  fetchPerson = (searchName: string) => {
    getPerson(searchName).then((people) => {
      this.setState({
        isLoading: false,
        people,
      });
    });
  };

  render() {
    const { inputValue, isLoading, people } = this.state;

    return (
      <div className="wrapper">
        <SearchPart onSearch={this.handleSearch} />
        {isLoading ? (
          <div className="container">
            <div className="loading" />
          </div>
        ) : (
          <ResultPart searchName={inputValue} people={people} />
        )}
      </div>
    );
  }
}
