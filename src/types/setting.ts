export interface RoleTarget {
  marks: string;
  roleId: string | number;
}

export interface BaseInfoState {
  baseInfoForm: {
    username: string;
    sex: string;
    staffName: string;
    phone: string;
    marks: string;
    birthDate: string;
    address: string;
    userState: string;
    jurisdiction: string;
    image: string;
  };
  baseInfoRules: any;
}

export interface CheckPassState {
  checkPassForm: {
    oldPassword: string;
    newPassword: string;
    checkPass: string;
  };
  rules: any;
}

export interface ResourceItem {
  resourceName: string;
  resourceUrl: string;
  resourceIcon?: string;
  children: ResourceItem[];
}
