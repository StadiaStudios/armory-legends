/**
 * UpgradesSystem handles the display and purchasing of permanent account upgrades.
 */
const UpgradesSystem = {
    // Define available upgrades here
    definitions: [
        {
            id: 'workersHut',
            name: "Workers Hut",
            description: "A small settlement of loyal workers. $150 every 10 seconds, even while you are away.",
            price: 100000,
            icon: "resources/icons/currency.png"
        },
        {
            id: 'doubleSell',
            name: "Black Market Connections",
            description: "Negotiate better deals. Permanently double all weapon sell prices.",
            price: 225000,
            icon: "resources/icons/currency.png"
        },
        {
            id: 'tripleSell',
            name: "Elite Negotiations", 
            description: "Master level bargaining. Permanently triple all weapon sell prices.",
            price: 300000, 
            icon: "resources/icons/currency.png"
        }
    ],

    /**
     * Helper to get the current sell multiplier based on owned upgrades.
     */
    getSellMultiplier() {
        if (!state.upgrades) return 1;
        if (state.upgrades['tripleSell']) return 3;
        if (state.upgrades['doubleSell']) return 2;
        return 1;
    },

    /**
     * Initializes the upgrade system and handles offline earnings logic
     */
    init() {
        this.processOfflineEarnings();
        
        // Start the active interval for the Workers Hut while the site is open
        setInterval(() => {
            if (state.upgrades && state.upgrades['workersHut']) {
                state.money += 150;
                if (typeof updateStatsUI === 'function') updateStatsUI();
            }
        }, 10000);
    },

    /**
     * Calculates money earned while the user was away
     */
    processOfflineEarnings() {
        if (!state.upgrades || !state.upgrades['workersHut']) return;
        if (!state.lastSaveTime) return;

        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.lastSaveTime) / 1000);
        
        if (elapsedSeconds >= 10) {
            const intervals = Math.floor(elapsedSeconds / 10);
            const earnings = intervals * 150;
            
            state.money += earnings;
            
            if (typeof showToast === 'function') {
                showToast(`OFFLINE INCOME: Your workers earned $${earnings.toLocaleString()} while you were gone!`);
            }
        }
    },

    /**
     * Renders the upgrades screen into the view-upgrades section
     */
    render() {
        const container = document.getElementById('upgrades-list');
        if (!container) return;

        container.innerHTML = this.definitions.map(u => {
            const isOwned = state.upgrades && state.upgrades[u.id];
            const canAfford = state.money >= u.price;
            
            let btnClass = "";
            let btnText = "";
            let btnAction = "";

            if (isOwned) {
                btnClass = "bg-zinc-700 text-zinc-400 cursor-not-allowed border-zinc-600";
                btnText = "ACQUIRED";
                btnAction = "";
            } else if (canAfford) {
                btnClass = "bg-amber-600 hover:bg-amber-500 text-black border-amber-500 hover:scale-105";
                btnText = `BUY $${u.price.toLocaleString()}`;
                btnAction = `UpgradesSystem.buy('${u.id}')`;
            } else {
                btnClass = "bg-zinc-800 text-zinc-500 cursor-not-allowed border-zinc-700";
                btnText = `MISSING FUNDS ($${u.price.toLocaleString()})`;
                btnAction = "";
            }

            return `
            <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-lg relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
                    <img style="width:90px;" src="resources/icons/upgrade.png">
                </div>
                
                <div class="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <h3 class="text-xl font-bold text-amber-500 uppercase tracking-widest mb-2">${u.name}</h3>
                        <p class="text-zinc-400 text-sm mb-6 min-h-[40px]">${u.description}</p>
                    </div>

                    <div class="border-t border-zinc-800 pt-4 mt-auto">
                        <button 
                            onclick="${btnAction}" 
                            class="w-full py-3 px-4 rounded font-bold uppercase tracking-wider border transition-all duration-200 ${btnClass}"
                        >
                            ${btnText}
                        </button>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    },

    buy(upgradeId) {
        const upgrade = this.definitions.find(u => u.id === upgradeId);
        if (!upgrade) return;

        if (!state.upgrades) state.upgrades = {};
        if (state.upgrades[upgradeId]) return;

        if (state.money >= upgrade.price) {
            state.money -= upgrade.price;
            state.upgrades[upgradeId] = true;
            
            if (typeof playPurchase === 'function') playPurchase();
            if (typeof showToast === 'function') showToast(`UPGRADE INSTALLED: ${upgrade.name}`);
            
            if (typeof saveGame === 'function') saveGame();
            if (typeof updateStatsUI === 'function') updateStatsUI();
            
            this.render();
        } else {
            if (typeof showToast === 'function') showToast("INSUFFICIENT FUNDS");
        }
    }
};