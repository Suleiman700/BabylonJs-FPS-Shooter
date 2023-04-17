
import GUI from '../GUI.js';
import ClientPlayer from '../ClientPlayer.js';
import Weapons from '../weapons/Weapons.js';
import Socket from '../socket/Socket.js';
import Particles from '../Environment/Particles.js';

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

        // get purchased item type
        const purchasedItemType = ClientPlayer.isAtWallShop.itemType
        const purchasedItemId = ClientPlayer.isAtWallShop.itemId
        const purchasedItemCost = ClientPlayer.isAtWallShop.itemCost

        // take money from player
        ClientPlayer.money -= purchasedItemCost

        if (purchasedItemType === 'weapon') {
            // remove currently used weapon from UI
            Weapons.weaponInstance.isShown = false

            // pickup purchased weapon
            Weapons.pickupWeapon(purchasedItemId)

            // emit data to server that player purchased weapon and is now holding another weapon
            const purchasedWeaponData = {
                weaponId: purchasedItemId, // example: AKM
                weaponCost: purchasedItemCost, // example: 150
            }
            Socket.socket.emit('playerPurchasedWeaponFromWallShop', purchasedWeaponData)
        }
    }
}

export default new BuyItemFromWallShop()