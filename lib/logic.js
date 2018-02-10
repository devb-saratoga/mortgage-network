'use strict';
/**
 * Real estate mortgage transction processor functions
 */

/**
* A transaction processor function description
* This comment is of utmost importance - meta-data
* @param {com.devb.mortgage.Escrow} parameter-name 
* @transaction
*/

function escrow(tx) {
    var homeValue = tx.escrowBook.home.value;
    var buyer = tx.buyer;
    var money = tx.money;
    var document = tx.document;
  }
  
  /**
  * A transaction processor function description
  * @param {com.devb.mortgage.ListProperty} tx parameter-name 
  * @transaction
  */
  function listProperty(tx) {
    this.listed = true;  
    var id = tx.home.propertyId;
    var assetRegistry;
    return getAssetRegistry('com.devb.mortgage.PropertyHome')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.isListed = tx.listed;
            return asset.update(listed);
        });
  }
  
  /**
  * A transaction processor function description
  * @param {com.devb.mortgage.Revalue} tx parameter-name 
  * @transaction
  */
  function revalue(tx) {
    var assetRegistry;  
    var id = tx.home.propertyId;
    return getAssetRegistry('com.devb.mortgage.PropertyHome')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = tx.newValue;
            return assetRegistry.update(asset);
        });
  }  
  
