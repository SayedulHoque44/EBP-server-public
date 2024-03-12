export type TDeviceLogin = {
  deviceInfo: string;
  isDeleted: boolean;
  createdAt: Date;
};

export type Tuser = {
  name: string;
  phone: string;
  city: string;
  pin: number;
  email?: string;
  propileImageUrl?: string;
  paymentStatus: "paid" | "unPaid";
  status: "Active" | "Disabled" | "Block" | "Passed";
  role: "Admin" | "Student";
  group: string; //"Free"
  note?: string;
  paymantNote?: string;
  // coursesTime?: TCoursesTime[];
  deviceLogin?: TDeviceLogin[];
  logInAttempt?: number;
};
export type TLoginuser = {
  phone: string;
  pin: number;
  deviceInfo: string;
};
