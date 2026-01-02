window.TrainingModule = () => {
    return (
        <div className="animate-in slide-in-from-bottom-10 duration-700 space-y-8">
            <div className="panel p-10 border-yellow-900/20 bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none text-yellow-600">
                    <i className="fa-solid fa-graduation-cap text-[20rem]"></i>
                </div>

                <div className="flex items-center gap-4 mb-12 relative z-10">
                    <div className="p-3 bg-yellow-600/10 rounded-xl border border-yellow-600/30">
                        <i className="fa-solid fa-chalkboard-user text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Training & Evaluation</h3>
                        <p className="text-[8px] text-yellow-900 font-bold uppercase tracking-widest mt-1">Process: Elite_Personnel_Growth</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <input className="bg-black border border-zinc-900 p-4 rounded-xl text-xs text-white outline-none focus:border-yellow-600/50" placeholder="TRAINER_NAME" />
                            <input className="bg-black border border-zinc-900 p-4 rounded-xl text-xs text-white outline-none focus:border-yellow-600/50" placeholder="TRAINEE_NAME" />
                        </div>
                        <select className="w-full bg-black border border-zinc-900 p-4 rounded-xl text-xs text-white font-bold uppercase tracking-widest">
                            <option>Phase 01: Foundation Basics</option>
                            <option>Phase 02: Advanced Mod Tools</option>
                            <option>Phase 03: Crisis Management</option>
                        </select>
                        <button className="w-full bg-yellow-600 text-black font-black uppercase italic py-4 rounded-xl hover:bg-yellow-500 transition-all text-xs tracking-[0.3em]">
                            Submit Training Report
                        </button>
                    </div>

                    <div className="panel bg-yellow-950/10 border-yellow-900/20 p-6 flex flex-col items-center justify-center text-center">
                        <i className="fa-solid fa-award text-4xl text-yellow-600 mb-4"></i>
                        <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-2">Current_Session_Status</p>
                        <p className="text-white font-black text-xl italic uppercase">Awaiting_Input</p>
                    </div>
                </div>
            </div>
        </div>
    );
};