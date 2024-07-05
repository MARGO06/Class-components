import { Component } from 'react';
import { getPeople, Person } from '../../api-requests/GetPeople';
import './ResultPart.css';

type ResultPartState = {
  people: Person[];
};

export class ResultPart extends Component<Record<string, never>, ResultPartState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople = () => {
    getPeople().then((people) => {
      this.setState({ people });
    });
  };

  render() {
    const { people } = this.state;
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
