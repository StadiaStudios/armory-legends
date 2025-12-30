/**
 * ShopSystem handles the catalog of available base weapons.
 * It now pulls dynamically from the WeaponRepository in guns.js.
 */
const ShopSystem = {
    render() {
        const shopContainer = document.getElementById('shop-list');
        if (!shopContainer) return;

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