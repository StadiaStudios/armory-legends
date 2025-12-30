/**
 * MarketSystem handles all logic related to buyers and selling.
 * Updated to support the new WeaponRepository system for unique gun/color images.
 */
const MarketSystem = {
    buyers: [
        { id: 1, name: "PMC 'Ironclad'", demand: "accuracy", weight: 1.5, desc: "Require precision instruments for overseas contracts.", color: "#3b82f6" },
        { id: 2, name: "Street Syndicate", demand: "handling", weight: 1.2, desc: "Need fast response and low profile for city ops.", color: "#ef4444" },
        { id: 3, name: "The Collector", demand: "value", weight: 2.0, desc: "Interested in the most expensive, high-quality finishes.", color: "#fbbf24" }
    ],

    /**
     * @param {Array} inventory - The player's inventory
     * @param {Object} repository - The WeaponRepository containing weapon definitions
     */
    render(inventory, repository) {
        const marketContainer = document.getElementById('buyer-list');
        if (!marketContainer) return;

        if (inventory.length === 0) {
            marketContainer.innerHTML = `<div class="col-span-3 text-center py-20 text-zinc-600 font-bold uppercase tracking-widest">WIFI SIGNAL WEAK: Inventory Empty</div>`;
            return;
        }

        marketContainer.innerHTML = this.buyers.map(b => `
            <div class="bg-zinc-900 p-6 rounded-lg neon-border border-l-4" style="border-color: ${b.color}">
                <h3 class="font-bold text-lg mb-1">${b.name}</h3>
                <p class="text-xs text-zinc-500 mb-4 h-12">${b.desc}</p>
                
                <div class="space-y-4 border-t border-zinc-800 pt-4">
                    <div class="text-[10px] uppercase text-zinc-400 font-bold">Encrypted Offers:</div>
                    ${inventory.slice(0, 3).map(w => {
                        const salePrice = this.calculateSalePrice(w, b);
                        
                        // Handle legacy saves vs new modelId system
                        const lookupId = w.modelId || (w.type === 'pistol' ? 'pistol_9mm' : 
                                                      w.type === 'rifle' ? 'rifle_c7' : 
                                                      w.type === 'smg' ? 'smg_vector' : 
                                                      w.type === 'shotgun' ? 'shotgun_breacher' : 'pistol_9mm');
                        
                        // Safely get image from repository
                        const weaponDef = repository[lookupId];
                        const imageSrc = weaponDef ? weaponDef.images[w.skin] : '';

                        return `
                            <div class="flex justify-between items-center bg-zinc-950 p-2 rounded">
                                <div class="flex items-center space-x-2">
                                    <img src="${imageSrc}" class="w-8 h-6 object-cover bg-black rounded p-0.5" alt="icon">
                                    <div>
                                        <div class="text-[9px] font-bold uppercase">${w.name}</div>
                                        <div class="text-[8px] text-zinc-500">$${w.value.toLocaleString()} Base</div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-[10px] text-green-500 font-bold">$${salePrice.toLocaleString()}</div>
                                    <button onclick="sellWeapon(${w.id}, ${b.id})" class="bg-green-600 hover:bg-green-500 text-white px-2 py-1 text-[9px] font-bold rounded mt-1">SELL</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
    },

    calculateSalePrice(weapon, buyer) {
        let multiplier = 1.0;
        if (buyer.demand === 'accuracy') multiplier += (weapon.stats.accuracy / 100) * 0.2;
        if (buyer.demand === 'handling') multiplier += (weapon.stats.handling / 100) * 0.2;
        if (buyer.demand === 'value') multiplier += (weapon.value / 6000) * 0.2;
        
        return Math.floor(weapon.value * multiplier);
    }
};