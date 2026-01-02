// app.js
// يحتوي على: window.RanksModule (logic + UI handlers for ranks manager)
// لا يغيّر أي تصميم أو مفتاح حفظ — فقط يصلّح الأخطاء ويضيف Drag & Drop.

window.RanksModule = ({ ranks, onAddRank, onTogglePerm, onMoveRank }) => {
  const [selectedRankIndex, setSelectedRankIndex] = React.useState(0);
  const [newRankName, setNewRankName] = React.useState('');
  const currentRank = ranks[selectedRankIndex] || ranks[0];

  const colorOptions = [
    'text-yellow-500', 'text-red-600', 'text-red-400', 'text-orange-500',
    'text-blue-500', 'text-cyan-400', 'text-indigo-400', 'text-zinc-200'
  ];

  const permsList = [
    { id: 'p1', label: 'Alts Finder', icon: 'fa-users-viewfinder' },
    { id: 'p2', label: 'Intel Search', icon: 'fa-magnifying-glass-chart' },
    { id: 'p3', label: 'Rank Manager', icon: 'fa-id-card-clip' },
    { id: 'p4', label: 'Blacklist', icon: 'fa-user-lock' },
    { id: 'p5', label: 'Staff Warn', icon: 'fa-shield-heart' },
    { id: 'p6', label: 'User Warnings', icon: 'fa-triangle-exclamation' },
    { id: 'p7', label: 'Kick Authority', icon: 'fa-user-minus' },
    { id: 'p8', label: 'Ban Authority', icon: 'fa-gavel' },
    { id: 'p9', label: 'P-Ban Service', icon: 'fa-skull' },
    { id: 'p10', label: 'Promote Unit', icon: 'fa-angles-up' },
    { id: 'p11', label: 'Demote Unit', icon: 'fa-angles-down' },
    { id: 'p12', label: 'Chat Logs', icon: 'fa-comments' },
    { id: 'p13', label: 'Mod Logs', icon: 'fa-clipboard-list' },
    { id: 'p14', label: 'System Archive', icon: 'fa-box-archive' },
    { id: 'p15', label: 'Full Access', icon: 'fa-crown' }
  ];

  const sectionsOrder = ["SUPER HIGH", "HIGH RANK", "LOWER RANK"];

  // Drag state
  const [dragIndex, setDragIndex] = React.useState(null);

  // Drag handlers
  const handleDragStart = (index, e) => {
    setDragIndex(index);
    try { e.dataTransfer.setData('text/plain', String(index)); } catch (err) {}
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const findInsertIndexForSection = (section) => {
    const indices = ranks.map((r, i) => r.group === section ? i : -1).filter(i => i >= 0);
    if (indices.length > 0) return indices[indices.length - 1] + 1;
    const sectionPos = sectionsOrder.indexOf(section);
    for (let s = sectionPos + 1; s < sectionsOrder.length; s++) {
      const idx = ranks.findIndex(r => r.group === sectionsOrder[s]);
      if (idx !== -1) return idx;
    }
    return ranks.length;
  };

  const handleDropOnRank = (dropIndex, targetGroup) => {
    if (dragIndex === null || typeof dragIndex === 'undefined') return;
    onMoveRank(dragIndex, dropIndex, targetGroup);
    setDragIndex(null);
  };

  const handleDropOnSection = (section) => {
    if (dragIndex === null || typeof dragIndex === 'undefined') return;
    const toIndex = findInsertIndexForSection(section);
    onMoveRank(dragIndex, toIndex, section);
    setDragIndex(null);
  };

  // Helper to compute group when moving up/down by button (keeps behavior you asked for)
  const computeGroupForMove = (index, direction) => {
    // direction: -1 (up) or +1 (down)
    const neighbor = ranks[index + direction];
    if (neighbor) return neighbor.group;
    // no neighbor: decide based on current group's position
    const currGroup = ranks[index] ? ranks[index].group : sectionsOrder[sectionsOrder.length - 1];
    if (direction === -1) { // moving up off top
      if (currGroup === 'LOWER RANK') return 'HIGH RANK';
      if (currGroup === 'HIGH RANK') return 'SUPER HIGH';
      return 'SUPER HIGH';
    } else { // direction === +1 moving down off end
      if (currGroup === 'SUPER HIGH') return 'HIGH RANK';
      if (currGroup === 'HIGH RANK') return 'LOWER RANK';
      return 'LOWER RANK';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
      {/* القائمة اليسرى: نظام الترتيب الموحد للانتقال بين الأقسام */}
      <div className="lg:col-span-4 space-y-6">
        <div className="panel p-6 bg-zinc-950/80 border border-zinc-900 border-t-4 border-t-blue-600 rounded-3xl shadow-2xl">
          <p className="text-[10px] font-black text-zinc-500 mb-6 uppercase tracking-[0.3em] text-center italic">Authority_Reordering_System</p>

          <div
            className="space-y-1 max-h-[60vh] overflow-y-auto custom-scroll pr-2"
            // allow dropping directly on the scroll area to drop into a section (section-level)
            onDragOver={handleDragOver}
          >
            {ranks.map((rank, index) => {
              const showHeader = index === 0 || rank.group !== ranks[index - 1].group;
              return (
                <React.Fragment key={rank.id}>
                  {showHeader && (
                    <h3 className="text-[8px] font-black text-blue-900 mt-6 mb-2 tracking-widest border-l-2 border-blue-900 pl-2 uppercase italic"
                        // allow dropping on header area to move into this section
                        onDragOver={handleDragOver}
                        onDrop={() => handleDropOnSection(rank.group)}
                    >
                      {rank.group}
                    </h3>
                  )}

                  <div
                    onClick={() => setSelectedRankIndex(index)}
                    draggable
                    onDragStart={(e) => handleDragStart(index, e)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropOnRank(index, rank.group)}
                    className={`group/item p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center 
                      ${selectedRankIndex === index ? 'bg-blue-600/10 border-blue-600/40 shadow-lg' : 'bg-black/40 border-zinc-900/50 hover:border-zinc-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1 opacity-0 group-hover/item:opacity-100 transition-all">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveRank(
                              index,
                              index - 1,
                              computeGroupForMove(index, -1)
                            );
                          }}
                          className="hover:text-blue-500 text-[10px]"
                        >
                          <i className="fa-solid fa-caret-up"></i>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveRank(
                              index,
                              index + 1,
                              computeGroupForMove(index, +1)
                            );
                          }}
                          className="hover:text-blue-500 text-[10px]"
                        >
                          <i className="fa-solid fa-caret-down"></i>
                        </button>
                      </div>

                      <p className={`text-[10px] font-black uppercase italic ${rank.color}`}>{rank.name}</p>
                    </div>

                    {selectedRankIndex === index && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]"></div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900">
            <div className="flex gap-2">
              <input
                value={newRankName}
                onChange={(e) => setNewRankName(e.target.value)}
                className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] text-white outline-none focus:border-blue-600 font-bold uppercase italic"
                placeholder="ADD_NEW_RANK..."
              />
              <button
                onClick={() => { if (newRankName.trim()) { onAddRank(newRankName); setNewRankName(''); } }}
                className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-500 transition-all active:scale-95"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* القائمة اليمنى: تعديل الصلاحيات والألوان */}
      <div className="lg:col-span-8">
        <div className="panel p-8 bg-[#050505] border border-zinc-900 min-h-[80vh] rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10">
            <div className="border-b border-zinc-900 pb-8 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-white font-black uppercase italic tracking-widest text-3xl italic">
                  <span className="text-zinc-800 mr-2">/</span><span className={currentRank.color}>{currentRank.name}</span>
                </h2>
                <p className="text-[8px] text-blue-600 font-black uppercase tracking-[0.5em] mt-2 italic">Configuring_Rank_Identity</p>
              </div>

              {/* لوحة تغيير الألوان */}
              <div className="flex gap-2 bg-black/50 p-2 rounded-2xl border border-zinc-900">
                {colorOptions.map(colorClass => (
                  <div
                    key={colorClass}
                    onClick={() => { currentRank.color = colorClass; setSelectedRankIndex(selectedRankIndex); }}
                    className={`w-4 h-4 rounded-full cursor-pointer hover:scale-125 transition-all ${colorClass.replace('text-', 'bg-')}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permsList.map(perm => (
                <div key={perm.id} className="p-4 bg-zinc-950/50 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-blue-600/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black border border-zinc-900 flex items-center justify-center group-hover:border-blue-600/20">
                      <i className={`fa-solid ${perm.icon} text-zinc-700 group-hover:text-blue-600 text-[10px]`}></i>
                    </div>
                    <p className="text-[9px] text-zinc-300 font-black uppercase tracking-tighter italic">{perm.label}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={currentRank.permissions.includes(perm.id)}
                      onChange={() => onTogglePerm(currentRank.id, perm.id)}
                    />
                    <div className="w-8 h-4 bg-zinc-900 border border-zinc-800 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-700 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-white shadow-lg"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

