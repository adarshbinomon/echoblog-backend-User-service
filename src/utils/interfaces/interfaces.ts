export interface UserData {
  _id: string;
  name: string;
  email: string;
  userName: string;
  accountType?: string;
  bio?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: Date;
  profilePicture?: string;
  coverPicture?: string;
  following?: string[];
  followers?: string[];
  interestedTags?: string[];
  createdOn?: Date;
  editedOn?: Date;
}
export interface MulterS3File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: any;
  location: string;
  etag: string;
}

export interface communityKafka {
  userId: string;
  communityId: string;
}
