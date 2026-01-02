import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const PlayerProfile = ({ targetRobloxId, moderatorId }) => {
    const [player, setPlayer] = useState(null);
    const [alts, setAlts] = useState([]);
    const [showAlts, setShowAlts] = useState(false);

    useEffect(() => {
        fetchFullProfile();
    }, [targetRobloxId]);

    const fetchFullProfile = async () => {
        // 1. جلب بيانات اللاعب الأساسية مع رتبته
        const { data: playerData } = await supabase
            .from('players')
            .select('*, ranks(*)')
            .eq('roblox_id', targetRobloxId)
            .single();
        setPlayer(playerData);

        // 2. جلب الحسابات البديلة (Alts) المرتبطة بهذا اللاعب
        const { data: altsData } = await supabase
            .from('alt_connections')
            .select(`
                match_percentage,
                player2:players!player_id_2 (roblox_id, username)
            `)
            .eq('player_id_1', targetRobloxId);
        setAlts(altsData || []);
    };

    // وظيفة تنفيذ العقوبات (Ban, Kick, Demote)
    const handleAction = async (actionType) => {
        const reason = prompt(`Enter reason for ${actionType}:`);
        if (!reason) return;

        const { error } = await supabase.from('action_logs').insert([{
            moderator_id: moderatorId,
            target_id: targetRobloxId,
            action_type: actionType,
            reason: reason
        }]);

        if (error) {
            alert(`❌ Failed: ${error.message}`);
        } else {
            // تحديث حالة اللاعب ليتم طرده في اللعبة (تأكيد القراءة الإجباري)
            await supabase.from('players').update({ has_unread_action: true }).eq('roblox_id', targetRobloxId);
            alert(`✅ Success: ${actionType} recorded. Player will be kicked to see the reason.`);
            fetchFullProfile();
        }
    };

    if (!player) return <div style={{color: 'white'}}>Loading Intelligence Profile...</div>;

    return (
        <div style={containerStyle}>
            {/* الجزء العلوي: الهوية الشخصية */}
            <div style={headerStyle}>
                <img src={`https://www.roblox.com/headshot-thumbnail/image?userId=${player.roblox_id}&width=150&height=150&format=png`} style={avatarStyle} />
                <div>
                    <h1 style={{margin: 0}}>{player.username}</h1>
                    <span style={rankBadgeStyle}>{player.ranks?.name}</span>
                    <p>Total Playtime: {Math.floor(player.total_minutes_played / 60)}h</p>
                </div>
                
                {/* نسبة البدلاء العامة - تظهر في زاوية البروفايل */}
                <div style={altScoreStyle}>
                    <span style={{fontSize: '12px'}}>Alt Match Probability</span>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#e74c3c'}}>
                        {alts.length > 0 ? Math.max(...alts.map(a => a.match_percentage)) : 0}%
                    </div>
                </div>
            </div>

            {/* أزرار العمليات الإدارية */}
            <div style={actionsContainerStyle}>
                <button onClick={() => handleAction('Ban')} style={banButtonStyle}>Ban</button>
                <button onClick={() => handleAction('Kick')} style={kickButtonStyle}>Kick</button>
                <button onClick={() => handleAction('Demote')} style={demoteButtonStyle}>Demote</button>
                <button onClick={() => setShowAlts(!showAlts)} style={altButtonStyle}>
                    {showAlts ? "Hide Alts" : "View Alts List"}
                </button>
            </div>

            {/* قائمة البدلاء التفصيلية - تظهر عند الضغط على الزر */}
            {showAlts && (
                <div style={altListContainer}>
                    <h3>Linked Accounts (Intelligence Report)</h3>
                    {alts.length > 0 ? alts.map(alt => (
                        <div key={alt.player2.roblox_id} style={altItemStyle}>
                            <img src={`https://www.roblox.com/headshot-thumbnail/image?userId=${alt.player2.roblox_id}&width=48&height=48&format=png`} style={{borderRadius: '50%'}} />
                            <div style={{flex: 1, marginLeft: '10px'}}>
                                <strong>{alt.player2.username}</strong>
                                <div style={{fontSize: '12px', color: '#bdc3c7'}}>ID: {alt.player2.roblox_id}</div>
                            </div>
                            <div style={{color: '#e74c3c', fontWeight: 'bold'}}>{alt.match_percentage}% Match</div>
                        </div>
                    )) : <p>No direct alt links found.</p>}
                </div>
            )}
        </div>
    );
};

// التنسيقات (Styles) - تصميم داكن وفخم
const containerStyle = { background: '#121212', color: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #333' };
const headerStyle = { display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '30px', position: 'relative' };
const avatarStyle = { borderRadius: '50%', border: '4px solid #3498db', boxShadow: '0 0 20px rgba(52, 152, 219, 0.3)' };
const rankBadgeStyle = { background: '#3498db', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' };
const altScoreStyle = { position: 'absolute', right: 0, textAlign: 'center', padding: '15px', background: '#1a1a1a', borderRadius: '15px' };
const actionsContainerStyle = { display: 'flex', gap: '10px', marginBottom: '20px' };
const banButtonStyle = { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' };
const kickButtonStyle = { background: '#d35400', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' };
const demoteButtonStyle = { background: '#7f8c8d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' };
const altButtonStyle = { background: '#2c3e50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' };
const altListContainer = { background: '#1a1a1a', padding: '20px', borderRadius: '15px', marginTop: '20px' };
const altItemStyle = { display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #333' };

export default PlayerProfile;