
import GUI from '../GUI.js';
import ClientPlayer from '../ClientPlayer.js';
import WallShop from '../weapons/WallShop.js';
import Weapons from '../weapons/Weapons.js';

class BuyItemFromWallShop {
    constructor() {}

    fireEvent() {
        // change shop buy text
        GUI.UI_setWallShopBuyText(true, '<span class="text-success">Item purchased!</span>')
        // hide shop buy text after timer
        setTimeout(() => {
            GUI.UI_setWallShopBuyText(false, '')
        }, 1500)
        // set player out of wall shop
        ClientPlayer.isAtWallShop.state = false

        // remove currently used weapon from UI
        Weapons.weaponInstance.isShown = false

        // get purchased item data
        const purchasedItemId = ClientPlayer.isAtWallShop.itemId
        const purchasedItemCost = ClientPlayer.isAtWallShop.itemCost

        // const purchasedItemInstance = Weapons.getWeaponInstanceById(purchasedItemId)
        Weapons.pickupWeapon(purchasedItemId)
    }
}

export default new BuyItemFromWallShop()