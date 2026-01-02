window.AnalyticsModule = () => {
    // حالة الإحصائيات (مبدئياً أصفار كما طلبت)
    const [stats] = React.useState({
        dailyPlaytime: "0h",
        totalPlaytime: "0h",
        sessions: 0,
        infractions: 0
    });

    const userData = {
        name: "FOUNDER_OPERATOR",
        robloxId: "2603976466", // معرف روبلوكس الخاص بك
        rank: null // سيظهر خطأ الرتبة لأنها فارغة
    };

    return (
        <div className="animate-in fade-in duration-700 space-y-10">
            {/* بطاقة الهوية الذكية */}
            <div className="panel p-8 flex items-center gap-8 border-blue-900/10 shadow-2xl bg-gradient-to-r from-[#0a0a0a] to-transparent">
                <div className="relative group">
                    <img 
                        src={`https://www.roblox.com/headshot-thumbnail/image?userId=${userData.robloxId}&width=150&height=150&format=png`} 
                        className="w-24 h-24 rounded-2xl border-2 border-zinc-900 object-cover shadow-2xl transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 w-6 h-6 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
                        <i className="fa-solid fa-check text-[10px] text-white"></i>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <p className="text-zinc-700 text-[8px] font-black uppercase tracking-[0.4em]">Operator_Profile_Verified</p>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">{userData.name}</h3>
                    <div className="flex items-center gap-3">
                        {userData.rank ? (
                            <span className="text-blue-500 text-[10px] font-bold uppercase italic">{userData.rank}</span>
                        ) : (
                            <div className="flex items-center gap-2 text-red-600 animate-pulse">
                                <i className="fa-solid fa-triangle-exclamation text-[10px]"></i>
                                <span className="text-[10px] font-black uppercase italic">ERROR: NO_RANK_DETECTED</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* شبكة البيانات الرباعية */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Today Playtime" value={stats.dailyPlaytime} icon="fa-clock" color="text-zinc-400" />
                <StatCard label="Total History" value={stats.totalPlaytime} icon="fa-timeline" color="text-zinc-400" />
                <StatCard label="Sessions Attended" value={stats.sessions} icon="fa-calendar-check" color="text-blue-500" />
                <StatCard label="Total Infractions" value={stats.infractions} icon="fa-handcuffs" color="text-red-600" />
            </div>

            {/* نظام التنبيه في حال انعدام البيانات */}
            {stats.sessions === 0 && (
                <div className="p-16 text-center panel border-dashed border-red-900/20 bg-red-950/5 rounded-[30px] shadow-inner">
                    <i className="fa-solid fa-database text-red-900/30 text-4xl mb-6"></i>
                    <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-2">
                        (NO HISTORICAL ANALYTICS FOUND)
                    </p>
                    <p className="text-zinc-800 text-[8px] font-bold uppercase tracking-widest italic">
                        The system has not logged any previous activity for this ID.
                    </p>
                </div>
            )}
        </div>
    );
};

// مكون البطاقة الإحصائية المنفصل
const StatCard = ({ label, value, icon, color }) => (
    <div className="panel p-6 border-zinc-900 hover:border-zinc-800 transition-all group">
        <div className="flex justify-between items-center mb-4">
            <i className={`fa-solid ${icon} text-sm ${color} opacity-50 group-hover:opacity-100 transition-opacity`}></i>
            <span className="text-[6px] font-black text-zinc-800 uppercase tracking-widest italic">Live_Metric</span>
        </div>
        <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">{label}</p>
        <p className="text-2xl font-black text-white italic tracking-tighter">{value}</p>
    </div>
);