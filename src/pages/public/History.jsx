import React from 'react';
import './History.css';

const History = () => {
  return (
    <div className="history-page container">
      <div className="history-header">
        <p className="eyebrow">Our History</p>
        <h1>History of the Department of the Interior and Local Government</h1>
        <p>Learn about the origins of DILG and how it evolved into the organization serving local government and public safety today.</p>
      </div>

      <div className="history-content">
        <section>
          <h2>From the Philippine Revolution to modern governance</h2>
          <p>The Department of the Interior and Local Government traces its origins to the Tejeros Convention on March 22, 1897. It began as the Department of the Interior under the revolutionary government, and General Emilio Aguinaldo appointed General Pascual Álvarez to lead the office.</p>
          <p>Over the years, the department adapted to the needs of a changing nation, taking on responsibility for public order, safety, and the supervision of local government units. Its role grew to include strengthening barangay operations, coordinating with regional governments, and ensuring the effective delivery of basic services to citizens.</p>
        </section>

        <section>
          <h2>Key milestones</h2>
          <ul>
            <li><strong>1897:</strong> DILG begins as the Department of the Interior during the Philippine Revolution.</li>
            <li><strong>1947:</strong> The department is reorganized to support local governments nationwide and strengthen internal security.</li>
            <li><strong>1986:</strong> DILG expands its role in community development and barangay governance following the People Power Revolution.</li>
            <li><strong>2000s:</strong> DILG modernizes its approach to local service delivery, public safety, and barangay empowerment.</li>
          </ul>
        </section>

        <section>
          <h2>Today’s mission</h2>
          <p>Today, DILG continues to promote peace and order, ensure public safety, and support local government units across the Philippines. DILG Butuan City works to improve transparency, citizen services, and community development through strong partnerships with barangay leaders and local stakeholders.</p>
          <p>The department remains committed to serving the Filipino people with integrity, accountability, and a focus on lasting local governance reforms.</p>
        </section>
      </div>
    </div>
  );
};

export default History;
