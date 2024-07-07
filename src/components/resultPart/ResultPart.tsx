import { Component } from 'react';
import { getPeople, Person } from 'src/apiRequests/GetPeople';
import './ResultPart.css';
import { getPerson } from 'src/apiRequests/SearchPerson';

type ResultPartState = {
  isLoading: boolean;
};

type ResultProps = {
  searchName: string;
  people: Person[];
};

export class ResultPart extends Component<ResultProps, ResultPartState> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const searchName = localStorage.getItem('searchName');
    if (searchName) {
      this.fetchPerson(searchName);
    } else {
      this.fetchPeople();
    }
  }

  componentDidUpdate(prevProps: ResultProps) {
    const { searchName } = this.props;
    if (searchName !== prevProps.searchName) {
      this.fetchPerson(searchName);
    }
  }

  fetchPeople = () => {
    getPeople().then(() => {
      this.setState({ isLoading: false });
    });
  };

  fetchPerson = (searchName: string) => {
    const { people } = this.props;
    getPerson(searchName).then(() => {
      const searchLower = searchName.toLowerCase();
      people.filter(
        (person) => person.name.toLowerCase().includes(searchLower) || person.name === searchName,
      );
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading } = this.state;
    const { people } = this.props;
    if (isLoading) {
      return (
        <div className="container">
          <div className="loading" />
        </div>
      );
    }
    return (
      <section className="people">
        {people.map((person) => (
          <div className="person" key={person.url}>
            <h2 className="name">{person.name}</h2>
            <p className="description">
              This person was born in the year {person.birth_year}.{' '}
              {person.gender.charAt(0).toUpperCase() + person.gender.slice(1)} has{' '}
              {person.eye_color} eyes,
              {person.hair_color} hair, weighs {person.mass} kg, and is
              {person.height} cm tall.
            </p>
          </div>
        ))}
      </section>
    );
  }
}
