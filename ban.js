window.BanModule = () => {
    const [target, setTarget] = React.useState('');
    const [duration, setDuration] = React.useState('24h');
    const [reason, setReason] = React.useState('');

    return (
        <div className="animate-in slide-in-from-bottom-10 duration-700 space-y-8">
            <div className="panel p-10 border-red-900/20 bg-[#050505] relative overflow-hidden">
                
                {/* زخرفة خلفية: علامة خطر عملاقة */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none text-red-600">
                    <i className="fa-solid fa-gavel text-[20rem]"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10 border-b border-red-900/20 pb-6">
                    <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/30">
                        <i className="fa-solid fa-gavel text-red-600 text-xl animate-pulse"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Sanction Execution Center</h3>
                        <p className="text-[8px] text-red-900 font-bold uppercase tracking-widest mt-1">Status: Authorized_Personnel_Only</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    {/* الجانب الأيسر: الإدخال */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Subject_Identity</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-red-600/50 transition-all font-bold placeholder:text-zinc-800"
                                placeholder="USERNAME OR ID..."
                                onChange={(e) => setTarget(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Suspension_Duration</label>
                            <select 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-[10px] outline-none focus:border-red-600/50 font-black uppercase tracking-widest"
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <option value="1h">01 Hour (Light Penalty)</option>
                                <option value="24h">24 Hours (Standard)</option>
                                <option value="7d">07 Days (Severe)</option>
                                <option value="30d">30 Days (Maximum)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Violation_Evidence</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs h-24 outline-none focus:border-red-600/50 font-bold resize-none placeholder:text-zinc-800"
                                placeholder="STATE THE REASON FOR SUSPENSION..."
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button className="w-full bg-red-950/20 hover:bg-red-600 text-red-600 hover:text-white font-black uppercase italic py-4 rounded-xl transition-all border border-red-500/30 text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.1)] active:scale-95">
                            Execute Ban Protocol
                        </button>
                    </div>

                    {/* الجانب الأيمن: بطاقة الحكم (Judgment Card) */}
                    <div className="panel bg-red-950/[0.03] border-dashed border-red-900/30 p-8 flex flex-col justify-between border-r-4 border-r-red-600">
                        <div>
                            <p className="text-red-600 text-[8px] font-black uppercase tracking-[0.4em] mb-8 italic">Court_Manifest</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <p className="text-zinc-600 text-[7px] uppercase font-bold mb-1">Target</p>
                                    <p className="text-white font-black text-xl italic tracking-tighter uppercase">{target || 'UNKNOWN'}</p>
                                </div>

                                <div>
                                    <p className="text-zinc-600 text-[7px] uppercase font-bold mb-1">Duration</p>
                                    <p className="text-red-500 font-black text-lg italic uppercase">{duration}</p>
                                </div>

                                <div className="pt-4 border-t border-white/[0.02]">
                                    <p className="text-zinc-600 text-[7px] uppercase font-bold mb-1">Reason</p>
                                    <p className="text-zinc-400 text-[10px] font-bold italic leading-relaxed">
                                        {reason || 'Awaiting evidence input...'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-between">
                            <p className="text-[6px] text-zinc-700 font-bold uppercase tracking-[0.3em]">Justice_Core_V2</p>
                            <i className="fa-solid fa-stamp text-red-900 opacity-20 text-2xl rotate-12"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};