import { z, defineCollection } from 'astro:content';
import { weaponCollection } from './weapon/_config';

const guideBookSchema = z.object({
	Id: z.number(),
	MonsterId: z.number(),
	Obsolete: z.boolean(),
	Order: z.number(),
	SpeciesKey: z.string(),
	DescriptionKey: z.string(),
	HintKey: z.string(),
	ForestAreaFlag: z.boolean(),
	DesertAreaFlag: z.boolean(),
	SwampAreaFlag: z.boolean(),
	MinGrade: z.number(),
	AcquireMaterialMinMonsterGrade1: z.number(),
	AcquireMaterialMaxMonsterGrade1: z.number(),
	AcquireMaterialId1: z.coerce.number(),
	AcquireMaterialMinMonsterGrade2: z.number(),
	AcquireMaterialMaxMonsterGrade2: z.number(),
	AcquireMaterialId2: z.coerce.number(),
	AcquireMaterialMinMonsterGrade3: z.number(),
	AcquireMaterialMaxMonsterGrade3: z.number(),
	AcquireMaterialId3: z.coerce.number(),
	AcquireMaterialMinMonsterGrade4: z.number(),
	AcquireMaterialMaxMonsterGrade4: z.number(),
	AcquireMaterialId4: z.coerce.number(),
	AcquireMaterialMinMonsterGrade5: z.number(),
	AcquireMaterialMaxMonsterGrade5: z.number(),
	AcquireMaterialId5: z.coerce.number(),
	AcquireMaterialMinMonsterGrade6: z.number(),
	AcquireMaterialMaxMonsterGrade6: z.number(),
	AcquireMaterialId6: z.coerce.number(),
	AcquireMaterialMinMonsterGrade7: z.number(),
	AcquireMaterialMaxMonsterGrade7: z.number(),
	AcquireMaterialId7: z.coerce.number(),
	AcquireMaterialMinMonsterGrade8: z.number(),
	AcquireMaterialMaxMonsterGrade8: z.number(),
	AcquireMaterialId8: z.coerce.number(),
	AcquireMaterialMinMonsterGrade9: z.number(),
	AcquireMaterialMaxMonsterGrade9: z.number(),
	AcquireMaterialId9: z.coerce.number(),
	AcquireMaterialMinMonsterGrade10: z.number(),
	AcquireMaterialMaxMonsterGrade10: z.number(),
	AcquireMaterialId10: z.number(),
	AttackElement1: z.number(),
	AttackElement2: z.preprocess(arg => arg === "" ? null : arg, z.number().nullish()),
})

const partsSchema = z.object({
	m_Name: z.string(),
	elementalWeaknessChart: z.object({
		fire: z.number(),
		water: z.number(),
		thunder: z.number(),
		ice: z.number(),
		dragon: z.number(),
		poison: z.number(),
		paralysis: z.number(),
	}).optional(),
	parameter: z.object({
		partDataList: z.array(z.object({
			partKey: z.string(),
			localizeKey: z.string(),
			headFlag: z.number(),
			partBreakData: z.object({
				partBreakType: z.number(),
				monsterPart: z.number(),
			}),
			damageData: z.array(z.object({
				statusKey: z.string(),
				physical: z.object({
					cut: z.number(),
					blunt: z.number(),
					ammo: z.number()
				}),
				elemental: z.object({
					fire: z.number(),
					water: z.number(),
					thunder: z.number(),
					ice: z.number(),
					dragon: z.number()
				})
			})),
			damageInfluences: z.array(z.any()),
			partToOverrideDamageStatusKey: z.number()
		}))
	})
})

const monsterCollection = defineCollection({
  type: 'data',
  schema: z.object({
		id: z.number().int(),
		monsterSpecies: z.string(),
		monsterSize: z.string(),
		assetKey: z.string(),
		nameLocalizationKey: z.string(),
		bodyShape: z.number().int().optional(),
		_guidebook: guideBookSchema.nullable(),
		_parts: partsSchema.nullable()
	})
});

const i18nMessagesCollection = defineCollection({
	type: 'data',
	schema: z.record(z.string())
})


export const collections = {
  monster: monsterCollection,
  messages: i18nMessagesCollection,
  weapon: weaponCollection
};

export type PartsType = z.infer<typeof partsSchema>