window.SearchModule = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    // في المستقبل، سيتم ربط هذه المصفوفة بـ Supabase
    const [results] = React.useState([]); 

    return (
        <div className="animate-in slide-in-from-bottom-10 duration-1000 space-y-8">
            {/* حاوية البحث الرئيسية */}
            <div className="panel p-12 bg-gradient-to-br from-[#0a0a0a] to-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden border-zinc-900">
                
                {/* خلفية تقنية خفيفة */}
                <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
                    <i className="fa-solid fa-bolt-lightning text-[15rem]"></i>
                </div>

                <div className="flex items-center gap-6 mb-12 relative z-10">
                    <div className="w-16 h-16 bg-blue-600/10 flex items-center justify-center rounded-[22px] border border-blue-600/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                        <i className="fa-solid fa-satellite-dish text-blue-600 text-3xl animate-pulse"></i>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase italic tracking-[0.4em] text-2xl">Deep Intelligence Probe</h3>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.6em] mt-1 italic">Authorized_Founder_Access_Only</p>
                    </div>
                </div>

                {/* حقل الإدخال المتطور */}
                <div className="relative group z-10">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                        <i className="fa-solid fa-terminal text-zinc-800 group-focus-within:text-blue-600 transition-all text-sm"></i>
                        <span className="text-[10px] text-zinc-900 font-black group-focus-within:text-blue-900/50 transition-all tracking-tighter">OS_QUERY:</span>
                    </div>
                    <input 
                        type="text"
                        className="w-full bg-black border border-zinc-900 rounded-2xl p-6 pl-32 text-white outline-none focus:border-blue-600/50 transition-all shadow-inner placeholder:text-zinc-900 font-bold text-sm tracking-wider" 
                        placeholder="SCANNING DATABASE FOR TARGET SPECIFICATIONS (ID / NAME)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* نظام عرض الخطأ (يظهر فقط عند البحث وعدم وجود نتائج) */}
                {searchQuery && results.length === 0 && (
                    <div className="mt-12 p-24 text-center border-2 border-dashed border-red-900/10 rounded-[40px] bg-red-950/5 animate-in zoom-in-95 duration-500 relative overflow-hidden">
                        {/* تأثير بصري للخطأ */}
                        <div className="absolute inset-0 bg-red-600/[0.01] animate-pulse"></div>
                        
                        <div className="relative z-10">
                            <div className="mb-8">
                                <i className="fa-solid fa-triangle-exclamation text-red-900 text-6xl mb-4 drop-shadow-[0_0_20px_rgba(153,27,27,0.5)] animate-bounce"></i>
                            </div>
                            <h4 className="text-red-600 text-sm font-black uppercase tracking-[0.8em] leading-relaxed mb-4">
                                (NO DATA FOUND IN OMNI-RECORDS)
                            </h4>
                            <div className="flex justify-center items-center gap-4 text-zinc-800">
                                <span className="h-[1px] w-12 bg-zinc-900"></span>
                                <p className="text-[9px] font-bold uppercase tracking-[0.3em] italic">
                                    System_Status: Target_Missing_From_Cluster
                                </p>
                                <span className="h-[1px] w-12 bg-zinc-900"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ذيل الصفحة (Footer) */}
            <div className="flex justify-between items-center px-10 opacity-20">
                <p className="text-[7px] font-black uppercase tracking-[1em] text-white italic">Quantum_Search_Active</p>
                <p className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-500">Node_04_Secured</p>
            </div>
        </div>
    );
};