import { Component } from 'react';
import { getPeople, Person } from '../../api-requests/GetPeople';
import './ResultPart.css';

type ResultPartState = {
  people: Person[];
  isLoading: boolean;
};

type ResultProps = {
  searchName: string;
};

export class ResultPart extends Component<ResultProps, ResultPartState> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      people: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  componentDidUpdate(prevProps: ResultProps) {
    const { searchName } = this.props;
    if (searchName !== prevProps.searchName) {
      this.fetchPeople();
    }
  }

  fetchPeople = () => {
    getPeople().then((people) => {
      const { searchName } = this.props;
      this.setState({
        people: searchName ? people.filter((person) => person.name === searchName) : people,
        isLoading: false,
      });
    });
  };

  render() {
    const { people, isLoading } = this.state;
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }
    return (
      <div className="people">
        {people.map((person) => (
          <div className="person" key={person.url}>
            <p className="name">{person.name}</p>
            <p className="description">
              This person was born in the year {person.birth_year}.{' '}
              {person.gender.charAt(0).toUpperCase() + person.gender.slice(1)} has{' '}
              {person.eye_color} eyes,
              {person.hair_color} hair, weighs {person.mass} kg, and is
              {person.height} cm tall.
            </p>
          </div>
        ))}
      </div>
    );
  }
}
