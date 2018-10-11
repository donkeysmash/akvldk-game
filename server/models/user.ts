import { Model, model, Document, Schema } from 'mongoose';

export interface IUser {
  displayName: string;
}

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
  displayName: { type: String, index: true },
  createdAt: Date,
  lastModified: Date
});

UserSchema.pre('save', function(next) {
  const now = new Date();
  const createdAt = this.get('createdAt', Date);
  if (!createdAt) {
    this.set('createdAt', now);
  }
  this.set('lastModified', now);
  next();
});


export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
