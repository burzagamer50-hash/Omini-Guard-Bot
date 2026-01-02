window.KickModule = () => {
    const [targetName, setTargetName] = React.useState('');
    const [reason, setReason] = React.useState('');

    return (
        <div className="animate-in slide-in-from-right-10 duration-700 space-y-8">
            <div className="panel p-10 border-yellow-900/20 bg-gradient-to-tr from-[#050000] to-[#0a0a0a] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none text-yellow-600">
                    <i className="fa-solid fa-boot text-[18rem]"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-yellow-600/10 rounded-xl border border-yellow-600/30">
                        <i className="fa-solid fa-user-slash text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Field Kick Unit</h3>
                        <p className="text-[8px] text-yellow-900 font-bold uppercase tracking-widest mt-1">Operation: Server_Purge</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Target_Username</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-yellow-600/50 transition-all font-bold placeholder:text-zinc-800"
                                placeholder="ENTER USERNAME OR ID" 
                                onChange={(e) => setTargetName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Expulsion_Reason</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-yellow-600/50 transition-all font-bold h-24 resize-none placeholder:text-zinc-800"
                                placeholder="WHY IS THIS USER BEING KICKED?..."
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button className="w-full bg-yellow-600/10 hover:bg-yellow-600 text-yellow-600 hover:text-white font-black uppercase italic py-4 rounded-xl transition-all border border-yellow-500/30 text-[10px] tracking-widest">
                            Confirm & Execute Kick
                        </button>
                    </div>

                    <div className="panel bg-yellow-950/[0.05] border-dashed border-yellow-900/20 p-8 flex flex-col items-center justify-center text-center">
                        <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest mb-4 italic">Action_Summary</p>
                        <p className="text-white font-black text-xl uppercase italic tracking-tighter">{targetName || 'AWAITING_USER'}</p>
                        <p className="text-yellow-600 text-[7px] font-bold uppercase tracking-[0.3em] mt-2">Reason: {reason || 'No reason specified'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 