import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const searchPlayers = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setIsSearching(true);
            
            // نظام البحث الذكي: يبحث في الأسماء والآيدي
            // ملاحظة: السوبابيس يدعم البحث النصي، والمنطق البرمجي هنا يفلتر النتائج لتناسب الـ 90%
            const { data, error } = await supabase
                .from('players')
                .select('roblox_id, username, ranks(name)')
                .or(`username.ilike.%${query}%, roblox_id.eq.${!isNaN(query) ? query : 0}`)
                .limit(5);

            if (!error) {
                setResults(data);
            }
            setIsSearching(false);
        };

        const timer = setTimeout(() => searchPlayers(), 300); // إعطاء مهلة بسيطة أثناء الكتابة
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            {/* خانة البحث */}
            <input
                type="text"
                placeholder="Search by Name or ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    borderRadius: '25px',
                    border: '2px solid #3498db',
                    background: '#222',
                    color: 'white',
                    outline: 'none'
                }}
            />

            {/* قائمة النتائج (Dropdown) */}
            {results.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '50px',
                    width: '100%',
                    background: '#2c3e50',
                    borderRadius: '10px',
                    zIndex: 9999, // لضمان عدم تداخله مع أي عنصر آخر
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    overflow: 'hidden'
                }}>
                    {results.map((player) => (
                        <div key={player.roblox_id} className="search-item" style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            borderBottom: '1px solid #34495e',
                            cursor: 'pointer',
                            transition: '0.3s'
                        }} onClick={() => window.location.href = `/profile/${player.roblox_id}`}>
                            <img 
                                src={`https://www.roblox.com/headshot-thumbnail/image?userId=${player.roblox_id}&width=48&height=48&format=png`}
                                style={{ borderRadius: '50%', marginRight: '15px' }}
                            />
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'white' }}>{player.username}</div>
                                <div style={{ fontSize: '12px', color: '#bdc3c7' }}>{player.ranks?.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;