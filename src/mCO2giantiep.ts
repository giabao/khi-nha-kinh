//import {computedFrom} from 'aurelia-binding';

interface Enery {
  thuydien: number;
  hatnhan: number;
  than: number;
  khi: number;
  xach: number;
  khac: number;
}

interface EneryPercent extends Enery {
  place: string;
  khacLegend: string;
}

interface Gas {
  CO2: number;
  CH4: number;
  N2O: number;
}

interface NamedValue {
  name: string;
  m: number;
}

export class MCO2giantiep {
  heading = 'PHÁT THẢI KHÍ NHÀ KÍNH GIÁN TIẾP';
  /////////////
  Etieuthu = 0;

  EF: Enery = {
    thuydien: 16,
    hatnhan: 9,
    than: 860,
    khi: 460,
    xach: 11,
    khac: 689
  };

  eneryPercents: EneryPercent[] = [
    { place: 'Ontaio',
      thuydien: 39,
      hatnhan: 51,
      than: 6.7,
      khi: 0,
      xach: 0,
      khac: 3.3,
      khacLegend: 'dầu'}
  ];
  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  //@computedFrom('firstName', 'lastName')
  get mCO2dien() {
    const PrF = this.eneryPercents[0];
    var ret = 0;
    for (var i of ['thuydien', 'hatnhan', 'than', 'khi', 'xach', 'khac']) {
      ret += this.EF[i] * PrF[i];
    }
    return this.Etieuthu * ret;
  }
  /////////////

  private Periods = [20, 100, 500];

  //Khả năng gây ấm toàn cầu theo thời gian (không đơn vị?)
  //same index as Periods
  private GWP: [Gas, Gas, Gas] = [
    {CO2: 1, CH4: 72, N2O: 275},
    {CO2: 1, CH4: 25, N2O: 296},
    {CO2: 1, CH4: 7.6, N2O: 156}];

  MNhienLieus: NamedValue[] = [
    {name: 'Sản xuất khí tự nhiên', m: 0},
    {name: 'Chế biến khí tự nhiên', m: 0},
    {name: 'Vận chuyển khí tự nhiên (cô đặc)', m: 0},
    {name: 'Vận chuyển khí tự nhiên (hóa lỏng)', m: 0},
    {name: 'Sản xuất nhiên liệu dầu', m: 0},
    {name: 'Vận chuyển nhiên liệu dầu (đường ống)', m: 0},
    {name: 'Vận chuyển nhiên liệu dầu (Xe trở dầu)', m: 0}];

  //same index as MNhienLieus
  private EFgas: Gas[] = [
    {CO2: 1.9, CH4: 3.1, N2O: 2.2e-5},
    {CO2: 2.1e-3, CH4: 7.2e-2, N2O: 0},
    {CO2: 7.2, CH4: 110, N2O: 0},
    {CO2: 430, CH4: 0, N2O: 2.2e-3},
    {CO2: 6.8e+4, CH4: 1800, N2O: 6.4e-1}, //1.800?
    {CO2: 4.9e-1, CH4: 5.4, N2O: 0},
    {CO2: 2.3, CH4: 25, N2O: 0},
  ];

  get mCO2nhienLieu() {
    const gwp = this.GWP[0];
    return this.MNhienLieus.reduce((sum: number, v: NamedValue, i: number) => {
      let efGas = this.EFgas[i];
      return sum + v.m * (gwp.CO2 * efGas.CO2 + gwp.CH4 * efGas.CH4 + gwp.N2O * efGas.N2O);
    }, 0);
  }

  get mCO2nguyenNhienLieu() {
    return this.mCO2nhienLieu + this.mCO2nguyenLieu;
  }

  MNguyenLieus: NamedValue[] = [
    {name: 'methanol', m: 0},
    {name: 'Kiềm', m: 0},
    {name: 'ferric chloride', m: 0},
    {name: 'Dầu', m: 0}
  ];

  //same index as MNguyenLieus
  private EFnguyenLieu = [1.54, 1.74, 2.71, 3.3];

  get mCO2nguyenLieu() {
    return this.MNguyenLieus.reduce((sum: number, v: NamedValue, i: number) => sum + v.m * this.EFnguyenLieu[i], 0);
  }
}
