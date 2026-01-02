const RankManagerView = ({ players, onAction }) => {
        const [duration, setDuration] = useState({}); // لتخزين المدة لكل لاعب بشكل منفصل

        const handleInputChange = (id, value) => {
            setDuration(prev => ({ ...prev, [id]: value }));
        };

        return (
            <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">Authority Console</h2>
                <div className="space-y-4">
                    {players.map(p => (
                        <div key={p.roblox_id} className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
                            <div className="flex items-center gap-4">
                                <img src={`https://www.roblox.com/headshot-thumbnail/image?userId=${p.roblox_id}&width=48&height=48&format=png`} className="w-12 h-12 rounded-full border border-zinc-700 group-hover:border-blue-500" />
                                <div>
                                    <p className="font-bold text-white">{p.username}</p>
                                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{p.ranks?.name || 'Recruit'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* حقل المدة الذكي */}
                                <input 
                                    type="text" 
                                    placeholder="Days or 'P'" 
                                    className="bg-black border border-zinc-800 rounded-lg px-3 py-2 text-[10px] w-24 focus:border-blue-500 outline-none uppercase font-bold text-center"
                                    onChange={(e) => handleInputChange(p.roblox_id, e.target.value)}
                                />
                                
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => onAction(p.roblox_id, 'PROMOTE', duration[p.roblox_id])}
                                        className="bg-blue-600 hover:bg-blue-500 text-[10px] font-black px-4 py-2 rounded-lg uppercase transition-colors"
                                    >
                                        Promote
                                    </button>
                                    <button 
                                        onClick={() => onAction(p.roblox_id, 'DEMOTE', duration[p.roblox_id])}
                                        className="bg-red-600/20 text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase transition-all"
                                    >
                                        Demote
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };