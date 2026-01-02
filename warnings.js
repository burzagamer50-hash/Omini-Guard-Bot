window.WarningsModule = () => {
    const [targetInfo, setTargetInfo] = React.useState('');
    const [reason, setReason] = React.useState('');

    return (
        <div className="animate-in fade-in duration-700 space-y-8">
            <div className="panel p-10 border-orange-900/20 bg-gradient-to-tr from-[#050000] to-[#0a0a0a] relative overflow-hidden">
                
                {/* أيقونة خلفية زخرفية */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none text-orange-600">
                    <i className="fa-solid fa-triangle-exclamation text-[15rem]"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-orange-600/10 rounded-xl border border-orange-600/30">
                        <i className="fa-solid fa-triangle-exclamation text-orange-600 text-xl animate-bounce"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Civil Warning System</h3>
                        <p className="text-[8px] text-orange-900 font-bold uppercase tracking-widest mt-1">Protocol: Behavior_Correction</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    {/* منطقة الإدخال - معدلة لتملأ الفراغ */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Subject_Identity</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-orange-600/50 transition-all font-bold placeholder:text-zinc-800" 
                                placeholder="ENTER USERNAME OR ID..." 
                                onChange={(e) => setTargetInfo(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Violation_Reason</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs h-32 outline-none focus:border-orange-600/50 font-bold resize-none placeholder:text-zinc-800" 
                                placeholder="DESCRIBE THE OFFENSE IN DETAIL..."
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button className="w-full bg-orange-950/20 hover:bg-orange-600 text-orange-600 hover:text-white font-black uppercase italic py-4 rounded-xl transition-all border border-orange-500/30 text-[10px] tracking-[0.2em] active:scale-[0.98]">
                            Issue Official Warning
                        </button>
                    </div>

                    {/* منطقة المعاينة - متناسقة مع المدخلات */}
                    <div className="panel bg-orange-950/[0.05] border-dashed border-orange-900/20 p-8 flex flex-col justify-center border-l-4 border-l-orange-600 relative">
                        <p className="text-orange-600 text-[8px] font-black uppercase tracking-[0.4em] mb-6 italic">Record_Preview</p>
                        
                        <div className="space-y-6">
                            <div>
                                <p className="text-zinc-600 text-[7px] uppercase font-bold mb-1">Target_Subject</p>
                                <p className="text-white font-black text-xl italic tracking-tighter truncate">
                                    {targetInfo || 'PENDING_INPUT'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/[0.02]">
                                <p className="text-zinc-600 text-[7px] uppercase font-bold mb-1">Incident_Report</p>
                                <p className="text-zinc-400 text-[10px] font-bold italic leading-relaxed">
                                    {reason || 'Awaiting violation details for the official log...'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-2 opacity-30">
                            <div className="h-1 w-1 rounded-full bg-orange-600"></div>
                            <p className="text-[6px] text-zinc-500 font-bold uppercase tracking-widest font-mono">Status: Awaiting_Execution</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};