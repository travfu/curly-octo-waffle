import { ElementType } from "@constants";



const elementTemplate = (key: keyof typeof ElementType | number) => {
  let id;
  if (typeof key === "number") {
    id = String(key).padStart(2, '0')
  } else {
    id = String(ElementType[key]).padStart(2, '0')
  }
  return `/icons/element/spr_ui_atlas_element_${id}.png`
}

const weaponTypeTemplate = (key: string) => {
  return `/icons/weapon/${key}.png`
}

const bowgunAmmoTemplate = (ammoType: string) => {
  switch (ammoType) {
    case 'NORMAL':
      return "/icons/spr_ui_atlas_cmn_icon_status_21.png"
    case 'SPREAD':
      return "/icons/spr_ui_atlas_cmn_icon_status_22.png"
    case 'PIERCING':
    case 'SLICING':
      return "/icons/spr_ui_atlas_cmn_icon_status_23.png"
    case 'STICKY':
      return "/icons/spr_ui_atlas_cmn_icon_status_24.png"
    default:
      return "/icons/spr_ui_atlas_cmn_icon_status_21.png"
  }
}

export const IconSrc = {
  ATTACK: "/icons/spr_ui_atlas_cmn_icon_status_06.png",
  CRITICAL: "/icons/spr_ui_atlas_cmn_icon_status_02.png",
  ELEMENT: elementTemplate,
  WEAPON_TYPE: weaponTypeTemplate,
  BOWGUN_AMMO: bowgunAmmoTemplate,
};
