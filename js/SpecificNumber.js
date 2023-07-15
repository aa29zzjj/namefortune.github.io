class SpecificNumber {
    static categories() {
        const cate = new Map();
        cate.set(7, "孤數");
        cate.set(17, "孤數");
        cate.set(27, "孤數(化氣加強)");
        cate.set(37, "孤數 理財數 白手起家");
        cate.set(47, "孤數");
        cate.set(28, "寡數");
        cate.set(39, "寡數");
        cate.set(12, "桃花數");
        cate.set(21, "桃花數 白手起家");
        cate.set(22, "桃花數");
        cate.set(24, "口舌星 白手起家");
        cate.set(25, "溫和星");
        cate.set(26, "暗黑星");
        cate.set(44, "死亡星");
        cate.set(32, "軍師數 財運 白手起家");
        cate.set(41, "領導數 白手起家");
        cate.set(16, "財運");
        cate.set(29, "白手起家");
        cate.set(33, "白手起家");
        return cate;
    }

    static natureFortune(name) {
        const nature_fortune = new Map();
        if (SpecificNumber.categories().has(name.getSkyBlock())) {
            nature_fortune.set("天格", SpecificNumber.categories().get(name.getSkyBlock()));
        } else {
            nature_fortune.set("天格", "無");
        }
        if (SpecificNumber.categories().has(name.getPeopleBlock())) {
            nature_fortune.set("人格", SpecificNumber.categories().get(name.getPeopleBlock()));
        } else {
            nature_fortune.set("人格", "無");
        }
        if (SpecificNumber.categories().has(name.getGroundBlock())) {
            nature_fortune.set("地格", SpecificNumber.categories().get(name.getGroundBlock()));
        } else {
            nature_fortune.set("地格", "無");
        }
        if (SpecificNumber.categories().has(name.getOutBlock())) {
            nature_fortune.set("外格", SpecificNumber.categories().get(name.getOutBlock()));
        } else {
            nature_fortune.set("外格", "無");
        }
        if (SpecificNumber.categories().has(name.getTotalBlock())) {
            nature_fortune.set("總格", SpecificNumber.categories().get(name.getTotalBlock()));
        } else {
            nature_fortune.set("總格", "無");
        }
        return nature_fortune;
    }
}
