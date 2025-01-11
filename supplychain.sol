// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SupplyChain {
    address public Owner;

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyByOwner() {
        require(msg.sender == Owner, "Only owner can execute this function.");
        _;
    }

    enum STAGE {
        Init,
        RawMaterialSupply,
        Manufacture,
        Distribution,
        Retail,
        Sold
    }

    uint256 public medicineCtr = 0;
    uint256 public rmsCtr = 0;
    uint256 public manCtr = 0;
    uint256 public disCtr = 0;
    uint256 public retCtr = 0;

    struct medicine {
        uint256 id; 
        string name; 
        string description; 
        uint256 RMSid; 
        uint256 MANid; 
        uint256 DISid; 
        uint256 RETid; 
        STAGE stage; 
    }

    mapping(uint256 => medicine) public MedicineStock;
    uint256[] public medicineIDs;  // Array to store all medicine IDs

    function showStage(uint256 _medicineID) public view returns (string memory) {
        require(medicineCtr > 0, "No medicines in stock.");
        if (MedicineStock[_medicineID].stage == STAGE.Init) return "Medicine Ordered";
        if (MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply) return "Raw Material Supply Stage";
        if (MedicineStock[_medicineID].stage == STAGE.Manufacture) return "Manufacturing Stage";
        if (MedicineStock[_medicineID].stage == STAGE.Distribution) return "Distribution Stage";
        if (MedicineStock[_medicineID].stage == STAGE.Retail) return "Retail Stage";
        if (MedicineStock[_medicineID].stage == STAGE.Sold) return "Medicine Sold";
        return "";
    }

    struct rawMaterialSupplier {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }

    mapping(uint256 => rawMaterialSupplier) public RMS;

    struct manufacturer {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }

    mapping(uint256 => manufacturer) public MAN;

    struct distributor {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }

    mapping(uint256 => distributor) public DIS;

    struct retailer {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }

    mapping(uint256 => retailer) public RET;

    function addRMS(address _address, string memory _name, string memory _place) public onlyByOwner {
        rmsCtr++;
        RMS[rmsCtr] = rawMaterialSupplier(_address, rmsCtr, _name, _place);
    }

    function addManufacturer(address _address, string memory _name, string memory _place) public onlyByOwner {
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place);
    }

    function addDistributor(address _address, string memory _name, string memory _place) public onlyByOwner {
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place);
    }

    function addRetailer(address _address, string memory _name, string memory _place) public onlyByOwner {
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place);
    }

    function RMSsupply(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "Invalid medicine ID.");
        uint256 _id = findRMS(msg.sender);
        require(_id > 0, "RMS not found.");
        require(MedicineStock[_medicineID].stage == STAGE.Init, "Medicine is already in a later stage.");
        MedicineStock[_medicineID].RMSid = _id;
        MedicineStock[_medicineID].stage = STAGE.RawMaterialSupply;
    }

    function findRMS(address _address) private view returns (uint256) {
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return RMS[i].id;
        }
        return 0;
    }

    function Manufacturing(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "Invalid medicine ID.");
        uint256 _id = findMAN(msg.sender);
        require(_id > 0, "Manufacturer not found.");
        require(MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply, "Invalid stage.");
        MedicineStock[_medicineID].MANid = _id;
        MedicineStock[_medicineID].stage = STAGE.Manufacture;
    }

    function findMAN(address _address) private view returns (uint256) {
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    function Distribute(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "Invalid medicine ID.");
        uint256 _id = findDIS(msg.sender);
        require(_id > 0, "Distributor not found.");
        require(MedicineStock[_medicineID].stage == STAGE.Manufacture, "Invalid stage.");
        MedicineStock[_medicineID].DISid = _id;
        MedicineStock[_medicineID].stage = STAGE.Distribution;
    }

    function findDIS(address _address) private view returns (uint256) {
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    function Retail(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "Invalid medicine ID.");
        uint256 _id = findRET(msg.sender);
        require(_id > 0, "Retailer not found.");
        require(MedicineStock[_medicineID].stage == STAGE.Distribution, "Invalid stage.");
        MedicineStock[_medicineID].RETid = _id;
        MedicineStock[_medicineID].stage = STAGE.Retail;
    }

    function findRET(address _address) private view returns (uint256) {
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

    function sold(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "Invalid medicine ID.");
        uint256 _id = findRET(msg.sender);
        require(_id > 0, "Retailer not found.");
        require(_id == MedicineStock[_medicineID].RETid, "Only the correct retailer can mark the medicine as sold.");
        require(MedicineStock[_medicineID].stage == STAGE.Retail, "Invalid stage.");
        MedicineStock[_medicineID].stage = STAGE.Sold;
    }

    function addMedicine(string memory _name, string memory _description) public onlyByOwner {
        require(rmsCtr > 0, "No Raw Material Suppliers.");
        require(manCtr > 0, "No Manufacturers.");
        require(disCtr > 0, "No Distributors.");
        require(retCtr > 0, "No Retailers.");
        medicineCtr++;
        MedicineStock[medicineCtr] = medicine(medicineCtr, _name, _description, 0, 0, 0, 0, STAGE.Init);
        medicineIDs.push(medicineCtr);  // Add the new medicine ID to the list
    }

    function getAllMedicines() public view returns (medicine[] memory) {
        uint256 totalMedicines = medicineIDs.length;
        medicine[] memory allMedicines = new medicine[](totalMedicines);

        for (uint256 i = 0; i < totalMedicines; i++) {
            uint256 medicineID = medicineIDs[i];
            allMedicines[i] = MedicineStock[medicineID];
        }

        return allMedicines;
    }
}