import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

const ListOfBarangay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: testData, error } = await supabase
                    .from('test')
                    .select('*');

                if (error) throw error;
                if (testData) setData(testData);
            } catch (err) {
                console.error("Error fetching barangays:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
            <h1 style={{ color: '#8b0000', marginBottom: '1.5rem', borderBottom: '2px solid #8b0000', paddingBottom: '0.5rem' }}>
                List of Barangays
            </h1>

            {loading ? (
                <p>Loading records...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#fff' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#8b0000', color: 'white' }}>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date Created</th>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.id}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>● Active</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && data.length === 0 && (
                <p style={{ marginTop: '1rem', color: '#666' }}>No barangay records found.</p>
            )}
        </div>
    );
};

export default ListOfBarangay;