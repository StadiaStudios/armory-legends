/**
 * WEAPON REPOSITORY
 * * This file contains the definitions for every gun in the game.
 * Each gun has its own stats, price, and a specific image for EVERY color/skin.
 * * To add a new gun:
 * 1. Add a new key (e.g., 'sniper_m40')
 * 2. Fill in the name, price, description, and stats
 * 3. Provide an image URL for every color in the 'images' object
 */

const WeaponRepository = {
    'pistol_9mm': {
        name: "Standard 9mm",
        type: "Pistol",
        price: 350,
        description: "Reliable, mass-produced sidearm. High handling, low impact.",
        stats: { accuracy: 40, durability: 60, handling: 80 },
        images: {
            charcoal: "resources/weapons/pistols/standard-9mm/charcoal.png",
            navy: "resources/weapons/pistols/standard-9mm/navy.png",
            gold: "resources/weapons/pistols/standard-9mm/gold.png",
            tan: "resources/weapons/pistols/standard-9mm/tan.png",
            white: "resources/weapons/pistols/standard-9mm/white.png",
            red: "resources/weapons/pistols/standard-9mm/red.png"
        }
    },
    'ar-15': {
        name: "AR15",
        type: "Rifle",
        price: 5000,
        description: "Versatile, semi-automatic rifle",
        stats: { accuracy: 75, durability: 50, handling: 40 },
        images: {
            // You can now set a different specific image for a Gold Rifle vs a Red Rifle
            charcoal: "resources/weapons/assault-rifles/ar-15/charcoal.png",
            navy: "resources/weapons/assault-rifles/ar-15/navy.png",
            gold: "resources/weapons/assault-rifles/ar-15/gold.png",
            tan: "resources/weapons/assault-rifles/ar-15/tan.png",
            white: "resources/weapons/assault-rifles/ar-15/white.png",
            red: "resources/weapons/assault-rifles/ar-15/red.png"
        }
    },
    'bmm-draco': {
        name: "BMM-DRACO",
        type: "Rifle",
        price: 25000,
        description: "",
        stats: { accuracy: 40, durability: 40, handling: 90 },
        images: {
            charcoal: "resources/weapons/bmm-draco/charcoal.png",
            navy: "resources/weapons/bmm-draco/charcoal.png",
            gold: "resources/weapons/bmm-draco/charcoal.png",
            tan: "resources/weapons/bmm-draco/charcoal.png",
            white: "resources/weapons/bmm-draco/white.png",
            red: "resources/weapons/bmm-draco/red.png"
        }
    },
    'shotgun_breacher': {
        name: "COMING SOON",
        type: " ",
        price: 999999999999,
        description: "",
        stats: { accuracy: 0, durability: 0, handling: 0 },
        images: {
            charcoal: "https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=600",
            navy: "https://images.unsplash.com/photo-1584346133400-f6556488d75a?auto=format&fit=crop&q=80&w=600",
            gold: "https://images.unsplash.com/photo-1595079676159-467277259f9a?auto=format&fit=crop&q=80&w=600",
            tan: "https://images.unsplash.com/photo-1584013143370-4384e918491c?auto=format&fit=crop&q=80&w=600",
            white: "https://images.unsplash.com/photo-1582234053916-2d93e185805f?auto=format&fit=crop&q=80&w=600",
            red: "https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=600"
        }
    }
};