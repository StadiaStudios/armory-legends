const SettingsSystem = {
    version: "1.1.1-BETA",

    init() {
        // Load settings from state or localStorage
        if (!state.displayName || state.musicVolume === undefined) {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                state.displayName = data.displayName || "OPERATOR";
                state.musicVolume = data.musicVolume !== undefined ? data.musicVolume : 0.5;
            } else {
                state.displayName = "OPERATOR";
                state.musicVolume = 0.5;
            }
        }
        
        // Apply initial volume
        const m = document.getElementById('bg-music');
        if (m) m.volume = state.musicVolume;

        this.render();
    },

    updateDisplayName(newName) {
        if (!newName || newName.trim() === "") return;
        state.displayName = newName.trim().toUpperCase();
        saveGame();
        this.render();
        const nameDisplay = document.getElementById('player-display-name');
        if (nameDisplay) nameDisplay.innerText = state.displayName;
        showToast("Profile Updated");
    },

    updateVolume(val) {
        const volume = parseFloat(val);
        state.musicVolume = volume;
        const m = document.getElementById('bg-music');
        if (m) m.volume = volume;
        
        const volText = document.getElementById('volume-value');
        if (volText) volText.innerText = `${Math.round(volume * 100)}%`;
        
        saveGame();
    },

    exportSave() {
        try {
            const dataStr = JSON.stringify(state, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `armory_legends.save_${new Date().toISOString().slice(0,10)}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            showToast("Backup Downloaded");
        } catch (e) {
            showToast("Export Failed");
        }
    },

    triggerImport() {
        document.getElementById('import-input').click();
    },

    importSave(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                
                if (importedData.money === undefined || !Array.isArray(importedData.inventory)) {
                    throw new Error("Invalid Save File Format");
                }

                if (confirm("Importing this file will overwrite your current progress. Continue?")) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(importedData));
                    showToast("Import Successful! Reloading...");
                    setTimeout(() => window.location.reload(), 1500);
                }
            } catch (err) {
                showToast("Error: Corrupted or invalid file");
                console.error(err);
            }
        };
        reader.readAsText(file);
    },

    openChangelog() {
        // Placeholder for changelog logic or modal
        showToast("Retrieving Patch Notes...");
    },

    render() {
        const container = document.getElementById('view-settings');
        if (!container) return;

        // Inline style for the cool underline effect
        const styleId = 'settings-custom-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .changelog-link {
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                .changelog-link::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 1px;
                    bottom: -2px;
                    left: 0;
                    background-color: #f59e0b; /* amber-500 */
                    transform-origin: bottom center;
                    transition: transform 0.25s ease-out;
                }
                .changelog-link:hover::after {
                    transform: scaleX(1);
                }
                .changelog-link:hover {
                    color: #f59e0b;
                }
            `;
            document.head.appendChild(style);
        }

        container.innerHTML = `
            <div class="max-w-2xl mx-auto space-y-6">
                <div class="bg-zinc-900 p-6 rounded-lg neon-border">
                    <h2 class="text-amber-500 font-bold uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">System Configuration</h2>
                    
                    <!-- Profile Section -->
                    <div class="mb-8">
                        <label class="text-[10px] uppercase text-zinc-500 font-bold mb-2 block">Display Name</label>
                        <div class="flex gap-2">
                            <input type="text" id="name-input" placeholder="${state.displayName}" 
                                class="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-amber-500 transition-colors uppercase">
                            <button onclick="SettingsSystem.updateDisplayName(document.getElementById('name-input').value)" 
                                class="bg-amber-500 text-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-amber-400 transition-colors">Update</button>
                        </div>
                    </div>

                    <!-- Audio Section -->
                    <div class="mb-8 space-y-4">
                        <div class="p-4 bg-zinc-950 rounded border border-zinc-800 flex justify-between items-center">
                            <div>
                                <div class="text-xs font-bold uppercase">Acoustics</div>
                                <div class="text-[10px] text-zinc-500">System music and interface feedback</div>
                            </div>
                            <button onclick="toggleMusic()" id="music-toggle-settings" 
                                class="text-xs font-bold uppercase p-2 border border-zinc-700 hover:border-amber-500 transition-colors">
                                Toggle Audio: ${state.isMusicOn ? 'On' : 'Off'}
                            </button>
                        </div>

                        <div class="p-4 bg-zinc-950 rounded border border-zinc-800">
                            <div class="flex justify-between items-center mb-4">
                                <label class="text-[10px] uppercase text-zinc-500 font-bold">Music Volume</label>
                                <span id="volume-value" class="text-xs font-mono text-amber-500">${Math.round((state.musicVolume || 0.5) * 100)}%</span>
                            </div>
                            <input type="range" min="0" max="1" step="0.01" value="${state.musicVolume || 0.5}" 
                                oninput="SettingsSystem.updateVolume(this.value)"
                                class="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500">
                        </div>
                    </div>

                    <!-- Backup Section -->
                    <div class="mb-8 p-4 bg-zinc-950 rounded border border-zinc-800">
                        <h3 class="text-xs font-bold uppercase mb-2">Data Management</h3>
                        <p class="text-[10px] text-zinc-500 mb-4">Export your progress to a local file for safe keeping or to transfer between devices.</p>
                        <div class="grid grid-cols-2 gap-4">
                            <button onclick="SettingsSystem.exportSave()" 
                                class="py-2 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase hover:border-amber-500 hover:text-amber-500 transition-all">
                                Download Backup
                            </button>
                            <button onclick="SettingsSystem.triggerImport()" 
                                class="py-2 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase hover:border-amber-500 hover:text-amber-500 transition-all">
                                Import Save File
                            </button>
                            <input type="file" id="import-input" class="hidden" accept=".json" onchange="SettingsSystem.importSave(event)">
                        </div>
                    </div>

                    <!-- Meta Section -->
                    <div class="pt-6 border-t border-zinc-800 space-y-4">
                        <div class="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-500">
                            <div class="flex flex-col gap-1">
                                <span>Build Version</span>
                                <a href="changelog.txt" onclick="SettingsSystem.openChangelog()" class="changelog-link text-zinc-400 normal-case tracking-normal">
                                    View full changelog
                                </a>
                            </div>
                            <span class="text-zinc-300 font-mono">${this.version}</span>
                        </div>
                        
                        <div class="p-4 border border-red-900/30 bg-red-950/10 rounded">
                            <h3 class="text-red-500 text-[10px] font-bold uppercase mb-2">Danger Zone</h3>
                            <p class="text-[10px] text-zinc-500 mb-4">Wiping data will permanently delete your progress. This cannot be undone.</p>
                            <button onclick="resetGame()" 
                                class="w-full py-2 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all">
                                Reset Progress
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Hook into global toggle
const originalToggleMusic = window.toggleMusic;
window.toggleMusic = function() {
    if (originalToggleMusic) originalToggleMusic();
    const btn = document.getElementById('music-toggle-settings');
    if (btn) btn.innerText = `Toggle Audio: ${state.isMusicOn ? 'On' : 'Off'}`;
};