import { Model, model, Document, Schema } from 'mongoose';
import { IUser, UserSchema } from './user';

export interface ISession {
  name: string;
  participants: Array<IUser>;
  host: IUser
}

export interface ISessionModel extends ISession, Document {}

export const SessionSchema: Schema = new Schema({
  name: String,
  createdAt: Date,
  lastModified: Date,
  participants: [UserSchema],
  host: UserSchema
});

SessionSchema.pre('save', function(next) {
  const now = new Date();
  const createdAt = this.get('createdAt', Date);
  if (!createdAt) {
    this.set('createdAt', now);
  }
  this.set('lastModified', now);
  next();
});

export const Session: Model<ISessionModel> = model<ISessionModel>('Session', SessionSchema);
