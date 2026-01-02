import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const LogsVault = () => {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState('All'); // فلتر النوع
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLogs();
    }, [filter]);

    const fetchLogs = async () => {
        let query = supabase
            .from('action_logs')
            .select(`
                *,
                moderator:players!moderator_id(username),
                target:players!target_id(username)
            `)
            .order('created_at', { ascending: false });

        if (filter !== 'All') {
            query = query.eq('action_type', filter);
        }

        const { data } = await query.limit(100); // جلب آخر 100 سجل للسرعة
        setLogs(data || []);
    };

    // فلترة النتائج حسب البحث (باسم المشرف أو الهدف)
    const filteredLogs = logs.filter(log => 
        log.moderator?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={containerStyle}>
            <h2 style={{color: '#3498db'}}>📜 Unified Logs Vault</h2>

            {/* أدوات التحكم: البحث والفلترة */}
            <div style={controlsStyle}>
                <input 
                    type="text" 
                    placeholder="Search by Moderator, Target or Reason..." 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchStyle}
                />
                <select onChange={(e) => setFilter(e.target.value)} style={selectStyle}>
                    <option value="All">All Actions</option>
                    <option value="Ban">Bans</option>
                    <option value="Kick">Kicks</option>
                    <option value="Promote">Promotions</option>
                    <option value="Demote">Demotions</option>
                    <option value="Dismissed">Dismissals</option>
                    <option value="Training">Trainings</option>
                </select>
            </div>

            {/* جدول السجلات */}
            <table style={tableStyle}>
                <thead>
                    <tr style={{borderBottom: '2px solid #34495e'}}>
                        <th style={thStyle}>Date (UTC)</th>
                        <th style={thStyle}>Moderator</th>
                        <th style={thStyle}>Action</th>
                        <th style={thStyle}>Target</th>
                        <th style={thStyle}>Reason / Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map(log => (
                        <tr key={log.id} style={trStyle}>
                            <td style={tdStyle}>{new Date(log.created_at).toLocaleString()}</td>
                            <td style={{...tdStyle, color: '#3498db'}}>{log.moderator?.username}</td>
                            <td style={tdStyle}>
                                <span style={getActionBadgeStyle(log.action_type)}>
                                    {log.action_type}
                                </span>
                            </td>
                            <td style={{...tdStyle, color: '#e67e22'}}>{log.target?.username}</td>
                            <td style={tdStyle}>{log.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// وظيفة لتلوين نوع الأكشن
const getActionBadgeStyle = (type) => {
    const base = { padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' };
    if (type === 'Ban') return { ...base, background: '#c0392b' };
    if (type === 'Promote') return { ...base, background: '#27ae60' };
    if (type === 'Demote') return { ...base, background: '#f39c12' };
    if (type === 'Dismissed') return { ...base, background: '#e74c3c' };
    return { ...base, background: '#34495e' };
};

// التنسيقات (Styles)
const containerStyle = { background: '#1a1a1a', padding: '25px', borderRadius: '15px', color: 'white', minHeight: '80vh' };
const controlsStyle = { display: 'flex', gap: '15px', marginBottom: '20px' };
const searchStyle = { flex: 2, padding: '10px', borderRadius: '8px', border: 'none', background: '#333', color: 'white' };
const selectStyle = { flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#34495e', color: 'white' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px' };
const thStyle = { textAlign: 'left', padding: '12px', color: '#bdc3c7' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #2c3e50', fontSize: '14px' };
const trStyle = { transition: '0.2s', cursor: 'default' };

export default LogsVault;