import { Model, model, Document, Schema } from 'mongoose';

interface ISession {
  name: string;
}

export interface ISessionModel extends ISession, Document { }

const _sessionSchema: Schema = new Schema({
  name: String,
  createdAt: Date
});

_sessionSchema.pre('save', function(next) {
  const createdAt = this.get('createdAt', Date);
  if (!createdAt) {
    const now = new Date();
    this.set('createdAt', now);
  }
  next();
});

export const Session: Model<ISessionModel> = model<ISessionModel>('Session', _sessionSchema);
