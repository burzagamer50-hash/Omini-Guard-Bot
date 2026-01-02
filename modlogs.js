window.ModLogsModule = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    // محاكاة بيانات السجلات الإدارية بتوقيت UTC دقيق
    const logs = [
        { id: 1, admin: "FOUNDER_OMNI", action: "P-BAN", target: "Exploiter_01", reason: "Using External Scripts", time: "2026-01-01 21:15:33 UTC" },
        { id: 2, admin: "ADMIN_ZOD", action: "KICK", target: "Spammer_99", reason: "Flooding Chat", time: "2026-01-01 21:20:05 UTC" },
        { id: 3, admin: "MOD_DELTA", action: "WARN", target: "Player_Alpha", reason: "Disrespectful Behavior", time: "2026-01-01 21:45:12 UTC" },
        { id: 4, admin: "SYSTEM", action: "BLACKLIST", target: "Malicious_IP_07", reason: "Security Breach Attempt", time: "2026-01-01 22:00:00 UTC" }
    ];

    // نظام البحث الذكي (بحث باسم المسؤول، الهدف، أو نوع الإجراء)
    const filteredLogs = logs.filter(log => 
        log.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // دالة لتلوين نوع الإجراء حسب خطورته
    const getActionStyle = (action) => {
        if (['P-BAN', 'BLACKLIST'].includes(action)) return 'bg-red-950/20 border-red-900/40 text-red-500';
        if (action === 'KICK') return 'bg-yellow-950/20 border-yellow-900/40 text-yellow-500';
        if (action === 'WARN') return 'bg-orange-950/20 border-orange-900/40 text-orange-500';
        return 'bg-zinc-900 border-zinc-800 text-zinc-400';
    };

    return (
        <div className="animate-in fade-in zoom-in-95 duration-700 h-[80vh] flex flex-col space-y-4">
            {/* رأس البحث الإداري */}
            <div className="panel p-6 bg-zinc-950/50 border-zinc-900 flex flex-col md:flex-row gap-4 items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                <div className="flex-1 w-full relative group">
                    <i className="fa-solid fa-shield-halved absolute left-4 top-1/2 -translate-y-1/2 text-blue-600/50 group-focus-within:text-blue-500 transition-colors"></i>
                    <input 
                        className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-xs text-white outline-none focus:border-blue-600/50 transition-all font-bold placeholder:text-zinc-700"
                        placeholder="ADMIN SEARCH: FILTER BY ADMIN, TARGET, ACTION OR REASON..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 shrink-0 font-mono">
                    <div className="px-3 py-2 bg-zinc-900 rounded text-[8px] text-zinc-500 border border-zinc-800">
                        ACTIONS: <span className="text-blue-500 font-black">{filteredLogs.length}</span>
                    </div>
                    <div className="px-3 py-2 bg-zinc-900 rounded text-[8px] text-zinc-500 border border-zinc-800">
                        TIMEZONE: <span className="text-blue-500 font-black">UTC+0</span>
                    </div>
                </div>
            </div>

            {/* سجل العمليات الإدارية */}
            <div className="panel flex-1 bg-[#050505] border-zinc-900/50 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scroll p-2">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-black z-20">
                            <tr className="border-b border-zinc-900">
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] w-48">Execution_Time (UTC)</th>
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] w-40">Admin_Operator</th>
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] w-32">Action_Type</th>
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] w-40">Target_Subject</th>
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em]">Sanction_Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-blue-600/[0.02] transition-colors group">
                                    <td className="p-4 font-mono text-[9px] text-zinc-500 font-bold whitespace-nowrap">
                                        {log.time}
                                    </td>
                                    <td className="p-4">
                                        <span className="text-[10px] text-white font-black italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                                            {log.admin}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[7px] font-black border tracking-widest ${getActionStyle(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase">{log.target}</span>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-[9px] text-zinc-500 italic font-medium uppercase truncate max-w-xs">
                                            {log.reason}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* فوتر سجلات المودز */}
                <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center">
                    <p className="text-[6px] text-zinc-700 font-black uppercase tracking-[0.5em]">Admin_Protocol_Log_V4</p>
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-lock text-[8px] text-blue-900"></i>
                        <p className="text-[7px] text-zinc-600 font-black uppercase">Immutable_Audit_Trail</p>
                    </div>
                </div>
            </div>
        </div>
    );
};