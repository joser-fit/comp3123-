import React, { Component } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Image, Modal } from 'react-bootstrap';

const apiUrl = 'https://randomuser.me/api/?results=10';

function fullName({ title, first, last }) {
  return [title, first, last].join(' ');
}

function PersonCard({ person, onDetails }) {
  const { name, login, gender, location, email, dob, registered, phone, cell, picture } = person;
  const { street, city, state, country, postcode, timezone } = location;
  const fields = [
    ['User Name', login.username],
    ['Gender', gender.toUpperCase()],
    ['Time Zone Description', timezone.description],
    ['Address', `${street.number} ${street.name}, ${city}, ${state}, ${country} – ${postcode}`],
    ['Email', email],
    ['Birth Date and Age', `${dob.date.slice(0, 10)} (${dob.age})`],
    ['Register Date', registered.date.slice(0, 10)],
    ['Phone#', phone],
    ['Cell#', cell],
  ];

  return (
    <Card as="article" className="person-card">
      <Card.Header as="h2">{fullName(name)} – {login.uuid}</Card.Header>
      <Card.Body className="person-body">
        <div className="portrait">
          <Image src={picture.large} alt={fullName(name)} roundedCircle />
          <Button onClick={() => onDetails(person)} aria-label={`Details for ${fullName(name)}`}>
            Details
          </Button>
        </div>
        <dl className="person-fields">
          {fields.map(([label, value]) => (
            <React.Fragment key={label}>
              <dt>{label}:</dt>
              <dd>{value}</dd>
            </React.Fragment>
          ))}
        </dl>
      </Card.Body>
    </Card>
  );
}

export default class PersonList extends Component {
  state = { persons: [], method: 'axios', loading: true, error: '', selected: null };

  componentDidMount() {
    this.loadPersons('axios');
  }

  componentWillUnmount() {
    this.request?.abort();
  }

  loadPersons = async (method) => {
    this.request?.abort();
    const request = new AbortController();
    this.request = request;
    this.setState({ method, persons: [], loading: true, error: '' });

    try {
      let data;
      if (method === 'axios') {
        const response = await axios.get(apiUrl, { signal: request.signal, timeout: 15000 });
        data = response.data;
      } else {
        const signal = AbortSignal.any([request.signal, AbortSignal.timeout(15000)]);
        const response = await fetch(apiUrl, { signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        data = await response.json();
      }

      if (!Array.isArray(data.results) || data.results.length !== 10) {
        throw new Error('Expected ten users.');
      }
      if (!request.signal.aborted) this.setState({ persons: data.results, loading: false });
    } catch {
      if (!request.signal.aborted) {
        this.setState({ loading: false, error: 'Could not load users. Try again.' });
      }
    }
  };

  render() {
    const { persons, method, loading, error, selected } = this.state;
    return (
      <>
        <header className="app-header"><h1>User List</h1></header>
        <main className="container-fluid px-3">
          <div className="toolbar" aria-label="Request method" role="group">
            <Button size="sm" variant={method === 'axios' ? 'primary' : 'outline-primary'}
              aria-pressed={method === 'axios'} onClick={() => this.loadPersons('axios')}>
              Axios
            </Button>
            <Button size="sm" variant={method === 'fetch' ? 'primary' : 'outline-primary'}
              aria-pressed={method === 'fetch'} onClick={() => this.loadPersons('fetch')}>
              Fetch API
            </Button>
            <span role="status">{loading ? 'Loading users…' : persons.length ? `${persons.length} users` : ''}</span>
          </div>
          {error && (
            <Alert variant="danger">
              {error}{' '}
              <Button variant="outline-danger" size="sm" onClick={() => this.loadPersons(method)}>Retry</Button>
            </Alert>
          )}
          {persons.map((person) => (
            <PersonCard key={person.login.uuid} person={person}
              onDetails={(selected) => this.setState({ selected })} />
          ))}
        </main>
        <Modal show={Boolean(selected)} onHide={() => this.setState({ selected: null })} centered>
          {selected && (
            <>
              <Modal.Header closeButton><Modal.Title>{fullName(selected.name)}</Modal.Title></Modal.Header>
              <Modal.Body>
                <dl className="person-fields mb-0">
                  <dt>User ID</dt><dd>{selected.login.uuid}</dd>
                  <dt>Nationality</dt><dd>{selected.nat}</dd>
                  <dt>Time zone offset</dt><dd>{selected.location.timezone.offset}</dd>
                </dl>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ selected: null })}>Close</Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </>
    );
  }
}
