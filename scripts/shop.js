/**
 * ShopSystem handles the catalog of available base weapons.
 * It now pulls dynamically from the WeaponRepository in guns.js.
 */
const ShopSystem = {
    render() {
        const shopContainer = document.getElementById('shop-list');
        if (!shopContainer) return;
/**
 * ShopSystem updated to handle Level Tiers and Black Market visibility.
 */
const ShopSystem = {
    render() {
        const shopContainer = document.getElementById('shop-list');
        if (!shopContainer) return;

        const currentLevel = LevelingSystem.state.level;

        const catalog = Object.entries(WeaponRepository).map(([id, data]) => ({
            id: id,
            ...data
        }));

        shopContainer.innerHTML = catalog.map(item => {
            const isLocked = currentLevel < item.tier;
            const isBlackMarket = item.isBlackMarket === true;
            
            // Hide black market items entirely if player isn't level 10
            if (isBlackMarket && currentLevel < 10) return '';

            return `
                <div class="bg-zinc-900 p-6 rounded-lg neon-border border-t-4 ${isBlackMarket ? 'border-purple-600' : 'border-zinc-700'} overflow-hidden relative group">
                    <div class="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <div class="text-6xl font-bold italic uppercase ${isBlackMarket ? 'text-purple-500' : ''}">${item.type}</div>
                    </div>
                    
                    ${isLocked ? `
                        <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-4">
                            <div class="text-amber-500 font-bold text-xl mb-1">LEVEL ${item.tier} REQUIRED</div>
                            <p class="text-[10px] text-zinc-400 uppercase">Increase your reputation in the market to unlock.</p>
                        </div>
                    ` : ''}

                    <h3 class="text-xl font-bold mb-1 ${isBlackMarket ? 'text-purple-400' : ''}">
                        ${item.name} ${isBlackMarket ? '<span class="text-[10px] bg-purple-900/50 px-1 ml-1 rounded">ILLEGAL</span>' : ''}
                    </h3>
                    <p class="text-[10px] text-zinc-500 mb-6 uppercase tracking-wider">${item.description}</p>
                    
                    <div class="flex justify-between items-center mt-4 border-t border-zinc-800 pt-4">
                        <span class="text-lg font-bold text-amber-500">$${item.price.toLocaleString()}</span>
                        <button 
                            ${isLocked ? 'disabled' : `onclick="buyWeapon('${item.id}')"`}
                            class="${isLocked ? 'bg-zinc-800 text-zinc-600' : 'bg-zinc-100 text-black hover:bg-amber-500'} px-4 py-2 text-xs font-bold uppercase transition-colors"
                        >
                            ${isLocked ? 'LOCKED' : 'PURCHASE'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
};
        // Convert the WeaponRepository object into an array for the shop
        const catalog = Object.entries(WeaponRepository).map(([id, data]) => ({
            id: id,
            ...data
        }));

        shopContainer.innerHTML = catalog.map(item => `
            <div class="bg-zinc-900 p-6 rounded-lg neon-border border-t-4 border-zinc-700 overflow-hidden relative group">
                <div class="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <div class="text-6xl font-bold italic uppercase">${item.type}</div>
                </div>
                <h3 class="text-xl font-bold mb-1">${item.name}</h3>
                <p class="text-[10px] text-zinc-500 mb-6 uppercase tracking-wider">${item.description}</p>
                <div class="flex justify-between items-center mt-4 border-t border-zinc-800 pt-4">
                    <span class="text-lg font-bold text-amber-500">$${item.price.toLocaleString()}</span>
                    <button onclick="buyWeapon('${item.id}')" 
                        class="bg-zinc-100 text-black px-4 py-2 text-xs font-bold uppercase hover:bg-amber-500 transition-colors z-10">
                        Purchase
                    </button>
                </div>
            </div>
        `).join('');
    }
};