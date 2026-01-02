window.PbanModule = () => {
    const [targetId, setTargetId] = React.useState('');
    const [evidence, setEvidence] = React.useState('');

    return (
        <div className="animate-in zoom-in-95 duration-700 space-y-8">
            <div className="panel p-10 border-red-900/20 bg-gradient-to-tr from-[#050000] to-[#0a0a0a] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none">
                    <i className="fa-solid fa-skull-crossbones text-[15rem] text-red-600"></i>
                </div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/30">
                        <i className="fa-solid fa-skull text-red-600 text-xl animate-pulse"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">P-Ban Termination Unit</h3>
                        <p className="text-[8px] text-red-900 font-bold uppercase tracking-widest mt-1">Level: Absolute_Zero_Tolerance</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Subject to Terminate</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-red-600/50 transition-all font-bold placeholder:text-zinc-800"
                                placeholder="TARGET_ID / USERNAME..."
                                onChange={(e) => setTargetId(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-2">Evidence Link / Documentation</label>
                            <input 
                                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-white text-xs outline-none focus:border-red-600/50 transition-all font-bold placeholder:text-zinc-800"
                                placeholder="HTTPS://EVIDENCE_URL..."
                                onChange={(e) => setEvidence(e.target.value)}
                            />
                        </div>

                        <button className="w-full bg-red-700 hover:bg-red-600 text-white font-black uppercase italic py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(185,28,28,0.2)] active:scale-95 text-[10px] tracking-widest border border-red-500/30">
                            Execute Permanent Ban
                        </button>
                    </div>

                    <div className="panel bg-red-950/[0.05] border-dashed border-red-900/20 p-8 flex flex-col items-center justify-center text-center">
                        <div className="mb-4 text-red-900 opacity-20"><i className="fa-solid fa-ban text-5xl"></i></div>
                        <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest mb-2">Final_Output_Preview</p>
                        <p className="text-red-600 font-black text-lg uppercase italic tracking-tighter">{targetId || 'NO_TARGET'}</p>
                        <p className="text-[7px] text-zinc-700 font-bold uppercase mt-4">Status: Awaiting_Final_Execution</p>
                    </div>
                </div>
            </div>
        </div>
    );
};