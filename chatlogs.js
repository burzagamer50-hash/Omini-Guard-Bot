window.ChatLogsModule = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    
    // محاكاة بيانات حقيقية بتوقيت UTC دقيق
    const chats = [
        { id: 1, user: "Player_Alpha", msg: "!kick user_02", type: "command", time: "2026-01-01 20:45:12 UTC" },
        { id: 2, user: "Admin_Guardian", msg: "Scanning sector 7 for breaches.", type: "text", time: "2026-01-01 20:46:05 UTC" },
        { id: 3, user: "Shadow_User", msg: "Does anyone have the access codes?", type: "text", time: "2026-01-01 20:47:30 UTC" },
        { id: 4, user: "System_Bot", msg: "!pban exploiter_99", type: "command", time: "2026-01-01 20:48:00 UTC" }
    ];

    // نظام البحث الذكي (اسم، رسالة، أو أمر)
    const filteredChats = chats.filter(chat => 
        chat.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.msg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chat.msg.startsWith('!') && searchQuery.startsWith('!'))
    );

    return (
        <div className="animate-in fade-in zoom-in-95 duration-700 h-[80vh] flex flex-col space-y-4">
            {/* رأس البحث الذكي */}
            <div className="panel p-6 bg-zinc-950/50 border-zinc-900 flex flex-col md:flex-row gap-4 items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
                <div className="flex-1 w-full relative group">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/50 group-focus-within:text-emerald-500 transition-colors"></i>
                    <input 
                        className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-xs text-white outline-none focus:border-emerald-600/50 transition-all font-bold placeholder:text-zinc-700"
                        placeholder="SMART SEARCH: SEARCH BY USER, MESSAGE CONTENT, OR COMMANDS (e.g. !kick)..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 shrink-0 font-mono">
                    <div className="px-3 py-2 bg-zinc-900 rounded text-[8px] text-zinc-500 border border-zinc-800">
                        HITS: <span className="text-emerald-500 font-black">{filteredChats.length}</span>
                    </div>
                    <div className="px-3 py-2 bg-zinc-900 rounded text-[8px] text-zinc-500 border border-zinc-800">
                        TIMEZONE: <span className="text-emerald-500 font-black">UTC+0</span>
                    </div>
                </div>
            </div>

            {/* منطقة النتائج المتطورة */}
            <div className="panel flex-1 bg-[#050505] border-zinc-900/50 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scroll p-2">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-black z-20">
                            <tr className="border-b border-zinc-900">
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] w-48">Timestamp (UTC)</th>
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] w-40">Ident_Subject</th>
                                <th className="p-4 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em]">Transmission_Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {filteredChats.map((chat) => (
                                <tr key={chat.id} className="hover:bg-emerald-600/[0.02] transition-colors group">
                                    <td className="p-4 font-mono text-[9px] text-zinc-500 font-bold whitespace-nowrap">
                                        <i className="fa-regular fa-clock mr-2 opacity-30"></i>
                                        {chat.time}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-900 group-hover:bg-emerald-500 transition-colors"></div>
                                            <span className="text-[10px] text-white font-black italic tracking-tighter uppercase">{chat.user}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                                            chat.msg.startsWith('!') 
                                            ? 'bg-red-950/10 border-red-900/20 text-red-400 font-mono' 
                                            : 'bg-zinc-950/50 border-zinc-900 text-zinc-300'
                                        }`}>
                                            {chat.msg}
                                            {chat.msg.startsWith('!') && <span className="ml-3 text-[6px] bg-red-600 text-black px-1 rounded uppercase font-black">Admin_Command</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* فوتر النظام */}
                <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center">
                    <p className="text-[6px] text-zinc-700 font-black uppercase tracking-[0.5em]">Shadow_Intercept_V3_Active</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[7px] text-emerald-900 font-black uppercase">Monitoring_Live_Traffic</p>
                    </div>
                </div>
            </div>
        </div>
    );
};