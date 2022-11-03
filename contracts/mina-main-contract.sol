// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;

contract minaContract {

    struct App {
        string name;
        string principal_id;
        string description;
        string url;
        string logo_url;
    }

    address manager;
    App[] arrayApps;
    App[] requestedArrayApps;

    modifier onlyManager {
      require(msg.sender == manager);
      _;
   }

    constructor() {
        manager = msg.sender;
    }

    function enterApp(string memory name, string memory principal_id, string memory description, string memory url, string memory logo_url) public {
        requestedArrayApps.push(App(name, principal_id, description, url, logo_url));
    }

    function enterArrayOfApp(App[] memory apps) public onlyManager {
        for (uint256 i = 0; i < apps.length; i++) {
            arrayApps.push(apps[i]);
        }
    }

    function approveApp(uint256 index) public onlyManager {
        arrayApps.push(requestedArrayApps[index]);
        requestedArrayApps[index] = requestedArrayApps[requestedArrayApps.length-1];
        requestedArrayApps.pop();
    }

    function disApproveApp(uint256 index) public onlyManager {
        requestedArrayApps[index] = requestedArrayApps[requestedArrayApps.length-1];
        requestedArrayApps.pop();
    }

    function getPublicApps() view public returns (App[] memory) {
        return arrayApps;
    }

    function getRequestedApps() view public returns (App[] memory) {
        return requestedArrayApps;
    }


    function getManager() view public returns (address) {
        return manager;
    }


}
