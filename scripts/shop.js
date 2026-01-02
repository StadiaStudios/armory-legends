/**
 * ShopSystem updated to respect the 'inShop' flag for limited items.
 */
const ShopSystem = {
    render() {
        const shopContainer = document.getElementById('shop-list');
        if (!shopContainer) return;

        const currentLevel = typeof LevelingSystem !== 'undefined' ? LevelingSystem.state.level : 1;

        // Filter the catalog so only items with inShop: true appear
        const catalog = Object.entries(WeaponRepository)
            .filter(([id, data]) => data.inShop !== false) // This excludes the Xmas Glock
            .map(([id, data]) => ({
                id: id,
                ...data
            }));

        if (catalog.length === 0) {
            shopContainer.innerHTML = '<div class="text-zinc-500">Shop is currently empty.</div>';
            return;
        }

        shopContainer.innerHTML = catalog.map(item => {
            const isLocked = item.tier ? currentLevel < item.tier : false;
            const isBlackMarket = item.isBlackMarket === true;
            
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