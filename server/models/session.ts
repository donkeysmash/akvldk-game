import { Model, model, Document, Schema } from 'mongoose';

interface ISession {
  name: string;
}

export interface ISessionModel extends ISession, Document { }


let _sessionSchema: Schema = new Schema({
  name: String,
  createdAt: Date
});

_sessionSchema.pre('save', next => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});


export const Session: Model<ISessionModel> = model<ISessionModel>('Session', _sessionSchema);
