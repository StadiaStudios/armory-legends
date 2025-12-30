/**
 * Navbar Component for Underground Armory Simulator
 * Handles responsive navigation and mobile hamburger menu.
 */

const Navbar = {
    init() {
        this.render();
        this.setupEventListeners();
    },

    render() {
        const headerHTML = `
            <header class="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4 relative">
                <div>
                    <div class="flex items-center gap-4">
                        <h1 class="text-2xl md:text-3xl font-bold tracking-tighter text-zinc-100 uppercase">
                            Armory <span class="text-amber-500">Legends</span>
                        </h1>
                        <button id="music-toggle" onclick="toggleMusic()" class="hidden md:block text-[10px] border border-zinc-700 px-2 py-1 rounded hover:bg-zinc-800 uppercase transition-colors">
                            Audio: Off
                        </button>
                    </div>
                    <p class="text-[10px] md:text-xs text-zinc-500 mt-1 italic hidden sm:block">Est. 1994 - Discreet Supply & Customization</p>
                </div>

                <div class="flex items-center gap-6">
                    <div class="text-right">
                        <div class="text-xl md:text-2xl font-bold text-green-500">$<span id="player-money">0</span></div>
                        <div class="text-[9px] md:text-xs text-zinc-400 uppercase tracking-widest">Available Funds</div>
                    </div>
                    
                    <!-- Mobile Hamburger -->
                    <button id="mobile-menu-btn" class="md:hidden text-zinc-100 p-2 border border-zinc-800 rounded">
                        <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                <!-- Mobile Dropdown -->
                <div id="mobile-dropdown" class="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-800 z-[100] hidden flex-col p-4 space-y-4 shadow-2xl">
                    <button onclick="Navbar.navigate('workshop')" class="text-left text-sm font-bold uppercase tracking-widest hover:text-amber-500 py-2 border-b border-zinc-800">Workshop</button>
                    <button onclick="Navbar.navigate('market')" class="text-left text-sm font-bold uppercase tracking-widest hover:text-amber-500 py-2 border-b border-zinc-800">Marketplace</button>
                    <button onclick="Navbar.navigate('shop')" class="text-left text-sm font-bold uppercase tracking-widest hover:text-amber-500 py-2 border-b border-zinc-800">Gun Store</button>
                    <button onclick="toggleMusic()" class="text-left text-[10px] hover:text-gray-300 uppercase text-zinc-500 pt-2">Toggle Audio</button>
                </div>
            </header>

            <nav id="desktop-nav" class="hidden md:flex space-x-8 mb-8 text-sm font-bold uppercase tracking-widest border-b border-zinc-800">
                <button onmouseenter="playHover()" onclick="switchTab('workshop')" id="tab-workshop" class="pb-2 tab-active hover:text-amber-500">Workshop</button>
                <button onmouseenter="playHover()" onclick="switchTab('market')" id="tab-market" class="pb-2 text-zinc-500 hover:text-amber-500">Marketplace</button>
                <button onmouseenter="playHover()" onclick="switchTab('shop')" id="tab-shop" class="pb-2 text-zinc-500 hover:text-amber-500">Gun Store</button>
            </nav>
        `;
        
        document.getElementById('nav-container').innerHTML = headerHTML;
    },

    setupEventListeners() {
        const btn = document.getElementById('mobile-menu-btn');
        const dropdown = document.getElementById('mobile-dropdown');
        
        btn.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
            dropdown.classList.toggle('flex');
        });

        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
                dropdown.classList.remove('flex');
            }
        });
    },

    navigate(tab) {
        switchTab(tab);
        document.getElementById('mobile-dropdown').classList.add('hidden');
        document.getElementById('mobile-dropdown').classList.remove('flex');
    }
};

// Initialize after DOM load
window.addEventListener('DOMContentLoaded', () => Navbar.init());