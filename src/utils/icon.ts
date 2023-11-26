import { ElementType } from "@constants";

const BASE_URL = '/curly-octo-waffle';


const elementTemplate = (key: keyof typeof ElementType) => {
  const id = String(ElementType[key]).padStart(2, '0')
  return `${BASE_URL}/icons/element/spr_ui_atlas_element_${id}.png`
}

const weaponTypeTemplate = (key) => {
  return `${BASE_URL}/icons/weapon/${key}.png`
}

const bowgunAmmoTemplate = (ammoType: string) => {
  switch (ammoType) {
    case 'NORMAL':
      return `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_21.png`
    case 'SPREAD':
      return `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_22.png`
    case 'PIERCING':
    case 'SLICING':
      return `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_23.png`
    case 'STICKY':
      return `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_24.png`
    default:
      return `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_21.png`
  }
}

export const IconSrc = {
  ATTACK: `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_06.png`,
  CRITICAL: `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_02.png`,
  ELEMENT: elementTemplate,
  WEAPON_TYPE: weaponTypeTemplate,
  BOWGUN_AMMO: bowgunAmmoTemplate,
};
