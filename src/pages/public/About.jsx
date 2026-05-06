import React from 'react';
import './About.css';

const personnel = [
  {
    id: 'EMP01',
    name: 'Annabelle F. Yangson',
    role: 'DILG City Director',
    status: 'Active',
    group: 'Managerial',
    employment: 'Fulltime',
    email: 'bagusfikri@gmail.com',
    phone: '+62 123 123 123',
    joined: '29 Oct, 2020',
  },
  {
    id: 'EMP02',
    name: 'Atty. Florian faith A. Bayawac',
    role: 'Local Government Operations Officer VI',
    status: 'Active',
    group: 'Managerial',
    employment: 'Fulltime',
    email: 'ihdizein@gmail.com',
    phone: '(40) 768 082 716',
    joined: '1 Feb, 2019',
  },
  {
    id: 'EMP03',
    name: 'Jill D. Peros',
    role: 'Local Government Operations Officer V',
    status: 'Active',
    group: 'Managerial',
    employment: 'Fulltime',
    email: 'mufti.h@gmail.com',
    phone: '(63) 130 689 256',
    joined: '1 Feb, 2021',
  },
  {
    id: 'EMP04',
    name: 'Fauzan Ardhiansyah',
    role: 'UI Designer',
    status: 'Active',
    group: 'Managerial',
    employment: 'Fulltime',
    email: 'heloozan@gmail.com',
    phone: '(64) 630 613 343',
    joined: '21 Sep, 2018',
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
                <div>{person.group} · {person.employment}</div>
                <div><a href={`mailto:${person.email}`}>{person.email}</a></div>
                <div><a href={`tel:${person.phone}`}>{person.phone}</a></div>
              </div>
              <div className="personnel-footer">
                <span>Joined at {person.joined}</span>
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
