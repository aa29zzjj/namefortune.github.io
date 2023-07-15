class AttributeCalculator {
    //五行相生關係
    static lifeCycle() {
        let life_cycle = new Map();
        life_cycle.set("木", "火");
        life_cycle.set("火", "土");
        life_cycle.set("土", "金");
        life_cycle.set("金", "水");
        life_cycle.set("水", "木");

        return life_cycle;
    }
    //五行相剋關係
    static deCycle() {
        let de_cycle = new Map();
        de_cycle.set("水", "火");
        de_cycle.set("火", "金");
        de_cycle.set("金", "木");
        de_cycle.set("木", "土");
        de_cycle.set("土", "水");

        return de_cycle;
    }
    static good_cycle() {
        let cycle = new Map();
        cycle.set("比", "食");
        cycle.set("食", "財");
        cycle.set("財", "官");
        cycle.set("官", "印");
        cycle.set("印", "比");

        return cycle;
    }
    static good_counter() {
        let counter = new Map();
        counter.set("比", 1);
        counter.set("食", 0);
        counter.set("財", 0);
        counter.set("官", 0);
        counter.set("印", 0);

        return counter;
    }

    static attList(attribute) {
        let att_list = [];
        att_list.push(attribute.get_sky_att());
        att_list.push(attribute.get_ground_att());
        att_list.push(attribute.get_out_att());
        att_list.push(attribute.get_total_att());
        return att_list;
    }
    /*我克為財
      克我為官
      生我為印
      我生為食
      同我為比*/ 
    static standard_form() {
        let standard = new Set();
        standard.add("財");
        standard.add("官");
        standard.add("印");
        standard.add("食");
        standard.add("比");
        return standard;
    }
    static where_exist(counter){
        var spot = "";
        if(counter == 0){
            spot = "在上";
        }
        if(counter == 1){
            spot = "在下";
        }
        if(counter == 2){
            spot = "在外";
        }
        if(counter == 3){
            spot = "在總";
        }
        if(counter == 4){
            spot = "在人";
        }
        return spot;
    }
    static nature_fortune(attribute) {
        let key = attribute.get_people_att();
        let nature = new Map();
        let att_list = AttributeCalculator.attList(attribute);
        var i = 0;
        for (let att of att_list) {            
            if (att === key) {
                nature.set(AttributeCalculator.where_exist(i),"比" );
            }
            if (att === AttributeCalculator.lifeCycle().get(key)) {
                nature.set(AttributeCalculator.where_exist(i),"食" );
            }
            if (att === AttributeCalculator.deCycle().get(key)) {
                nature.set( AttributeCalculator.where_exist(i),"財");
            }
            if (key === AttributeCalculator.deCycle().get(att)) {
                nature.set(AttributeCalculator.where_exist(i),"官" );
            }
            if (key === AttributeCalculator.lifeCycle().get(att)) {
                nature.set( AttributeCalculator.where_exist(i), "印");
            }
            i += 1;

        }
        return nature;
    }
 
    static findKeyByValue(map, value) {
        for (let [key, val] of map.entries()) {
          if (val === value) {
            return key;
          }
        }
        return null;
      }
      
    static abs_fortune(attribute) {
        let tester_att_list = AttributeCalculator.attList(attribute);
        let life_cycle = AttributeCalculator.lifeCycle();
        let breaking_block = new Map();
        for(let i = 0 ; i < tester_att_list.length; i++){
            let check_list = AttributeCalculator.attList(attribute);
            check_list.splice(i, 1);
            let key = AttributeCalculator.findKeyByValue(life_cycle, tester_att_list[i]);
            if((check_list.includes(tester_att_list[i]) === false) && (check_list.includes(key) === false)){
                breaking_block.set( AttributeCalculator.where_exist(i),tester_att_list[i]);
            }
        }

        return breaking_block;
    }
        

    
//來電感應
    static lover_match(attribute1, attribute2) {
        let matching = new Map();
        //甲對乙的狀況
        if (AttributeCalculator.lifeCycle().get(attribute1.get_sky_att()) === attribute2.get_people_att() && AttributeCalculator.lifeCycle().get(attribute1.get_people_att()) === attribute2.get_ground_att()) {
            matching.set("甲對乙", "雙生關係");
        } else if (AttributeCalculator.deCycle().get(attribute1.get_sky_att()) === attribute2.get_people_att() && AttributeCalculator.deCycle().get(attribute1.get_people_att()) === attribute2.get_ground_att()) {
            matching.set("甲對乙", "雙剋關係");
        }else if(attribute1.get_sky_att() === attribute2.get_people_att() && attribute1.get_people_att() === attribute2.get_ground_att()){
            matching.set("甲對乙", "平宮關係");
        }

        //乙對甲的狀況
        if (AttributeCalculator.lifeCycle().get(attribute2.get_sky_att()) === attribute1.get_people_att() && AttributeCalculator.lifeCycle().get(attribute2.get_people_att()) === attribute1.get_ground_att()) {
            matching.set("乙對甲", "雙生關係");
        } else if (AttributeCalculator.deCycle().get(attribute2.get_sky_att()) === attribute1.get_people_att() && AttributeCalculator.deCycle().get(attribute2.get_people_att()) === attribute1.get_ground_att()) {
            matching.set("乙對甲", "雙剋關係");
        }else if(attribute2.get_sky_att() === attribute1.get_people_att() && attribute2.get_people_att() === attribute1.get_ground_att()){
            matching.set("乙對甲", "平宮關係");
        }


        if (matching.size === 0) {
            matching.set("甲跟乙", "沒戲笑尼~=)");
        }
        return matching;
    }
//貴小人
    static noble_person(name1, name2) {
        let connection = new Map();
        let name1_people_num = Math.floor(name1.getPeopleBlock() / 10) + (name1.getPeopleBlock() % 10);
        let name1_ground_num = Math.floor(name1.getGroundBlock() / 10) + (name1.getGroundBlock() % 10);
        let name1_total_num = Math.floor(name1.getTotalBlock() / 10) + (name1.getTotalBlock() % 10);
        let name2_people_num = Math.floor(name2.getPeopleBlock() / 10) + (name2.getPeopleBlock() % 10);
        let name2_ground_num = Math.floor(name2.getGroundBlock() / 10) + (name2.getGroundBlock() % 10);
        let name2_total_num = Math.floor(name2.getTotalBlock() / 10) + (name2.getTotalBlock() % 10);

        if (name1_people_num === name2_ground_num) {
            connection.set("甲對乙來說(人對地)", "間接貴人");
        }
        if (name1_ground_num === name2_total_num) {
            connection.set("甲對乙來說(地對總)", "間接貴人");
        }
        if (name2_people_num === name1_ground_num) {
            connection.set("乙對甲來說(人對地)", "間接貴人");
        }
        if (name2_ground_num === name1_total_num) {
            connection.set("乙對甲來說(地對總)" , "間接貴人");
        }
        if (name1.getPeopleBlock() === name2.getGroundBlock()) {
            connection.set("甲對乙來說(人對地)", "直接貴人");
        }
        if (name1.getGroundBlock() === name2.getTotalBlock()) {
            connection.set("甲對乙來說(地對總)", "直接貴人");
        }
        if (name2.getPeopleBlock() === name1.getGroundBlock()) {
            connection.set("乙對甲來說(人對地)", "直接貴人");
        }
        if (name2.getGroundBlock() === name1.getTotalBlock()) {
            connection.set("乙對甲來說(地對總)", "直接貴人");
        }
        if (name1.getPeopleBlock() === name2.getPeopleBlock()){
            connection.set("甲與乙的價值觀", "相近");
        }
        if(name1.getGroundBlock() === name2.getGroundBlock()){
            connection.set("甲與乙的性生活", "圓滿");
        }
        if(name1.getTotalBlock() === name2.getTotalBlock()){
            connection.set("甲與乙的人生目標", "一致");
        }  
        if (connection.size === 0) {
            connection.set("甲跟乙", "沒搞頭");
        }
        return connection;
    }
}
