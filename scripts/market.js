/**
 * MarketSystem handles all logic related to buyers and selling.
 */
const MarketSystem = {
    buyers: [
        { id: 1, name: "PMC 'Ironclad'", demand: "accuracy", bonus: 0.25, desc: "Require precision instruments for overseas contracts.", color: "#3b82f6" },
        { id: 2, name: "Street Syndicate", demand: "handling", bonus: 0.25, desc: "Need fast response and low profile for city ops.", color: "#ef4444" },
        { id: 3, name: "The Collector", demand: "value", bonus: 0.50, desc: "Interested in high-quality finishes and rare finds.", color: "#fbbf24" }
    ],

    lastSellTime: 0,
    cooldownDuration: 10000, 

    render(inventory, repository, upgrades = {}) {
        const marketContainer = document.getElementById('buyer-list');
        if (!marketContainer) return;

        if (inventory.length === 0) {
            marketContainer.innerHTML = `<div class="col-span-3 text-center py-20 text-zinc-600 font-bold uppercase tracking-widest">WIFI SIGNAL WEAK: Inventory Empty</div>`;
            return;
        }

        const now = Date.now();
        const timeElapsed = now - this.lastSellTime;
        const isOnCooldown = timeElapsed < this.cooldownDuration;
        const remainingSec = Math.ceil((this.cooldownDuration - timeElapsed) / 1000);

        // Get the global multiplier once
        const upgradeMultiplier = UpgradesSystem.getSellMultiplier();

        marketContainer.innerHTML = this.buyers.map(b => `
            <div class="bg-zinc-900 p-6 rounded-lg neon-border border-l-4" style="border-color: ${b.color}">
                <h3 class="font-bold text-lg mb-1">${b.name}</h3>
                <p class="text-xs text-zinc-500 mb-4 h-12">${b.desc}</p>
                
                <div class="space-y-4 border-t border-zinc-800 pt-4">
                    <div class="text-[10px] uppercase text-zinc-400 font-bold">Encrypted Offers:</div>
                    ${inventory.slice(0, 3).map(w => {
                        const salePrice = this.calculateSalePrice(w, b, upgrades);
                        
                        const lookupId = w.modelId || 'pistol_9mm';
                        const weaponDef = repository[lookupId];
                        const imageSrc = weaponDef ? weaponDef.images[w.skin] : '';

                        const btnClass = isOnCooldown 
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                            : "bg-green-600 hover:bg-green-500 text-white";

                        const bonusLabel = upgradeMultiplier > 1 
                            ? `<span class="text-amber-500 ml-1 text-[8px] animate-pulse">${upgradeMultiplier}X BONUS</span>` 
                            : '';

                        return `
                            <div class="flex justify-between items-center bg-zinc-950 p-2 rounded">
                                <div class="flex items-center space-x-2">
                                    <img src="${imageSrc}" class="w-8 h-6 object-cover bg-black rounded p-0.5" alt="icon">
                                    <div>
                                        <div class="text-[9px] font-bold uppercase">${w.name} ${bonusLabel}</div>
                                        <div class="text-[8px] text-zinc-500">$${w.value.toLocaleString()} Base</div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-[10px] text-green-500 font-bold">$${salePrice.toLocaleString()}</div>
                                    <button 
                                        onclick="${isOnCooldown ? '' : `sellWeapon(${w.id}, ${b.id})`}" 
                                        class="${btnClass} px-2 py-1 text-[9px] font-bold rounded mt-1 transition-colors min-w-[60px]"
                                    >
                                        ${isOnCooldown ? `WAIT ${remainingSec}s` : 'SELL'}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');

        if (isOnCooldown) {
            setTimeout(() => {
                const marketView = document.getElementById('view-market');
                if (marketView && !marketView.classList.contains('hidden')) {
                    this.render(inventory, repository, upgrades);
                }
            }, 1000);
        }
    },

    calculateSalePrice(weapon, buyer, upgrades = {}) {
        // Start with base multiplier (1.0)
        let buyerMultiplier = 1.0;
        
        // Fixed buyer bonuses instead of value-based division which caused 900k sales
        if (buyer.demand === 'accuracy') buyerMultiplier += (weapon.stats.accuracy / 100) * buyer.bonus;
        if (buyer.demand === 'handling') buyerMultiplier += (weapon.stats.handling / 100) * buyer.bonus;
        if (buyer.demand === 'value') buyerMultiplier += buyer.bonus; // Collector simply gives a flat +50%
        
        // Calculate price based on buyer interest
        let price = Math.floor(weapon.value * buyerMultiplier);

        // Apply Upgrade Multiplier (uses helper to ensure 3x or 2x, never both)
        const upgradeMultiplier = UpgradesSystem.getSellMultiplier();
        price = price * upgradeMultiplier;

        return price;
    }
};