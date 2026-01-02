import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const SessionManager = ({ moderatorId, sessionType }) => { // sessionType: 'Training' or 'Shift'
    const [trainees, setTrainees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [availableRanks, setAvailableRanks] = useState([]);

    useEffect(() => {
        // جلب الرتب المتاحة للترقية (التي تحت رتبة المشرف فقط)
        const fetchRanks = async () => {
            const { data } = await supabase.from('ranks').select('*').order('power_level', { ascending: true });
            setAvailableRanks(data);
        };
        fetchRanks();
    }, []);

    // 1. إضافة متدرب للقائمة بالبحث اللحظي
    const addTrainee = async (idOrName) => {
        const { data: player } = await supabase
            .from('players')
            .select('*, ranks(*)')
            .or(`username.eq.${idOrName}, roblox_id.eq.${!isNaN(idOrName) ? idOrName : 0}`)
            .single();

        if (player) {
            if (!trainees.find(t => t.roblox_id === player.roblox_id)) {
                setTrainees([...trainees, { ...player, status: 'Active', newRankId: player.current_rank_id }]);
            }
        }
    };

    // 2. تحديث رتبة المتدرب (Dropdown Logic)
    const updateTraineeRank = (id, rankId) => {
        setTrainees(trainees.map(t => t.roblox_id === id ? { ...t, newRankId: rankId, status: 'Passed' } : t));
    };

    // 3. إنهاء الحصة وحفظ البيانات (Save & Finish)
    const finishSession = async () => {
        for (let t of trainees) {
            // إذا تمت ترقيته
            if (t.status === 'Passed' && t.newRankId !== t.current_rank_id) {
                await supabase.from('players').update({ current_rank_id: t.newRankId }).eq('roblox_id', t.roblox_id);
            }
            // إذا خالف القوانين (Dismissed)
            if (t.status === 'Dismissed') {
                await supabase.from('action_logs').insert([{
                    moderator_id: moderatorId,
                    target_id: t.roblox_id,
                    action_type: 'Dismissed',
                    reason: `Violated rules during ${sessionType}`
                }]);
            }
        }
        alert(`${sessionType} Finished & Data Saved!`);
        setTrainees([]);
    };

    return (
        <div style={containerStyle}>
            <h2 style={{borderBottom: '2px solid #3498db', paddingBottom: '10px'}}>{sessionType} Management</h2>
            
            {/* خانة إضافة الأعضاء */}
            <input 
                type="text" 
                placeholder="Type Name or ID to add..." 
                onKeyDown={(e) => e.key === 'Enter' && addTrainee(e.target.value)}
                style={inputStyle}
            />

            <div style={listStyle}>
                {trainees.map(t => (
                    <div key={t.roblox_id} style={cardStyle}>
                        <img src={`https://www.roblox.com/headshot-thumbnail/image?userId=${t.roblox_id}&width=48&height=48&format=png`} style={{borderRadius: '50%'}} />
                        <div style={{flex: 1, marginLeft: '10px'}}>
                            <strong>{t.username}</strong>
                            <div style={{fontSize: '12px', color: '#bdc3c7'}}>{t.ranks?.name}</div>
                        </div>

                        {/* Dropdown الترقية الأنيق */}
                        <select 
                            value={t.newRankId} 
                            onChange={(e) => updateTraineeRank(t.roblox_id, e.target.value)}
                            style={dropdownStyle}
                        >
                            <option value={t.current_rank_id}>No Promotion</option>
                            {availableRanks.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>

                        {/* زر المخالفة (Dismissed) */}
                        <button 
                            onClick={() => setTrainees(trainees.map(item => item.roblox_id === t.roblox_id ? {...item, status: 'Dismissed'} : item))}
                            style={t.status === 'Dismissed' ? dismissedActiveStyle : dismissedStyle}
                        >
                            Dismissed
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={finishSession} style={finishButtonStyle}>Finish & Save Session</button>
        </div>
    );
};

// التنسيقات (Styles)
const containerStyle = { background: '#1a1a1a', padding: '25px', borderRadius: '15px', color: 'white' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#333', color: 'white', marginBottom: '20px' };
const listStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const cardStyle = { display: 'flex', alignItems: 'center', background: '#2c3e50', padding: '15px', borderRadius: '10px' };
const dropdownStyle = { background: '#34495e', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', marginRight: '10px' };
const dismissedStyle = { background: 'transparent', border: '1px solid #e74c3c', color: '#e74c3c', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' };
const dismissedActiveStyle = { background: '#e74c3c', border: '1px solid #e74c3c', color: 'white', padding: '5px 10px', borderRadius: '5px' };
const finishButtonStyle = { width: '100%', marginTop: '20px', padding: '15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default SessionManager;