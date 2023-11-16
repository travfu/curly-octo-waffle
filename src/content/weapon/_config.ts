import { z, defineCollection } from 'astro:content';

const weaponLevelSpecSettings = z.object({
	target: z.string(),
  weaponId: z.number(),
  level: z.number(),
  attack: z.number(),
  elementAttack: z.number(),
})

const skill = z.object({
  skillLevelSettingId: z.string(),
  normalSkillKind: z.number(),
  specialSkillKind: z.number(),
  skillLevel: z.string(),
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
  create: z.boolean(),
  upgradeFrom: z.string(),
  OneLevelUpFrom: z.number(),
  zenny: z.number(),
  userItem: z.array(userItem),
  craftMaterialSettingsId: z.number(),
  upgrade: z.object({
    base: z.string(),
    baseWeaponId: z.number(),
  }),
  _materials: equipmentCraftMaterialSettings
})

const bowgunSpecSettings = z.object({
  target: z.string(),
  weaponId: z.number(),
  ammoProperty: z.array(z.object({
    ammoId: z.number(),
    capacity: z.number(),
    recoilType: z.string(),
    reloadType: z.string(),
    bowgunAmmoSettingsId: z.number(),
    _ammo: z.object({
      id: z.number(),
      ammoType: z.string(),
      elementType: z.string(),
      level: z.number(),
      iconId: z.number(),
      colorCode: z.number(),
      htmlColorCode: z.string(),
    })
  }))
})

const bowSpecSettings = z.object({
  target: z.string(),
  weaponId: z.number(),
  bowArrowKind: z.string(),
  bowArrowSettingId: z.number(),
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
  numRequiredArmor: z.number(),
  sortOrder: z.number(),
  monsterSettingId: z.number(),
  discoveredItemId: z.array(z.number()),
})

export const weaponCollection = defineCollection({
  type: 'data',
  schema: z.object({
    target: z.string(),
    weaponId: z.number(),
    category: z.string(),
    elementType: z.string(),
    assetKey: z.string(),
    grade: z.number(),
    series: z.string(),
    seriesId: z.number(),
    requiredHunterRank: z.number(),
    skillId: z.array(z.number()),
    decorationSlotLevel: z.array(z.number()),
    sortOrder: z.number(),
    normalSkillId: z.array(z.number()),
    specialSkillId: z.number(),
    normalSkill: z.array(skill),
    specialSkill: skill,
    _levels: z.array(weaponLevelSpecSettings),
    _crafting: z.array(weaponCraftSharedSettings),
    _series: seriesSpecSettings,
    _bowgun: z.optional(bowgunSpecSettings),
    _bow: z.optional(bowSpecSettings),
  })
})
