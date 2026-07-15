// prettier-ignore
export interface RegionData {
  category: string
  image: string
  description?: string
  timeZone?: string
}

// prettier-ignore
export const regionCategories: Record<string, RegionData> = {
    'Kanto': {
        "category": "Kanto",
        "image": "/backgrounds/kanto.avif",
        "description": "A diverse mountains region filled with lush forests and plagued by Team Rocket",
        "timeZone": "Asia/Tokyo"
    },
        'Orange Isles': {
        "category": "Orange Isles",
        "image": "/backgrounds/orange.avif",
        "timeZone": "Pacific/Honolulu"
    },
            'Southern Isles': {
        "category": "Southern Isles",
        "image": "/backgrounds/southern.avif",
        "timeZone": "Europe/Rome"
    },
                'Battle Isles': {
        "category": "Battle Isles",
        "image": "/backgrounds/battle.avif",
        "timeZone": "UTC"
    },
                    'Underground': {
        "category": "Underground",
        "image": "/backgrounds/underground.avif",
        "timeZone": "Asia/Tokyo"
    },
        'Johto': {
        "category": "Johto",
        "image": "/backgrounds/johto.avif",
        "timeZone": "Asia/Tokyo"
    },
        'Hoenn': {
        "category": "Hoenn",
        "image": "/backgrounds/hoenn.avif",
        "timeZone": "Asia/Tokyo"
    },
        'Sinnoh': {
        "category": "Sinnoh",
        "image": "/backgrounds/sinnoh.avif",
        "timeZone": "Asia/Tokyo"
    },
    'Unova': {
        "category": "Unova",
        "image": "/backgrounds/unova.avif",
        "timeZone": "America/New_York"
    },
    'Kalos': {
        "category": "Kalos",
        "image": "/backgrounds/kalos.avif",
        "timeZone": "Europe/Paris"
    },
    'Alola': {
        "category": "Alola",
        "image": "/backgrounds/alola.avif",
        "timeZone": "Pacific/Honolulu"
    },
    'Galar': {
        "category": "Galar",
        "image": "/backgrounds/galar.avif",
        "timeZone": "Europe/London"
    },
    'Paldea': {
        "category": "Paldea",
        "image": "/backgrounds/paldea.avif",
        "timeZone": "Europe/Madrid"
    },
    
        
    

}
