/**
 * WEAPON REPOSITORY
 * * This file contains the definitions for every gun in the game.
 */

const WeaponRepository = {
    'pistol_9mm': {
        name: "Standard 9mm",
        type: "Pistol",
        price: 350,
        description: "Reliable, mass-produced sidearm. High handling, low impact.",
        stats: { accuracy: 40, durability: 60, handling: 80 },
        inShop: true,
        isLimited: false,
        images: {
            charcoal: "resources/weapons/pistols/standard-9mm/charcoal.png",
            navy: "resources/weapons/pistols/standard-9mm/navy.png",
            gold: "resources/weapons/pistols/standard-9mm/gold.png",
            tan: "resources/weapons/pistols/standard-9mm/tan.png",
            white: "resources/weapons/pistols/standard-9mm/white.png",
            red: "resources/weapons/pistols/standard-9mm/red.png"
        }
    },
    'glock-switch': {
        name: "Glock Switch",
        type: "Pistol",
        price: 14000,
        description: "",
        stats: { accuracy: 40, durability: 35, handling: 65 },
        inShop: true,
        isLimited: false,
        images: {
            charcoal: "resources/weapons/pistols/glock-switch/charcoal.png",
            navy: "resources/weapons/pistols/glock-switch/navy.png",
            gold: "resources/weapons/pistols/glock-switch/gold.png",
            tan: "resources/weapons/pistols/glock-switch/tan.png",
            white: "resources/weapons/pistols/glock-switch/white.png",
            red: "resources/weapons/pistols/glock-switch/red.png"
        }
    },
    'xmas-glock': {
        name: "2025 Holiday Glock",
        type: "RARE",
        price: 35000,
        description: "Limited Holiday 2025 Edition. No resale value.",
        stats: { accuracy: 75, durability: 50, handling: 40 },
        inShop: false,     // SET TO FALSE TO REMOVE FROM SHOP
        isLimited: true,  // Prevents selling and duplicate purchases
        images: {
            charcoal: "resources/weapons/pistols/xmas-glock/charcoal.png",
            navy: "resources/weapons/pistols/xmas-glock/navy.png",
            gold: "resources/weapons/pistols/xmas-glock/gold.png",
            tan: "resources/weapons/pistols/xmas-glock/tan.png",
            white: "resources/weapons/pistols/xmas-glock/white.png",
            red: "resources/weapons/pistols/xmas-glock/red.png"
        }
    },
    'xmas-ak47': {
        name: "2025 Holiday AK47",
        type: "RARE",
        price: 155000,
        description: "Limited Holiday 2025 Edition. No resale value.",
        stats: { accuracy: 30, durability: 10, handling: 40 },
        inShop: false,     // SET TO FALSE TO REMOVE FROM SHOP
        isLimited: true,  // Prevents selling and duplicate purchases
        images: {
            charcoal: "resources/weapons/assault-rifles/xmas-ak47/default.png",
            navy: "resources/weapons/assault-rifles/xmas-ak47/default.png",
            gold: "resources/weapons/assault-rifles/xmas-ak47/default.png",
            tan: "resources/weapons/assault-rifles/xmas-ak47/default.png",
            white: "resources/weapons/assault-rifles/xmas-ak47/default.png",
            red: "resources/weapons/assault-rifles/xmas-ak47/default.png"
        }
    },
    'ar-15': {
        name: "AR15",
        type: "Rifle",
        price: 5000,
        description: "Versatile, semi-automatic rifle",
        stats: { accuracy: 75, durability: 50, handling: 40 },
        inShop: true,
        isLimited: false,
        images: {
            charcoal: "resources/weapons/assault-rifles/ar-15/charcoal.png",
            navy: "resources/weapons/assault-rifles/ar-15/navy.png",
            gold: "resources/weapons/assault-rifles/ar-15/gold.png",
            tan: "resources/weapons/assault-rifles/ar-15/tan.png",
            white: "resources/weapons/assault-rifles/ar-15/white.png",
            red: "resources/weapons/assault-rifles/ar-15/red.png"
        }
    },
    'AK-47': {
        name: "AK-47",
        type: "Rifle",
        price: 30000,
        description: "",
        stats: { accuracy: 35, durability: 30, handling: 50 },
        inShop: true,
        isLimited: false,
        images: {
            charcoal: "resources/weapons/assault-rifles/ak-47/charcoal.png",
            navy: "resources/weapons/assault-rifles/ak-47/navy.png",
            gold: "resources/weapons/assault-rifles/ak-47/gold.png",
            tan: "resources/weapons/assault-rifles/ak-47/tan.png",
            white: "resources/weapons/assault-rifles/ak-47/white.png",
            red: "resources/weapons/assault-rifles/ak-47/red.png"
        }
    },
    'bmm-draco': {
        name: "BMM-DRACO",
        type: "Rifle",
        price: 25000,
        description: "",
        stats: { accuracy: 40, durability: 40, handling: 90 },
        inShop: true,
        isLimited: false,
        images: {
            charcoal: "resources/weapons/assault-rifles/bmm-draco/charcoal.png",
            navy: "resources/weapons/assault-rifles/bmm-draco/charcoal.png",
            gold: "resources/weapons/assault-rifles/bmm-draco/charcoal.png",
            tan: "resources/weapons/assault-rifles/bmm-draco/charcoal.png",
            white: "resources/weapons/assault-rifles/bmm-draco/white.png",
            red: "resources/weapons/assault-rifles/bmm-draco/red.png"
        }
    },
    'repeater-shotgun': {
        name: "Repeater Shotgun",
        type: "Shotgun",
        price: 25000,
        description: "Reliable, mass-produced sidearm. High handling, low impact.",
        stats: { accuracy: 30, durability: 100, handling: 50 },
        inShop: true,
        isLimited: false,
        images: {
            charcoal: "resources/weapons/shotguns/repeater-shotgun/charcoal.png",
            navy: "resources/weapons/shotguns/repeater-shotgun/navy.png",
            gold: "resources/weapons/shotguns/repeater-shotgun/gold.png",
            tan: "resources/weapons/shotguns/repeater-shotgun/tan.png",
            white: "resources/weapons/shotguns/repeater-shotgun/white.png",
            red: "resources/weapons/shotguns/repeater-shotgun/red.png"
        }
    },
};