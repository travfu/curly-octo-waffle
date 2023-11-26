import { z, defineCollection } from 'astro:content';

const weaponLevelSpecSettings = z.object({
	target: z.string(),
  weaponId: z.number(),
  level: z.number(),
  attack: z.number(),
  critical: z.number().optional(),
  elementAttack: z.number().optional(),
})

const skill = z.object({
  skillLevelSettingId: z.number(),
  normalSkillKind: z.string().optional(),
  specialSkillKind: z.string().optional(),
  skillLevel: z.number(),
})

const userItem = z.object({
  id: z.number(),
  num: z.number(),
})

const equipmentCraftMaterialSettings = z.object({
  id: z.number(),
  zenny: z.number(),
  userItem: z.array(userItem)
})

const weaponCraftSharedSettings = z.object({
  target: z.string(),
  weaponId: z.number(),
  create: z.boolean().optional(),
  upgradeFrom: z.string().optional(),
  OneLevelUpFrom: z.number().optional(),
  zenny: z.number().optional(),
  userItem: z.array(userItem).optional(),
  craftMaterialSettingsId: z.number(),
  upgrade: z.object({
    base: z.string(),
    baseWeaponId: z.number(),
  }).optional(),
  _materials: equipmentCraftMaterialSettings
})

const bowgunSpecSettings = z.object({
  target: z.string(),
  weaponId: z.number(),
  ammoProperty: z.array(z.object({
    // ammoId: z.number().optional(),
    capacity: z.number(),
    recoilType: z.string(),
    reloadType: z.string(),
    bowgunAmmoSettingsId: z.number(),
    _ammo: z.object({
      id: z.number(),
      ammoType: z.string(),
      elementType: z.string(),
      level: z.number(),
      // iconId: z.number().optional(),
      // colorCode: z.number().optional(),
      htmlColorCode: z.string(),
    })
  }))
})

const bowSpecSettings = z.object({
  target: z.string(),
  weaponId: z.number(),
  // bowArrowKind: z.array(z.string()),
  // bowArrowSettingId: z.array(z.number()),
  _arrows: z.array(z.object({
    bowArrowKind: z.string(),
    settingId: z.number(),
    arrowType: z.string(),
    level: z.number(),
    nameLocalizationKey: z.string(),
  }))
})

const seriesSpecSettings = z.object({
  series: z.string(),
  seriesId: z.number(),
  numRequiredArmor: z.number().optional(),
  sortOrder: z.number(),
  monsterSettingId: z.number(),
  discoveredItemId: z.array(z.number()).optional(),
})

export const weaponCollection = defineCollection({
  type: 'data',
  schema: z.object({
    target: z.string(),
    weaponId: z.number(),
    category: z.string(),
    elementType: z.enum([
      "NO_ELEMENT",
      "FIRE",
      "WATER",
      "THUNDER",
      "ICE",
      "DRAGON",
      "POISON",
      "PARALYSIS",
      "SLEEP",
      "BLAST"
    ]),
    assetKey: z.string(),
    grade: z.number(),
    series: z.string(),
    seriesId: z.number(),
    requiredHunterRank: z.number(),
    skillId: z.array(z.number()).optional(),
    decorationSlotLevel: z.array(z.number()),
    sortOrder: z.number(),
    normalSkillId: z.array(z.number()).optional(),
    specialSkillId: z.number().optional(),
    normalSkill: z.array(skill).optional(),
    specialSkill: skill.optional(),
    _levels: z.array(weaponLevelSpecSettings),
    _crafting: z.array(weaponCraftSharedSettings),
    _series: seriesSpecSettings,
    _bowgun: bowgunSpecSettings.optional(),
    _bow: bowSpecSettings.optional(),
  })
})
