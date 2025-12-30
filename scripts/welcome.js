(function() {
const WELCOME_STORAGE_KEY = 'armory_legends_first_time';

const welcomeModalHTML = `
    <div id="welcome-modal" class="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <div class="max-w-md w-full bg-zinc-900 border border-amber-500/50 p-8 rounded-lg shadow-[0_0_50px_rgba(251,191,36,0.1)] text-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            
            <img src="resources/icons/marketplace.png" class="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-zinc-800" onerror="this.src='https://via.placeholder.com/80?text=ARMORY'">
            
            <h1 class="text-2xl font-bold text-amber-500 uppercase tracking-tighter mb-2">Welcome, Operator</h1>
            <p class="text-zinc-400 text-sm mb-6 leading-relaxed">
                The underworld market is now open to you. We've credited your account with <span class="text-green-500 font-bold">$1,000</span>.
            </p>
            
            <div class="bg-black/40 border border-zinc-800 p-4 rounded text-left mb-8">
                <h3 class="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-widest">Initial Objectives:</h3>
                <ul class="text-xs space-y-2 text-zinc-300">
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        Access the <span class="text-amber-500 font-bold">Gun Store</span> tab
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        Acquire a <span class="text-white font-bold">9MM Pistol</span> ($350)
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        Visit the <span class="text-amber-500 font-bold">WORKSHOP</span> to install upgrades
                    </li>
                </ul>
            </div>
            
            <button id="close-welcome" class="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase text-xs tracking-[0.2em] transition-all active:scale-95">
                Initialize System
            </button>
        </div>
    </div>
`;

function showWelcome() {
    const hasVisited = localStorage.getItem(WELCOME_STORAGE_KEY);
    if (!hasVisited) {
        document.body.insertAdjacentHTML('beforeend', welcomeModalHTML);
        
        document.getElementById('close-welcome').addEventListener('click', () => {
            const modal = document.getElementById('welcome-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.remove();
                localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
            }, 300);
        });
    }
}

// Run check after a short delay for visual impact
window.addEventListener('load', () => {
    setTimeout(showWelcome, 1000);
});


})();