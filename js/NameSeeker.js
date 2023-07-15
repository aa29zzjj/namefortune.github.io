function NameSeeker(first_char, sec_char, third_char) {
    this.sky_block = first_char + 1;
    this.people_block = first_char + sec_char;
    this.ground_block = sec_char + third_char;
    this.out_block = third_char + 1;
    this.total_block = first_char + sec_char + third_char;
}

NameSeeker.prototype.getSkyBlock = function() {
    return this.sky_block;
};

NameSeeker.prototype.getPeopleBlock = function() {
    return this.people_block;
};

NameSeeker.prototype.getGroundBlock = function() {
    return this.ground_block;
};

NameSeeker.prototype.getOutBlock = function() {
    return this.out_block;
};

NameSeeker.prototype.getTotalBlock = function() {
    return this.total_block;
};


