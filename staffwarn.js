window.StaffWarnModule = () => {
    const [targetId, setTargetId] = React.useState('');
    const [level, setLevel] = React.useState('1');

    return (
        <div className="animate-in zoom-in-95 duration-700 space-y-8">
            <div className="panel p-10 border-purple-900/20 bg-gradient-to-tr from-[#050000] to-[#0a0a0a] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none text-purple-600">
                    <i className="fa-solid fa-shield-heart text-[18rem]"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-purple-600/10 rounded-xl border border-purple-600/30">
                        <i className="fa-solid fa-user-shield text-purple-600 text-xl animate-pulse"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Staff Disciplinary Unit</h3>
                        <p className="text-[8px] text-purple-900 font-bold uppercase tracking-widest mt-1">Classification: Internal_Affairs</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Admin_Identity</label>
                            <input className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-purple-600/50 transition-all font-bold" placeholder="STAFF USERNAME OR ID" onChange={(e)=>setTargetId(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Warning_Level</label>
                            <select className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-purple-600/50 font-bold" onChange={(e)=>setLevel(e.target.value)}>
                                <option value="1">Level 01 - Formal Caution</option>
                                <option value="2">Level 02 - Final Warning</option>
                                <option value="3">Level 03 - Immediate Suspension</option>
                            </select>
                        </div>
                        <button className="w-full bg-purple-950/20 hover:bg-purple-600 text-purple-600 hover:text-white font-black uppercase italic py-4 rounded-xl transition-all border border-purple-500/30 text-[10px] tracking-widest">
                            Issue Staff Sanction
                        </button>
                    </div>
                    
                    <div className="panel bg-purple-950/[0.05] border-dashed border-purple-900/20 p-8 flex flex-col items-center justify-center text-center">
                        <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest mb-4 italic">Internal_Record_Preview</p>
                        <p className="text-white font-black text-xl uppercase italic">{targetId || 'STAFF_ID'}</p>
                        <p className="text-purple-500 text-[7px] font-bold uppercase tracking-[0.3em] mt-2">Strike_Level: {level}/3</p>
                    </div>
                </div>
            </div>
        </div>
    ); 
};