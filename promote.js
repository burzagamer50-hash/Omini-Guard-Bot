window.PromoteModule = () => {
    const [targetId, setTargetId] = React.useState('');
    const [reason, setReason] = React.useState('');
    const [rank, setRank] = React.useState('');

    return (
        <div className="animate-in slide-in-from-right-10 duration-700 space-y-8">
            <div className="panel p-10 border-blue-900/10 bg-gradient-to-b from-[#0a0a0a] to-black">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-600/30">
                        <i className="fa-solid fa-angles-up text-blue-500 text-xl"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-widest text-xl">Rank Advancement Unit</h3>
                        <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Authority_Level: Founder_Override</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* إدخال البيانات */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Target Player (ID/Name)</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-blue-600 transition-all"
                                placeholder="ENTER SPECIFICATIONS..."
                                onChange={(e) => setTargetId(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">New Rank Designation</label>
                            <select 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-blue-600 transition-all appearance-none"
                                onChange={(e) => setRank(e.target.value)}
                            >
                                <option value="">SELECT RANK...</option>
                                <option value="staff">Junior Staff</option>
                                <option value="admin">Administrator</option>
                                <option value="manager">General Manager</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Authorization Reason</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-blue-600 transition-all h-24 resize-none"
                                placeholder="PROVIDE LEGAL GROUNDS FOR PROMOTION..."
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-95 text-[10px] tracking-widest">
                            Execute Promotion Sequence
                        </button>
                    </div>

                    {/* معاينة مباشرة (Preview) */}
                    <div className="panel bg-black/40 border-dashed border-zinc-900 p-8 flex flex-col items-center justify-center text-center">
                        <p className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-6 italic">Live_Preview_Manifest</p>
                        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/5 mb-4 flex items-center justify-center">
                            <i className="fa-solid fa-user text-zinc-800 text-2xl"></i>
                        </div>
                        <p className="text-white font-black text-sm uppercase italic mb-1">{targetId || 'AWAITING_TARGET'}</p>
                        <p className="text-blue-500 font-bold text-[9px] uppercase tracking-widest">{rank || 'NO_RANK_SELECTED'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};