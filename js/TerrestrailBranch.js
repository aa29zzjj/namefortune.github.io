class TerrestrialBranch {
    constructor(name) {
      this.sky_branch = '';
      this.people_branch = '';
      this.ground_branch = '';
      this.out_branch = '';
      this.total_branch = '';
      
      const terrestrial_map = this.create_map();
      const sky_key = name.getSkyBlock() % 12;
      const people_key = name.getPeopleBlock() % 12;
      const ground_key = name.getGroundBlock() % 12;
      const out_key = name.getOutBlock() % 12;
      const total_key = name.getTotalBlock() % 12;
      const sky_val = terrestrial_map[sky_key];
      const people_val = terrestrial_map[people_key];
      const ground_val = terrestrial_map[ground_key];
      const out_val = terrestrial_map[out_key];
      const total_val = terrestrial_map[total_key];     
      this.sky_branch = sky_val;
      this.people_branch = people_val;
      this.ground_branch = ground_val;
      this.out_branch = out_val;
      this.total_branch = total_val;
    }
    
    create_map() {
      const terrestrial_map = {
        1: '子',
        2: '丑',
        3: '寅',
        4: '卯',
        5: '辰',
        6: '巳',
        7: '午',
        8: '未',
        9: '申',
        10: '酉',
        11: '戌',
        0: '亥'
      };
      return terrestrial_map;
    }
    
    get_sky_branch() {
      return this.sky_branch;
    }
    
    get_people_branch() {
      return this.people_branch;
    }
    
    get_ground_branch() {
      return this.ground_branch;
    }
    
    get_out_branch() {
      return this.out_branch;
    }
    
    get_total_branch() {
      return this.total_branch;
    }
  }
  