class HeavenlyStems {
    constructor(name) {
        const heavenlyMap = this.createMap();
        const skyKey = name.getSkyBlock() % 10;
        const peopleKey = name.getPeopleBlock() % 10;
        const groundKey = name.getGroundBlock() % 10;
        const outKey = name.getOutBlock() % 10;
        const totalKey = name.getTotalBlock() % 10;
        const skyVal = heavenlyMap.get(skyKey);
        const peopleVal = heavenlyMap.get(peopleKey);
        const groundVal = heavenlyMap.get(groundKey);
        const outVal = heavenlyMap.get(outKey);
        const totalVal = heavenlyMap.get(totalKey);
        this.sky_stem = skyVal;
        this.people_stem = peopleVal;
        this.ground_stem = groundVal;
        this.out_stem = outVal;
        this.total_stem = totalVal;
    }

    createMap() {
        const heavenlyMap = new Map();
        heavenlyMap.set(1, "甲");
        heavenlyMap.set(2, "乙");
        heavenlyMap.set(3, "丙");
        heavenlyMap.set(4, "丁");
        heavenlyMap.set(5, "戊");
        heavenlyMap.set(6, "己");
        heavenlyMap.set(7, "庚");
        heavenlyMap.set(8, "辛");
        heavenlyMap.set(9, "壬");
        heavenlyMap.set(0, "癸");
        return heavenlyMap;
    }

    get_sky_stem() {
        return this.sky_stem;
    }

    get_people_stem() {
        return this.people_stem;
    }

    get_ground_stem() {
        return this.ground_stem;
    }

    get_out_stem() {
        return this.out_stem;
    }

    get_total_stem() {
        return this.total_stem;
    }
}
