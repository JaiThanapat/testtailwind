export interface Staff {
  staff_id: string;
  name: string;
  surname: string;
  address_detail: string;
  phone: string;
  username: string;
  password: string;
  image: string;
  email: string;
  imageUrl: string;
  Isadmin: boolean;
  department: string;
}

export interface User {
  accountId: string;
  userId: string;
  name: string;
  pictureUrl: string;
  phone: string;
  email: string;
  loginType: string;
}

export interface ShowStaff {
  staff_id?: string;
  name: string;
  surname: string;
  address_detail: string;
  phone: string;
  username: string;
  password: string;
  image: string;
  email: string;
  imageUrl: string;
  Isadmin: boolean;
  createDateTime: Date;
  department: string;
}

export interface LogStaff {
  log_id: number;
  createLogDateTime: Date;
  headerDetail: JSON;
  bodyDetail: JSON;
  type: string;
  status: string;
  staff_id: Staff;
  ThaiDatetime: string;
}

export interface TransactionData {
  transactionId: string;
  transactionSender: string;
  transactionPair: string;
  transactionDetail: string;
  transactionBalance: number;
  transactionType: string;
  createTransactionDateTime: string;
  transactionStatus: string;
  transactionCode: string;
  DateTimeThai: string;
  username: string;
}


