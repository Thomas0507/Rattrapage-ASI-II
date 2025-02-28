// src/models/Message.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  content: string;
  sender: string; // Store user id or username
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
