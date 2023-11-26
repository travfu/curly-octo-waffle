import { getCollection, type CollectionEntry  } from 'astro:content';


/** Get weapon collection that excludes items below minimum crafting grade. */
export const getWeapons = async ({ forMonsterId }: { forMonsterId?: number } = {}) => {
  const weaponCollection = await getCollection(
    'weapon',
    forMonsterId
      ? ({ data }) => {
          if (data._series.series === 'SERIES_ORE') return false;
          return data._series.monsterSettingId === forMonsterId;
        }
      : undefined
  );

  // exclude weapons below min. crafting grade
  const minGradeMap: Map<string, number> = new Map();
  const ARBRITRARY_MAX_GRADE = 100;
  const availableWeapons = weaponCollection
    .sort(
      (w1, w2) =>
        w1.data.series.localeCompare(w2.data.series) ||
        w1.data.category.localeCompare(w2.data.category) ||
        w1.data.grade - w2.data.grade
    )
    .filter(({ data }) => {
      const key = [data.series, data.category].join('-');
      if (data._crafting?.[0].create) {
        minGradeMap.set(key, data.grade);
        return true;
      }
      return (minGradeMap.get(key) || ARBRITRARY_MAX_GRADE) <= data.grade;
    });

  return availableWeapons;
};

/** Get weapon collection grouped by category (weapon type). */
export const getWeaponsByCategory = async ({ forMonsterId }: { forMonsterId?: number } = {}) => {
  const weaponCollection = await getWeapons({ forMonsterId });
  return weaponCollection.reduce(
    (acc: Record<string, CollectionEntry<'weapon'>[]>, obj) => {
      if (acc[obj.data.category]) acc[obj.data.category].push(obj);
      else acc[obj.data.category] = [obj];
      return acc;
    },
    {}
  );
};
