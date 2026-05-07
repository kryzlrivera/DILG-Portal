import React from 'react';
import butuanImage from '../../assets/images/butuan-city.png';
import './About.css';

const personnel = [
  {
    id: 'EMP01',
    name: 'Annabelle F. Yangson',
    role: 'DILG City Director',
    status: 'Active',
    employment: 'Fulltime',
    email: 'bagusfikri@gmail.com',
  },
  {
    id: 'EMP02',
    name: 'Atty. Florian faith A. Bayawac, ENP, CESE',
    role: 'Local Government Operations Officer VI',
    status: 'Active',
    employment: 'Fulltime',
    email: 'ihdizein@gmail.com',
  },
  {
    id: 'EMP03',
    name: 'Jill D. Peros',
    role: 'Local Government Operations Officer V',
    status: 'Active',
    employment: 'Fulltime',
    email: 'mufti.h@gmail.com',
  },
  {
    id: 'EMP04',
    name: 'Karen S. Gabinete',
    role: 'Local Government Operations Officer V',
    status: 'Active',
    employment: 'Fulltime',
    email: 'mufti.h@gmail.com',
  },
  {
    id: 'EMP05',
    name: 'Jemelyn A. Yaun',
    role: 'Administrative Aid IV',
    status: 'Active',
    employment: 'Contractual',
    email: 'Jocelmones98@gmail.com',
  },
  {
    id: 'EMP06',
    name: 'Daryll Bacquial',
    role: 'Information System Analyst',
    status: 'Active',
    employment: 'Contractual',
    email: 'Jocelmones98@gmail.com',
  },
  {
    id: 'EMP07',
    name: 'Jonathan S. Bequibel',
    role: 'Information Technology Support',
    status: 'Active',
    employment: 'Contractual',
    email: 'Jocelmones98@gmail.com',
  },
  {
    id: 'EMP08',
    name: 'Jocel Mar M. Mones',
    role: 'Information Technology Support',
    status: 'Active',
    employment: 'Contractual',
    email: 'Jocelmones98@gmail.com',
  },
  {
    id: 'EMP09',
    name: 'Devon P. Jalandoni',
    role: 'Driver',
    status: 'Active',
    employment: 'Contractual',
    email: 'Jocelmones98@gmail.com',
  },
];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero container">
        <div className="about-text">
          <p className="eyebrow">About Us</p>
          <h1>Meet the team working to support transparency and public service.</h1>
          <p>The Department of the Interior and Local Government works with personnel from across the Philippines to deliver reliable information, strong local governance, and public service excellence.</p>
        </div>
      </section>

      <section className="events-section container">
        <div className="events-header">
          <div>
            <p className="eyebrow">Latest Events</p>
            <h2>Photo preview of recent DILG Butuan activities.</h2>
          </div>
          <div className="events-summary">Showing the latest event highlights</div>
        </div>

        <div className="events-grid">
          {[
            {
              id: 'EVT01',
              title: 'Community Resilience Workshop',
              date: 'May 3, 2026',
              description: 'Local leaders and residents join the training on disaster preparedness and local governance.',
            },
            {
              id: 'EVT02',
              title: 'Barangay Health and Safety Drive',
              date: 'April 25, 2026',
              description: 'DILG Butuan teams support barangay health improvement and outreach programs.',
            },
            {
              id: 'EVT03',
              title: 'Youth Leadership Summit',
              date: 'April 10, 2026',
              description: 'Youth representatives engage with DILG officials to shape future civic action.',
            },
          ].map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-image">
                <img src={butuanImage} alt={event.title} />
              </div>
              <div className="event-content">
                <div className="event-label">{event.date}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="personnel-section container">
        <div className="personnel-header">
          <div>
            <p className="eyebrow">Personnel</p>
            <h2>Key staff members driving our mission.</h2>
          </div>
          <div className="personnel-summary">{personnel.length} team members active</div>
        </div>

        <div className="personnel-grid">
          {personnel.map((person) => (
            <article key={person.id} className="personnel-card">
              <div className="personnel-status">{person.status}</div>
              <div className="personnel-avatar">{person.name.split(' ').map((part) => part[0]).join('')}</div>
              <div className="personnel-info">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
              <div className="personnel-meta">
                <div><span>#</span> {person.id}</div>
                <div><a href={`mailto:${person.email}`}>{person.email}</a></div>
              </div>
              <div className="personnel-footer">
                <button type="button">View details</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
