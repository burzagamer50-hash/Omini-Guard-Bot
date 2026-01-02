import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const Statistics = ({ myRobloxId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // وظيفة جلب البيانات
        const getMyData = async () => {
            let { data: player } = await supabase
                .from('players')
                .select('*, ranks(*)')
                .eq('roblox_id', myRobloxId)
                .single();
            setData(player);
        };

        getMyData();

        // التحديث اللحظي: إذا تغيرت رتبتك وأنت فاتح الصفحة تتحدث فوراً
        const channel = supabase
            .channel('realtime-stats')
            .on('postgres_changes', 
                { event: 'UPDATE', schema: 'public', table: 'players', filter: `roblox_id=eq.${myRobloxId}` },
                (payload) => {
                    console.log("Rank or stats updated!");
                    getMyData(); // إعادة جلب البيانات فور حدوث تغيير
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [myRobloxId]);

    if (!data) return <p>Loading Statistics...</p>;

    return (
        <div style={{ background: '#1a1a1a', color: 'white', padding: '20px', borderRadius: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* صورة اللاعب من روبلوكس */}
                <img 
                    src={`https://www.roblox.com/headshot-thumbnail/image?userId=${data.roblox_id}&width=150&height=150&format=png`} 
                    style={{ borderRadius: '50%', border: '3px solid #3498db' }}
                />
                <div>
                    <h2 style={{ margin: 0 }}>{data.username}</h2>
                    <h4 style={{ color: '#3498db', margin: '5px 0' }}>{data.ranks?.name || 'No Rank'}</h4>
                    <p>Status: {data.is_rank_locked ? '🔒 Locked' : '🔓 Active'}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                <div className="stat-box">Total Time: {Math.floor(data.total_minutes_played / 60)}h</div>
                <div className="stat-box">Current Level: {Math.floor(data.total_minutes_played / 5)}</div>
            </div>
        </div>
    );
};

export default Statistics;