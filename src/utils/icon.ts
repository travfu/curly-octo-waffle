import { ElementType } from "@constants";

const BASE_URL = '/curly-octo-waffle';


const elementTemplate = (key: keyof typeof ElementType) => {
  const id = String(ElementType[key]).padStart(2, '0')
  return `${BASE_URL}/icons/element/spr_ui_atlas_element_${id}.png`
}

const weaponTypeTemplate = (key) => {
  return `${BASE_URL}/icons/weapon/${key}.png`
}

export const IconSrc = {
  ATTACK: `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_06.png`,
  CRITICAL: `${BASE_URL}/icons/spr_ui_atlas_cmn_icon_status_02.png`,
  ELEMENT: elementTemplate,
  WEAPON_TYPE: weaponTypeTemplate
};
