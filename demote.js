window.DemoteModule = () => {
    const [targetId, setTargetId] = React.useState('');
    const [duration, setDuration] = React.useState('permanent');
    const [reason, setReason] = React.useState('');

    return (
        <div className="animate-in slide-in-from-right-10 duration-700 space-y-8">
            <div className="panel p-10 border-orange-900/10 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
                {/* تأثير خلفية خافت للعقوبة */}
                <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none">
                    <i className="fa-solid fa-angles-down text-[25rem]"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-orange-600/10 rounded-xl border border-orange-600/20">
                        <i className="fa-solid fa-angles-down text-orange-600 text-xl"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-widest text-xl">Rank Demotion Unit</h3>
                        <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Status: Operational_Authority</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        {/* هوية الشخص المستهدف */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Target Identification</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-orange-600/50 transition-all font-bold"
                                placeholder="USERNAME OR ROBLOX_ID..."
                                onChange={(e) => setTargetId(e.target.value)}
                            />
                        </div>

                        {/* نوع التخفيض ومدته */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Penalty Duration</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => setDuration('permanent')}
                                    className={`py-3 rounded-lg text-[9px] font-black uppercase transition-all ${duration === 'permanent' ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)]' : 'bg-zinc-950 text-zinc-600 border border-zinc-900'}`}
                                >
                                    P-Demote (Permanent)
                                </button>
                                <button 
                                    onClick={() => setDuration('temporary')}
                                    className={`py-3 rounded-lg text-[9px] font-black uppercase transition-all ${duration === 'temporary' ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)]' : 'bg-zinc-950 text-zinc-600 border border-zinc-900'}`}
                                >
                                    Temporary Shift
                                </button>
                            </div>
                            {duration === 'temporary' && (
                                <input 
                                    type="text"
                                    className="w-full bg-black border border-zinc-800 rounded-lg p-3 mt-2 text-white text-[10px] outline-none border-dashed focus:border-orange-600"
                                    placeholder="DURATION (e.g. 7 DAYS, 1 MONTH)..."
                                />
                            )}
                        </div>

                        {/* السبب */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Legal Grounds / Reason</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-orange-600/50 transition-all h-24 resize-none"
                                placeholder="DESCRIBE VIOLATION..."
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button className="w-full bg-gradient-to-r from-orange-700 to-orange-900 hover:from-orange-600 hover:to-orange-800 text-white font-black uppercase italic py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(194,65,12,0.15)] active:scale-95 text-[10px] tracking-widest">
                            Confirm Disciplinary Action
                        </button>
                    </div>

                    {/* قسم المعاينة (Preview) */}
                    <div className="panel bg-orange-950/[0.03] border-dashed border-orange-900/20 p-8 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-orange-900/30 flex items-center justify-center">
                                <i className="fa-solid fa-user-slash text-orange-900/20 text-4xl"></i>
                            </div>
                            <div className="absolute inset-0 rounded-full border border-orange-600/10 animate-ping"></div>
                        </div>
                        <p className="text-orange-600 font-black text-sm uppercase italic mb-1 tracking-tighter">
                            {targetId || 'UNKNOWN_SUBJECT'}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="h-1 w-1 bg-orange-600 rounded-full"></span>
                            <p className="text-zinc-600 text-[8px] font-bold uppercase tracking-[0.3em]">
                                Penalty: {duration === 'permanent' ? 'Permanent_Lock' : 'Timed_Suspension'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};