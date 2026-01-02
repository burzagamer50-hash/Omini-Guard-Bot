window.BlacklistModule = () => {
    const [targetId, setTargetId] = React.useState('');
    const [reason, setReason] = React.useState('');

    return (
        <div className="animate-in zoom-in-95 duration-700 space-y-8">
            <div className="panel p-10 border-blue-900/20 bg-gradient-to-tr from-[#050000] to-[#0a0a0a] relative overflow-hidden">
                
                {/* خلفية تقنية (أيقونة القفل العملاقة) */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                    <i className="fa-solid fa-user-lock text-[18rem] text-blue-600"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-600/30">
                        <i className="fa-solid fa-shield-halved text-blue-600 text-xl animate-pulse"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Blacklist Registry Unit</h3>
                        <p className="text-[8px] text-blue-900 font-bold uppercase tracking-widest mt-1">Status: Restricted_Access_Protocol</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* منطقة الإدخال */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Target_Identity</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-blue-600/50 transition-all font-bold placeholder:text-zinc-800"
                                placeholder="USER_ID / USERNAME..."
                                onChange={(e) => setTargetId(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Violation_Details</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-blue-600/50 transition-all font-bold h-24 resize-none placeholder:text-zinc-800"
                                placeholder="SPECIFY REASON FOR PERMANENT BLACKLIST..."
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button className="w-full bg-blue-950/20 hover:bg-blue-600 text-blue-600 hover:text-white font-black uppercase italic py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.1)] active:scale-95 text-[10px] tracking-widest border border-blue-500/30">
                            Confirm Global Blacklist
                        </button>
                    </div>

                    {/* منطقة المعاينة (Preview) بنفس أسلوب البحث الذكي */}
                    <div className="panel bg-blue-950/[0.05] border-dashed border-blue-900/20 p-8 flex flex-col items-center justify-center text-center">
                        <div className="mb-6 text-blue-900 opacity-20">
                            <i className="fa-solid fa-fingerprint text-6xl"></i>
                        </div>
                        <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest mb-4 italic">Registry_Manifest_Preview</p>
                        
                        <div className="space-y-1">
                            <p className="text-white font-black text-xl uppercase italic tracking-tighter">
                                {targetId || 'ID_PENDING'}
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-[1px] w-4 bg-blue-600"></span>
                                <p className="text-blue-500 text-[7px] font-bold uppercase tracking-[0.3em]">Status: To_Be_Voided</p>
                                <span className="h-[1px] w-4 bg-blue-600"></span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/[0.02] w-full">
                            <p className="text-zinc-800 text-[6px] font-black uppercase tracking-widest leading-loose">
                                Warning: Blacklisting will terminate all foundation access rights across all sectors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};