window.ShiftsModule = () => {
    const [isOnDuty, setIsOnDuty] = React.useState(false);
    const [timer, setTimer] = React.useState("00:00:00");

    return (
        <div className="animate-in zoom-in-95 duration-700 space-y-8">
            <div className="panel p-10 border-sky-900/20 bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none text-sky-500">
                    <i className="fa-solid fa-stopwatch text-[20rem]"></i>
                </div>

                <div className="flex items-center justify-between mb-12 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-600/10 rounded-xl border border-sky-600/30">
                            <i className="fa-solid fa-business-time text-sky-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-white font-black uppercase italic tracking-[0.3em] text-xl">Staff Duty Rota</h3>
                            <p className="text-[8px] text-sky-900 font-bold uppercase tracking-widest mt-1">Status: Operational_Tracking</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    <div className="flex flex-col justify-center items-center p-10 border border-zinc-900 rounded-3xl bg-zinc-950/30">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] mb-4">Current_Session_Time</p>
                        <h2 className="text-6xl font-black text-white font-mono mb-8 tracking-tighter">{timer}</h2>
                        <button 
                            onClick={() => setIsOnDuty(!isOnDuty)}
                            className={`w-full py-5 rounded-2xl font-black uppercase italic tracking-[0.2em] transition-all ${
                                isOnDuty 
                                ? 'bg-red-600/10 border border-red-600/50 text-red-500 hover:bg-red-600 hover:text-white' 
                                : 'bg-sky-600 text-black hover:bg-sky-400'
                            }`}
                        >
                            {isOnDuty ? 'Terminate_Shift_Protocol' : 'Initialize_Duty_Shift'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest border-l-2 border-sky-600 pl-3">Active_Personnel_On_Duty</p>
                        <div className="space-y-2">
                            {['Admin_Zod', 'Mod_Delta'].map((staff, i) => (
                                <div key={i} className="panel py-3 px-5 bg-zinc-900/50 border-zinc-800 flex justify-between items-center group hover:border-sky-600/30 transition-all">
                                    <span className="text-[10px] text-white font-bold italic">{staff}</span>
                                    <span className="text-[8px] text-sky-500 font-black animate-pulse">ON_DUTY</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};