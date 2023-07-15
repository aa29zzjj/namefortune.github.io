function Attribute(name) {
    var att_map = this.create_map();
    var sky_key = name.getSkyBlock() % 10;
    var people_key = name.getPeopleBlock() % 10;
    var ground_key = name.getGroundBlock() % 10;
    var out_key = name.getOutBlock() % 10;
    var total_key = name.getTotalBlock() % 10;
    var sky_val = att_map[sky_key];
    var people_val = att_map[people_key];
    var ground_val = att_map[ground_key];
    var out_val = att_map[out_key];
    var total_val = att_map[total_key];
    
    this.sky_att = sky_val;
    this.people_att = people_val;
    this.ground_att = ground_val;
    this.out_att = out_val;
    this.total_att = total_val;
}

Attribute.prototype.create_map = function() {
    var att_map = {
        1: "木",
        2: "木",
        3: "火",
        4: "火",
        5: "土",
        6: "土",
        7: "金",
        8: "金",
        9: "水",
        0: "水"
    };
    return att_map;
};

Attribute.prototype.get_sky_att = function() {
    return this.sky_att;
};

Attribute.prototype.get_people_att = function() {
    return this.people_att;
};

Attribute.prototype.get_ground_att = function() {
    return this.ground_att;
};

Attribute.prototype.get_out_att = function() {
    return this.out_att;
};

Attribute.prototype.get_total_att = function() {
    return this.total_att;
};
